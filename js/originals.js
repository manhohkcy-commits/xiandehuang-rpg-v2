import { cloudGet, cloudSave } from "./core.js?v=13807141";
import { powerOf } from "./power.js?v=d92ed317";

// 🧬 原创角色最终面板（与玩家同一套成长/突破公式）
// 等级每级 +4%，突破每次 +3%（最多 3 次），战力用 powerOf 实时计算
export function originalFinal(o, prog) {
  const lv = Number(prog && prog.lv) || 1;
  const br = Math.min(3, Number(prog && prog.breaks) || 0);
  const k = (1 + 0.04 * (lv - 1)) * (1 + 0.03 * br);
  const s = o.stats || {};
  // 🗡 专属装备加成
  const g = o.gearObj || {};
  const gs = { atk: 0, hp: 0, def: 0, res: 0, spd: 0, critRate: 0, critDmg: 0 };
  Object.keys(g).forEach((slot) => {
    const it = g[slot] || {};
    Object.keys(gs).forEach((key) => { gs[key] += Number(it[key]) || 0; });
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
      uName: "千山暮雪", uMult: 300, uShape: "cross", style: "melee", dmgType: "phys",
      skillDesc: "雪葬命中额外 +1 层霜印"
    },
    armor: { name: "霜绡战衣", rarity: "SSR", atk: 0, hp: 380, def: 30, res: 16, spd: 0, critRate: 0 },
    armor2: { name: "踏雪战裤", rarity: "SSR", atk: 0, hp: 190, def: 12, res: 0, spd: 4, critRate: 0 },
    accessory: { name: "凝霜之泪", rarity: "SSR", atk: 52, hp: 0, def: 0, res: 0, spd: 0, critRate: 0, critDmg: 12, lifesteal: 15 }
  }
};
// 🗡 装备能力汇总（吸血 / 必杀加成）
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
