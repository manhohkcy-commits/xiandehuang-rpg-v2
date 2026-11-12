// 闲得慌RPG v2 · 属性与战力（唯一出口）
import { CHAR, SLOT_BASE, RARITY_MULT, GRADE, APTITUDE, BIRTH } from "./data.js";

export const gradeOf = (ch) => GRADE.find((g) => g.key === (ch && ch.grade)) || GRADE[0];
export const aptitudeOf = (ch) => APTITUDE.find((a) => a.star === Number(ch && ch.apt)) || APTITUDE[0];

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
  "statusPower", "statusHit", "statusResist", "block", "tenacity", "lowHpCut"];

export function combatTraits(ch) {
  const out = {};
  COMBAT_KEYS.forEach((k) => { out[k] = 0; });
  ["weapon", "armor", "accessory"].forEach((slot) => {
    const d = (ch && ch.equip && ch.equip[slot]) || {};
    COMBAT_KEYS.forEach((k) => { if (d[k]) out[k] += Number(d[k]) || 0; });
  });
  return out;
}
