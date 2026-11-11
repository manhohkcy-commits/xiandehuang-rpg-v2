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
    st.units.push({
      id: String(u.id), name: u.name || u.id, side: u.side || "A",
      spd: Number(u.spd) || 1, power: Number(u.power) || 0,
      hp: Number(u.hp) || 1, maxHp: Number(u.maxHp) || Number(u.hp) || 1,
      atk: Number(u.atk) || 0, def: Number(u.def) || 0, res: Number(u.res) || 0,
      critRate: Number(u.critRate) || 0, critDmg: Number(u.critDmg) || 150,
      dmgCut: Number(u.dmgCut) || 0,
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
  if (!atk || !def) return { dmg: 0, crit: false };
  const mult = Number(opts.mult) || 100;
  const crit = Math.random() * 100 < (Number(opts.critRate) || 0);
  const critMul = crit ? (Number(opts.critDmg) || 150) / 100 : 1;
  let raw = (Number(opts.atk) || 0) * (mult / 100) * critMul;
  raw *= 1 - Math.min(70, Number(def.dmgCut) || 0) / 100;
  raw *= 1 - Math.min(0.8, (Number(def.def) || 0) / ((Number(def.def) || 0) + 150));
  const dmg = Math.max(1, Math.round(raw));
  def.hp = Math.max(0, def.hp - dmg);
  if (def.hp === 0) def.alive = false;
  return { dmg, crit };
}
export function setCooldown(st, unitId, cd) {
  const u = st.units.find((x) => x.id === String(unitId));
  if (u) u.cd = Math.max(0, Number(cd) || 0);
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
