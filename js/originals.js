import { cloudGet, cloudSave } from "./core.js?v=13807141";
import { powerOf } from "./power.js?v=edbb3f86";
import { GRADE, APTITUDE } from "./data.js?v=b741447b";

// 🧬 原创角色最终面板（与玩家同一套成长/突破公式）
// 等级每级 +4%，突破每次 +3%（最多 3 次），战力用 powerOf 实时计算
export function originalFinal(o, prog, withGear, withBonus) {
  const useGear = withGear !== false;
  const lv = Number(prog && prog.lv) || 1;
  const br = Math.min(5, Number(prog && prog.breaks) || 0);
  const gi = Math.max(0, Math.min(GRADE.length - 1, Number(prog && prog.grade) || 0));
  const ai = Math.max(1, Math.min(APTITUDE.length, Number(prog && prog.apt) || 1));
  const gMul = (GRADE[gi].mult || 1) * ((APTITUDE[ai - 1] || {}).mult || 1);
  const k = (1 + 0.04 * (lv - 1)) * (1 + 0.03 * br) * gMul;
  const s = o.stats || {};
  // 🗡 专属装备加成
  const g = o.gearObj || {};
  const gl = (prog && prog.gear) || {};
  const gs = { atk: 0, hp: 0, def: 0, res: 0, spd: 0, critRate: 0, critDmg: 0 };
  if (useGear) Object.keys(g).forEach((slot) => {
    const it = g[slot] || {};
    const st = gl[slot] || {};
    const lv = Math.max(1, Number(st.lv) || 1);
    const star = Math.max(1, Number(st.star) || 1);
    const mul = (1 + 0.02 * (lv - 1)) * (1 + 0.12 * (star - 1)) * (1 + 0.05 * (Number(st.advance) || 0));
    ["atk", "hp", "def", "res", "spd"].forEach((key) => { gs[key] += (Number(it[key]) || 0) * mul; });
    gs.critRate += Number(it.critRate) || 0;
    gs.critDmg += (Number(it.critDmg) || 0) + (Number(st.refine) || 0);
  });
  const out = {
    atk: (Number(s.atk) || 60) * k + gs.atk,
    hp: (Number(s.hp) || 500) * k + gs.hp,
    def: (Number(s.def) || 20) * k + gs.def,
    res: (Number(s.res) || 15) * k + gs.res,
    spd: (Number(s.spd) || 10) + 0.1 * (lv - 1) + gs.spd,
    critRate: (Number(s.critRate) || 5) + gs.critRate,
    critDmg: (Number(s.critDmg) || 150) + gs.critDmg
  };
  // 🏋 属性强化 / 精炼等长期加成
  const bonus = (useGear && withBonus !== false) ? ((prog && prog.bonus) || {}) : {};
  ["atk", "hp", "def", "res", "spd", "critRate", "critDmg"].forEach((key) => {
    out[key] += Number(bonus[key]) || 0;
  });
  // 🎯 升级获得的专精点（每点：力+2攻 / 敏+0.05速 / 智+1.5抗 / 技+0.5防）
  const sp = (prog && prog.spec) || {};
  out.atk += (Number(sp.str) || 0) * 2;
  out.spd += (Number(sp.agi) || 0) * 0.05;
  out.res += (Number(sp.intel) || 0) * 1.5;
  out.def += (Number(sp.tech) || 0) * 0.5;
  out.power = powerOf(out);
  return out;
}

// 🧑‍💻 主机端原创角色（由设计器导出，加到游戏里）
// 字段：id, name, title, role, rare, camp("enemy"|"ally"), desc, gear, notes,
//       basic{hp,atk,def,res}, spec{str,int,tech,agi}, stats{atk,hp,def,res,spd,critRate,critDmg,power}
export const ORIGINALS = [];

// ☁️ 云端原创角色：主机发布，全玩家拉取（失败时用本地空数组兜底）
const ORIGINALS_BOX = "__originals";
export async function pullOriginals() {  try {
    const r = await cloudGet(ORIGINALS_BOX);
    const list = r && r.store && r.store.originals;
    if (Array.isArray(list) && list.length) {
      ORIGINALS.length = 0;
      list.forEach((o) => ORIGINALS.push(mergeGear(o)));
    }
  } catch (e) {}
  return ORIGINALS;
}
// 🗡 专属装备由开发者定稿写入（按角色 id 合并到云端数据上）
export const ORIGINAL_GEAR = {
  // 晓天（先锋 · 冰系 · 命中叠层 · 稀有）
  dmweo00x9: {
    weapon: {
      name: "泣雪", rarity: "SSR", atk: 108, hp: 0, def: 0, res: 0, spd: 0, critRate: 8, ultPct: 10,
      aName: "霜切", aMult: 100, sName: "雪葬", sMult: 190, sCd: 3, sShape: "single", sRage: 10,
      uName: "千山暮雪", uMult: 340, uShape: "single", style: "melee", dmgType: "phys",
      skillDesc: "雪葬命中额外 +1 层霜印",
      mech: "霜印：普攻 / 技能命中各 +1 层（雪葬额外 +1），最多叠 5 层；每层使必杀伤害 +15%，释放必杀后全部清空。"
    },
    armor: { name: "霜绡战衣", rarity: "SSR", atk: 0, hp: 380, def: 30, res: 16, spd: 0, critRate: 0 },
    armor2: { name: "踏雪战裤", rarity: "SSR", atk: 0, hp: 190, def: 12, res: 0, spd: 4, critRate: 0 },
    accessory: { name: "凝霜之泪", rarity: "SSR", atk: 52, hp: 0, def: 0, res: 0, spd: 0, critRate: 0, critDmg: 12, lifesteal: 15 }
  }
};
// 🔓 原创角色功能解锁（阶段由主机配置，暂全部锁住）
export const ORIG_UNLOCK = {
  // 例：dmweo00x9: { stat: 5, refine: 10, advance: 15, awaken: 20, talent: 25, shop: 1 }
};
export function origUnlocked(id, feature, prog) {
  const rule = ORIG_UNLOCK[id] || {};
  if (feature === "talent" && rule.talent == null) return false; // 天赋默认锁住
  const DEF = { stat: 1, refine: 1, advance: 1, awaken: 1, shop: 1 };
  const need = Number(rule[feature] != null ? rule[feature] : (DEF[feature] != null ? DEF[feature] : 999));
  return (Number((prog || {}).lv) || 1) >= need;
}
// 🛠 专属装备培养：每件 +2%/级（上限 20 级）、+12%/星（上限 5 星）
export const ORIG_GEAR_CULT = {
  maxLv: 20, maxStar: 5,
  lvStone: (lv) => 3 + 2 * (Number(lv) || 1),
  lvGold: (lv) => 80 * (Number(lv) || 1),
  starShards: (star) => 10 * (Number(star) || 1),
  starGold: (star) => 300 * (Number(star) || 1)
};
export function gearAbilities(o) {
  const g = (o && o.gearObj) || {};
  const out = { lifesteal: 0, ultPct: 0 };
  Object.keys(g).forEach((k) => {
    const it = g[k] || {};
    out.lifesteal += Number(it.lifesteal) || 0;
    out.ultPct += Number(it.ultPct) || 0;
  });
  return out;
}
function mergeGear(o) {
  const g = ORIGINAL_GEAR[o.id];
  return g ? Object.assign({}, o, { gearObj: g }) : o;
}
export async function pushOriginals(list) {
  const arr = Array.isArray(list) ? list : [];
  const cur = await cloudGet(ORIGINALS_BOX);
  return cloudSave(ORIGINALS_BOX, { v: 2, items: [], chars: [], originals: arr }, cur && cur.updated_at, "原创角色");
}

export const originalsOf = (camp) => ORIGINALS.filter((o) => o.camp === camp);

export function originalToUnits(o, side) {
  const s = o.stats || {};
  return {
    id: o.id, name: o.name, side,
    spd: Number(s.spd) || 10,
    power: Number(s.power) || 0,
    hp: Number(s.hp) || 500, maxHp: Number(s.hp) || 500,
    atk: Number(s.atk) || 60, def: Number(s.def) || 20,
    res: Number(s.res) || 15,
    critRate: Number(s.critRate) || 5, critDmg: Number(s.critDmg) || 150
  };
}
