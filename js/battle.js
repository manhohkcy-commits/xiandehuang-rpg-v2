// 闲得慌RPG v2 · 回合引擎（纯逻辑，node 可测）
const ALIVE = (u) => u && u.alive !== false;
const avgSpd = (units) => {
  const live = units.filter(ALIVE);
  if (!live.length) return 0;
  return live.reduce((s, u) => s + Math.max(1, Number(u.spd) || 1), 0) / live.length;
};
function recomputeAllowed(st) {
  const base = avgSpd(st.units);
  st.units.forEach((u) => {
    if (!ALIVE(u)) { u.allowed = 0; u.acted = 0; return; }
    const spd = Math.max(1, Number(u.spd) || 1);
    let extra = 0;
    if (spd >= base + 100) extra = 1;
    else if (spd >= base + 50) extra = (st.round % 2 === 0) ? 1 : 0;
    u.allowed = 1 + extra;
    u.acted = 0;
  });
}
export function createBattle(units) {
  const st = { round: 1, units: [], log: [], finished: false, winner: null };
  (units || []).forEach((u, i) => {
    if (!u || !u.id) return;
    const traits = u.traits || {};
    st.units.push({
      id: String(u.id), name: u.name || u.id, side: u.side || "A",
      spd: Number(u.spd) || 1, power: Number(u.power) || 0,
      hp: Number(u.hp) || 1, maxHp: Number(u.maxHp) || Number(u.hp) || 1,
      atk: Number(u.atk) || 0, def: Number(u.def) || 0, res: Number(u.res) || 0,
      critRate: Number(u.critRate) || 0, critDmg: Number(u.critDmg) || 150,
      dmgCut: Number(u.dmgCut) || 0,
      traits,
      rage: u.rage != null ? (Number(u.rage) || 0) : (Number(traits.rageStart) || 0),
      alive: true, acted: 0, allowed: 1, cd: 0, statuses: [], seq: i
    });
  });
  recomputeAllowed(st);
  return st;
}
export const aliveUnits = (st) => st.units.filter(ALIVE);
function sortBySpeed(list) {
  return list.slice().sort((a, b) => {
    if (b.spd !== a.spd) return b.spd - a.spd;
    if (b.power !== a.power) return b.power - a.power;
    if (a.side !== b.side) return a.side === "A" ? -1 : 1;
    return a.seq - b.seq;
  });
}
export function nextActor(st) {
  const pending = aliveUnits(st).filter((u) => (u.acted || 0) < (u.allowed || 1));
  if (!pending.length) return null;
  return sortBySpeed(pending)[0];
}
export function checkEnd(st) {
  const a = aliveUnits(st).filter((u) => u.side === "A").length;
  const b = aliveUnits(st).filter((u) => u.side !== "A").length;
  if (a === 0 || b === 0) { st.finished = true; st.winner = a === 0 ? "B" : "A"; }
  return st.finished;
}
export function commit(st, unitId) {
  const u = st.units.find((x) => x.id === String(unitId));
  if (!u || !ALIVE(u)) return st;
  u.acted = (u.acted || 0) + 1;
  if (u.cd > 0) u.cd -= 1;
  u.statuses = (u.statuses || []).filter((s) => {
    if (s.turns == null) return true;
    s.turns -= 1;
    return s.turns > 0;
  });
  const live = aliveUnits(st);
  if (live.length && live.every((x) => (x.acted || 0) >= (x.allowed || 1))) {
    st.round += 1;
    recomputeAllowed(st);
  }
  checkEnd(st);
  return st;
}
export function damage(st, atkId, defId, opts = {}) {
  const atk = st.units.find((u) => u.id === String(atkId));
  const def = st.units.find((u) => u.id === String(defId));
  if (!atk || !def) return { dmg: 0, crit: false, killed: false };
  const at = atk.traits || {};
  const dt = def.traits || {};
  const mult = Number(opts.mult) || 100;
  const crit = Math.random() * 100 < (Number(opts.critRate) || 0);
  // 🧱 韧性：削弱暴击倍率（暴伤 150% + 韧性 40% → 130%）
  const critMul = crit
    ? 1 + ((Number(opts.critDmg) || 150) / 100 - 1) * (1 - Math.min(80, Number(dt.tenacity) || 0) / 100)
    : 1;
  let raw = (Number(opts.atk) || 0) * (mult / 100) * critMul;
  // 🛡️ 格挡：和减伤叠加，总上限 60%
  const block = Math.min(60, (Number(def.dmgCut) || 0) + (Number(dt.block) || 0));
  raw *= 1 - block / 100;
  // 🩸 残血减伤：生命 <30% 时再乘一次
  if (def.hp <= (Number(def.maxHp) || 0) * 0.3) raw *= 1 - Math.min(60, Number(dt.lowHpCut) || 0) / 100;
  raw *= 1 - Math.min(0.8, (Number(def.def) || 0) / ((Number(def.def) || 0) + 150));
  const dmg = Math.max(1, Math.round(raw));
  def.hp = Math.max(0, def.hp - dmg);
  if (def.hp === 0) def.alive = false;
  // 😤 击杀回怒
  if (def.hp === 0 && Number(at.rageOnKill) > 0) {
    atk.rage = Math.min(100, (Number(atk.rage) || 0) + Number(at.rageOnKill));
  }
  return { dmg, crit, killed: def.hp === 0 };
}
export function setCooldown(st, unitId, cd) {
  const u = st.units.find((x) => x.id === String(unitId));
  if (u) {
    const base = Number(cd) || 0;
    const reduce = Number((u.traits || {}).cdReduce) || 0;
    u.cd = base > 0 ? Math.max(1, base - reduce) : 0;
  }
  return st;
}
export function addStatus(st, unitId, key, value, turns, label) {
  const u = st.units.find((x) => x.id === String(unitId));
  if (!u) return st;
  const cur = (u.statuses || []).find((s) => s.key === key);
  const additive = key === "mark" || key === "stack";
  if (cur) {
    cur.v = additive ? cur.v + value : Math.max(cur.v, value);
    cur.turns = Math.max(cur.turns, turns);
  } else {
    u.statuses.push({ key, v: value, turns, label: label || key });
  }
  return st;
}

// 🧪 带「命中 / 强度 / 抗性 / 破防」结算的状态施加：命中返回 true，被抗掉返回 false
export function applyStatus(st, atkId, defId, key, value, turns, label) {
  const atk = st.units.find((u) => u.id === String(atkId));
  const def = st.units.find((u) => u.id === String(defId));
  if (!atk || !def) return false;
  const at = atk.traits || {};
  const dt = def.traits || {};
  const chance = Math.max(5, Math.min(100, 100 + (Number(at.statusHit) || 0) - (Number(dt.statusResist) || 0)));
  if (Math.random() * 100 >= chance) return false;
  let v = Number(value) || 0;
  v *= 1 + (Number(at.statusPower) || 0) / 100;
  if (key === "sunder") v *= 1 + (Number(at.sunderBoost) || 0) / 100;
  addStatus(st, defId, key, v, turns, label);
  return true;
}
