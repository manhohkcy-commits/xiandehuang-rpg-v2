// 闲得慌RPG v2 · 属性与战力（唯一出口）
import { CHAR, SLOT_BASE, RARITY_MULT, GRADE, APTITUDE, BIRTH, TALENT_TREES, talentPointsOf } from "./data.js";

export const gradeOf = (ch) => GRADE.find((g) => g.key === (ch && ch.grade)) || GRADE[0];
export const aptitudeOf = (ch) => APTITUDE.find((a) => a.star === Number(ch && ch.apt)) || APTITUDE[0];

// 🌳 天赋加成汇总（把已点节点的 eff 相加）
export function talentBonus(ch) {
  const pts = (ch && ch.talent && ch.talent.points) || {};
  const out = {};
  TALENT_TREES.forEach((t) => (t.branches || []).forEach((b) => b.nodes.forEach((n) => {
    if (!pts[n.id]) return;
    Object.keys(n.eff).forEach((k) => { out[k] = (out[k] || 0) + (Number(n.eff[k]) || 0); });
  })));
  // 🔁 溢出点：节点点满后，多出来的天赋点按每点 +0.3% 攻击/生命（上限 +30%）
  const totalNodes = talentNodeCount();
  const overflow = Math.max(0, talentPointsOf(ch) - totalNodes);
  if (overflow > 0) {
    const add = Math.min(30, overflow * 0.3);
    out.atkPct = (out.atkPct || 0) + add;
    out.hpPct = (out.hpPct || 0) + add;
  }
  return out;
}

export function talentNodeCount() {
  let n = 0;
  TALENT_TREES.forEach((t) => {
    (t.branches || []).forEach((b) => { n += b.nodes.length; });
    if (t.active) n += 1;
  });
  return n;
}

export function talentSpent(ch) {
  const pts = (ch && ch.talent && ch.talent.points) || {};
  return Object.keys(pts).filter((k) => pts[k]).length;
}

// ⚡ 天赋主动技：本职业点满 10 点后，投入 1 点点亮职业主动技
export function talentActive(ch) {
  const pts = (ch && ch.talent && ch.talent.points) || {};
  for (const t of TALENT_TREES) {
    if (t.active && pts[t.active.id]) return Object.assign({ tree: t.id }, t.active);
  }
  return null;
}

// 🎯 本职业已投入点数（主动技解锁门槛用）
export function talentSpentInTree(ch, treeId) {
  const pts = (ch && ch.talent && ch.talent.points) || {};
  const t = TALENT_TREES.find((x) => x.id === treeId);
  if (!t) return 0;
  let n = 0;
  (t.branches || []).forEach((b) => b.nodes.forEach((x) => { if (pts[x.id]) n++; }));
  return n;
}

export function talentSpentInBranch(ch, treeId, branchId) {
  const pts = (ch && ch.talent && ch.talent.points) || {};
  const t = TALENT_TREES.find((x) => x.id === treeId);
  const b = t && (t.branches || []).find((x) => x.id === branchId);
  return b ? b.nodes.filter((x) => pts[x.id]).length : 0;
}

export function itemBonus(it) {
  if (!it || !it.data) return {};
  const d = it.data;
  const base = SLOT_BASE[it.cat] || {};
  const lvMul = 1 + 0.02 * ((Number(d.lv) || 1) - 1);
  const starMul = 1 + 0.12 * ((Number(d.star) || 1) - 1);
  const rm = RARITY_MULT[d.rarity] || 1;
  const out = {};
  Object.keys(base).forEach((k) => { out[k] = (out[k] || 0) + (Number(base[k]) || 0) * rm * lvMul * starMul; });
  ["dmgCut", "thorns", "atkPct", "critDmg", "critRate", "spd", "res", "def", "hp", "atk"].forEach((k) => {
    const v = Number(d[k]) || 0;
    if (v) out[k] = (out[k] || 0) + v;
  });
  return out;
}

export function charFinal(ch) {
  const lv = Math.max(1, Number(ch && ch.lv) || 1);
  const p = CHAR.perLevel;
  const f = {
    atk: CHAR.base.atk + p.atk * (lv - 1),
    hp: CHAR.base.hp + p.hp * (lv - 1),
    def: CHAR.base.def + p.def * (lv - 1),
    res: CHAR.base.res + p.res * (lv - 1),
    spd: CHAR.base.spd + p.spd * (lv - 1),
    critRate: CHAR.base.critRate,
    critDmg: CHAR.base.critDmg,
    dmgCut: 0, thorns: 0, atkPct: 0
  };
  const spec = (Number(ch.str) || 0) * CHAR.spec.str + (Number(ch.agi) || 0) * CHAR.spec.agi +
               (Number(ch.intel) || 0) * CHAR.spec.intel + (Number(ch.tech) || 0) * CHAR.spec.tech;
  f.atk += spec;
  // 🎲 建角「基础四项」百分比分配（ch.basic = {hp,atk,def,res} 点数）
  const b = ch.basic || {};
  const bp = Number(BIRTH.basicPct) || 5;
  f.hp *= 1 + (Number(b.hp) || 0) * bp / 100;
  f.atk *= 1 + (Number(b.atk) || 0) * bp / 100;
  f.def *= 1 + (Number(b.def) || 0) * bp / 100;
  f.res *= 1 + (Number(b.res) || 0) * bp / 100;
  // 🎖️ 资历评级 × 🎯 资质评估：乘在「本体」上（装备之后再叠）
  const tb = talentBonus(ch);
  f.hp *= 1 + (Number(tb.hpPct) || 0) / 100;
  f.atk *= 1 + (Number(tb.atkPct) || 0) / 100;
  f.def *= 1 + (Number(tb.defPct) || 0) / 100;
  f.res *= 1 + (Number(tb.resPct) || 0) / 100;
  f.spd *= 1 + (Number(tb.spdPct) || 0) / 100;
  f.critRate += Number(tb.critRate) || 0;
  f.critDmg += Number(tb.critDmg) || 0;
  f.dmgCut += Number(tb.dmgCut) || 0;
  const gm = gradeOf(ch).mult, am = aptitudeOf(ch).mult;
  ["atk", "hp", "def", "res", "spd"].forEach((k) => { f[k] = f[k] * gm * am; });
  // 装备之后不再乘（装备是外物，不随资质长大）
  ["weapon", "armor", "accessory"].forEach((k) => {
    const b = itemBonus(ch.equip && ch.equip[k]);
    Object.keys(b).forEach((kk) => {
      if (kk === "atkPct") f.atkPct += b[kk];
      else f[kk] = (f[kk] || 0) + b[kk];
    });
  });
  f.atk = f.atk * (1 + (f.atkPct || 0) / 100);
  // ⚡ 突破加成：每突破一次，全属性 +3%
  const brk = Math.max(0, Math.min(5, Number(ch.breaks) || 0));
  if (brk > 0) {
    const mult = 1 + 0.03 * brk;
    ["atk", "hp", "def", "res"].forEach((k) => { f[k] = f[k] * mult; });
  }
  Object.keys(f).forEach((k) => { f[k] = Math.round(f[k] * 10) / 10; });
  return f;
}

export function powerOf(f) {
  return Math.round((f.atk || 0) * 16 + (f.hp || 0) * 1.0 + (f.def || 0) * 7 +
    (f.res || 0) * 5 + (f.spd || 0) * 28 + (f.critRate || 0) * 16 + (f.critDmg || 0) * 5);
}
export const charPower = (ch) => powerOf(charFinal(ch));

// ⚔️ 战斗词条汇总（第二批）：三件装备的数据字段相加
//   引擎里只认这几个键：cdReduce / rageOnSkill / rageOnKill / rageStart /
//   sunderBoost / statusPower / statusHit / statusResist / block / tenacity / lowHpCut
const COMBAT_KEYS = ["cdReduce", "rageOnSkill", "rageOnKill", "rageStart", "sunderBoost",
  "statusPower", "statusHit", "statusResist", "block", "tenacity", "lowHpCut",
  // 第三批：控制 / 机制类也一起汇总（武器、防具、饰品都能出）
  "penetrate", "doubleStrike", "chase", "counter", "dualborn", "charge", "reverse", "fate", "splash",
  "stun", "silence", "freeze", "noheal", "disarm", "taunt", "purify"];

export function combatTraits(ch) {
  const out = {};
  COMBAT_KEYS.forEach((k) => { out[k] = 0; });
  ["weapon", "armor", "accessory"].forEach((slot) => {
    const d = (ch && ch.equip && ch.equip[slot]) || {};
    COMBAT_KEYS.forEach((k) => { if (d[k]) out[k] += Number(d[k]) || 0; });
  });
  // 🌳 天赋里带战斗属性的节点
  const tb = talentBonus(ch);
  COMBAT_KEYS.forEach((k) => { out[k] += Number(tb[k]) || 0; });
  return out;
}
