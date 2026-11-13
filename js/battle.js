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
      weapon: u.weapon || null,
      shield: Number(u.shield) || 0,
      rage: u.rage != null ? (Number(u.rage) || 0) : (Number(traits.rageStart) || 0),
      alive: true, acted: 0, allowed: 1, cd: 0, statuses: [], seq: i,
      // 🗺 布阵与敌方招式
      __row: u.__row != null ? u.__row : 1,
      __col: u.__col ? 1 : 0,
      __back: !!u.__back,
      __skills: u.__skills || [],
      __buff: u.__buff || null,
      __auto: !!u.__auto
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
  // 🌊 波次钩子：清完当前波先补下一波，再判定胜负
  if (typeof st.__onCommit === "function") { try { st.__onCommit(st); } catch (e) {} }
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
  // ✨ 增益：攻击提升（辅佐）
  const up = (atk.statuses || []).find((s) => s.key === "atkUp");
  if (up) raw *= 1 + (Number(up.v) || 0) / 100;
  // 🎯 伤害类型加成（普攻/技能/必杀 × 物理/法术 × 近战/远程/法器）
  const kindPct = opts.kind === "normal" ? at.normalPct : opts.kind === "skill" ? at.skillPct : opts.kind === "ult" ? at.ultPct : 0;
  const typePct = opts.dmgType === "spell" ? at.spellPct : at.physPct;
  const stylePct = opts.style === "ranged" ? at.rangedPct : opts.style === "focus" ? at.focusPct : at.meleePct;
  raw *= 1 + ((Number(kindPct) || 0) + (Number(typePct) || 0) + (Number(stylePct) || 0)) / 100;
  // 🗡️ 穿透：无视目标一部分减伤/格挡
  const reduce = (Number(def.dmgCut) || 0) + (Number(dt.block) || 0);
  const block = Math.max(0, Math.min(60, reduce - (Number(at.penetrate) || 0)));
  raw *= 1 - block / 100;
  // 🌊 逆流：攻方残血攻击 +40%，守方残血再减伤 20%
  if (Number(at.reverse) && atk.hp <= (Number(atk.maxHp) || 0) * 0.25) raw *= 1.4;
  if (Number(dt.reverse) && def.hp <= (Number(def.maxHp) || 0) * 0.25) raw *= 0.8;
  // 🏹 蓄势：防御后下一次攻击 +60%（打出即消耗）
  if (atk.__charged) { raw *= 1.6; atk.__charged = 0; }
  // 🩸 残血减伤：生命 <30% 时再乘一次
  if (def.hp <= (Number(def.maxHp) || 0) * 0.3) raw *= 1 - Math.min(60, Number(dt.lowHpCut) || 0) / 100;
  // 🛡️ 防御 + 法抗共同减伤（法抗按 1.5 倍折算）；穿透按伤害类型削减对应部分
  let gDef = Number(def.def) || 0;
  let gRes = (Number(def.res) || 0) * 1.5;
  if (opts.dmgType === "spell") gRes *= 1 - Math.min(80, Number(at.spellPen) || 0) / 100;
  else gDef *= 1 - Math.min(80, Number(at.physPen) || 0) / 100;
  const guard = gDef + gRes;
  raw *= 1 - Math.min(0.8, guard / (guard + 150));
  let dmg = Math.max(1, Math.round(raw));
  // 🛡️ 护盾先吸伤
  const sh = Number(def.shield) || 0;
  let absorbed = 0;
  if (sh > 0) {
    absorbed = Math.min(sh, dmg);
    def.shield = sh - absorbed;
    dmg -= absorbed;
    if (dmg <= 0) return { dmg: absorbed, crit, killed: false, abs: absorbed };
  }
  // 🎴 天命：每场第一次致死伤害无效
  if (def.hp - dmg <= 0 && Number(dt.fate) && !def.__fateUsed) {
    def.__fateUsed = 1;
    def.hp = 1;
    return { dmg, crit, killed: false, fate: true };
  }
  def.hp = Math.max(0, def.hp - dmg);
  if (def.hp === 0) def.alive = false;
  // 🌵 反伤：按受到伤害的百分比回敬攻击者
  if (Number(dt.thorns) > 0 && dmg > 0 && atk.alive !== false) {
    const back = Math.max(1, Math.round(dmg * Number(dt.thorns) / 100));
    atk.hp = Math.max(0, atk.hp - back);
    if (atk.hp === 0) atk.alive = false;
  }
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
  const CONTROL = ["stun", "freeze", "silence", "disarm", "taunt", "noheal"];
  let chance;
  if (CONTROL.includes(key)) {
    // 控制类：基础 70%，吃状态命中/抗性；可被「免疫」拦下；眩晕/冰冻每场每目标限一次
    if (hasStatus(def, "immune")) return false;
    if ((key === "stun" || key === "freeze") && def.__ctrl && def.__ctrl[key]) return false;
    chance = 70 + (Number(at.statusHit) || 0) - (Number(dt.statusResist) || 0);
  } else {
    chance = 100 + (Number(at.statusHit) || 0) - (Number(dt.statusResist) || 0);
  }
  chance = Math.max(5, Math.min(100, chance));
  if (Math.random() * 100 >= chance) return false;
  let v = Number(value) || 0;
  v *= 1 + (Number(at.statusPower) || 0) / 100;
  if (key === "sunder") v *= 1 + (Number(at.sunderBoost) || 0) / 100;
  if (key === "stun" || key === "freeze") {
    def.__ctrl = def.__ctrl || {};
    def.__ctrl[key] = 1;
  }
  addStatus(st, defId, key, v, turns, label);
  return true;
}

// 🧷 状态查询（战斗流程用）
export const hasStatus = (u, key) => !!(u && (u.statuses || []).some((s) => s.key === key));
export const isStunned = (u) => hasStatus(u, "stun") || hasStatus(u, "freeze");
export const isSilenced = (u) => hasStatus(u, "silence");
export const isDisarmed = (u) => hasStatus(u, "disarm");
export const canUseSkill = (u) => !isStunned(u) && !isSilenced(u) && !isDisarmed(u);
export const canUseNormal = (u) => !isStunned(u) && !isDisarmed(u);

// ✨ 辅佐：治疗 / 护盾 / 驱散
export function healUnit(st, unitId, amount) {
  const u = st.units.find((x) => x.id === String(unitId));
  if (!u || !ALIVE(u)) return 0;
  if (hasStatus(u, "noheal")) return 0;
  const before = u.hp;
  u.hp = Math.min(u.maxHp, u.hp + Math.max(0, Number(amount) || 0));
  return Math.round(u.hp - before);
}
export function addShield(st, unitId, amount) {
  const u = st.units.find((x) => x.id === String(unitId));
  if (!u) return 0;
  u.shield = (Number(u.shield) || 0) + Math.max(0, Number(amount) || 0);
  return Math.round(u.shield);
}
const DEBUFF_KEYS = ["burn", "sunder", "stun", "silence", "disarm", "freeze", "noheal", "taunt", "atkDown"];
export function dispel(st, unitId, n) {
  const u = st.units.find((x) => x.id === String(unitId));
  if (!u) return 0;
  let left = Math.max(0, Number(n) || 0);
  const before = (u.statuses || []).length;
  u.statuses = (u.statuses || []).filter((s) => {
    if (left > 0 && DEBUFF_KEYS.includes(s.key)) { left--; return false; }
    return true;
  });
  return before - u.statuses.length;
}
