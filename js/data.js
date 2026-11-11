// 闲得慌RPG v2 · 数据（纯数据，无逻辑）
export const RARITY_MULT = { R: 1, SR: 1.6, SSR: 2.4, UR: 3.4 };
export const SLOT_BASE = {
  weapon: { atk: 40 },
  armor: { hp: 220, def: 18, res: 14 },
  accessory: { atk: 8, hp: 60, def: 4, res: 10, spd: 2 }
};
export const WEAPONS = [
  { id: "w_iron", name: "铁剑", rarity: "R", sName: "斩击", sMult: 150, sCd: 2, sRage: 10 },
  { id: "w_bow", name: "短弓", rarity: "R", sName: "连射", sMult: 180, sCd: 3, sRage: 10, sHits: 2 },
  { id: "w_fire", name: "火石长刀", rarity: "SSR", sName: "火斩", sMult: 180, sCd: 3, sRage: 30, hitStatus: "burn", hitStatusV: 3, hitStatusTurns: 2, hitStatusName: "灼烧" },
  { id: "w_cross", name: "复合十字弩", rarity: "SR", sName: "穿甲箭", sMult: 165, sCd: 3, sRage: 15 },
  { id: "w_kusanagi", name: "草薙京", rarity: "UR", sName: "百式·鬼烧", sMult: 180, sCd: 2, sRage: 20, sHits: 3 }
];
export const ARMORS = [
  { id: "a_cloth", name: "粗布衣", rarity: "R", dmgCut: 2 },
  { id: "a_lava", name: "熔岩护石甲", rarity: "SR", dmgCut: 6, thorns: 10 },
  { id: "a_mitril", name: "秘银轻甲", rarity: "SR", dmgCut: 5, spd: 2 },
  { id: "a_silver", name: "素银束带", rarity: "SR", dmgCut: 4, res: 12 }
];
export const ACCESSORIES = [
  { id: "c_ring", name: "承山戒", rarity: "SR", atkPct: 6 },
  { id: "c_stone", name: "熔岩护石", rarity: "SR", atkPct: 4, critDmg: 12 },
  { id: "c_amulet", name: "秘银坠", rarity: "SSR", atkPct: 9, spd: 3 }
];
export const STAGES = [
  { id: "k1", name: "训练木桩", tier: 1, gold: 120, exp: 40,
    foe: { name: "木桩", lv: 5, hp: 800, atk: 60, def: 20, res: 10, spd: 8 },
    drop: { shards: [8, 12], stone: [2, 4], gearChance: 10 } },
  { id: "k2", name: "街头混混", tier: 2, gold: 260, exp: 90,
    foe: { name: "混混", lv: 15, hp: 1800, atk: 120, def: 40, res: 20, spd: 11 },
    drop: { shards: [14, 22], stone: [5, 9], gearChance: 25 } },
  { id: "k3", name: "草薙京·试炼", tier: 3, gold: 520, exp: 180,
    foe: { name: "草薙京", lv: 34, hp: 2398, atk: 170, def: 60, res: 40, spd: 13 },
    drop: { shards: [26, 40], stone: [10, 16], gearChance: 45 } },
  { id: "k4", name: "无尽·第一层", tier: 4, gold: 900, exp: 320,
    foe: { name: "影武者", lv: 50, hp: 5200, atk: 260, def: 90, res: 60, spd: 15 },
    drop: { shards: [40, 60], stone: [18, 28], gearChance: 70 } }
];
export const CONSUMABLES = [
  { id: "p_hp", name: "伤药", desc: "战斗外回 300 生命", price: 120 },
  { id: "p_stone", name: "强化石", desc: "装备强化材料", price: 60 }
];
export const tier = (lv) => (lv <= 50 ? 1 : (lv <= 100 ? 2 : 4));
export const CULT = {
  maxLevel: 150,
  breakNodes: [25, 50, 75, 100, 125, 150],
  breakStone: { 25: 18, 50: 45, 75: 75, 100: 115, 125: 165, 150: 230 },
  gold: (lv) => Math.round(2 * lv * tier(lv)),
  stone: (lv) => Math.ceil((lv / 4) * tier(lv)),
  maxStar: 5,
  starShards: (star) => Math.round(10 * Math.pow(2, star - 1))
};
// 🎖️ 资历评级（白/绿/蓝/紫/橙/红）—— 字母先用 D/C/B/A/S/SS
export const GRADE = [
  { key: "D",  name: "白", color: "#d8d8d8", mult: 1.00, cost: 0 },
  { key: "C",  name: "绿", color: "#7ee787", mult: 1.06, cost: 20 },
  { key: "B",  name: "蓝", color: "#6ea8fe", mult: 1.13, cost: 50 },
  { key: "A",  name: "紫", color: "#c9a0ff", mult: 1.22, cost: 120 },
  { key: "S",  name: "橙", color: "#ffb86b", mult: 1.32, cost: 260 },
  { key: "SS", name: "红", color: "#ff6b6b", mult: 1.45, cost: 520 }
];

// 🎯 资质评估（1★ ~ 7★）—— 每星全属性 +4%
export const APTITUDE = [
  { star: 1, mult: 1.00, cost: 0 },
  { star: 2, mult: 1.04, cost: 30 },
  { star: 3, mult: 1.08, cost: 70 },
  { star: 4, mult: 1.13, cost: 150 },
  { star: 5, mult: 1.18, cost: 300 },
  { star: 6, mult: 1.24, cost: 600 },
  { star: 7, mult: 1.30, cost: 1000 }
];

// 🎲 建角：基础四项（百分比）与专精四项（绝对值）共用点数
export const BIRTH = {
  basicPoints: 40, basicPct: 5, basicCap: 10,     // 生命/攻击/防御/法抗
  specPoints: 24, specCap: 8,                     // 力量/智力/技巧/敏捷
  specEffect: { str: 2, int: 2, tech: 2, agi: 0.6 }  // 力=近战伤、智=法术伤、技=远程伤、敏=速度
};

// 🧬 建角预设模型（一键套用，可再微调）
export const PRESETS = [
  { id: "balance", name: "⚖️ 均衡", basic: { hp: 10, atk: 10, def: 10, res: 10 }, spec: { str: 6, int: 6, tech: 6, agi: 6 }, role: "守护" },
  { id: "power",   name: "🔥 力量型", basic: { hp: 10, atk: 10, def: 10, res: 10 }, spec: { str: 8, int: 5, tech: 6, agi: 5 }, role: "先锋" },
  { id: "agile",   name: "🏹 敏攻型", basic: { hp: 10, atk: 10, def: 10, res: 10 }, spec: { str: 4, int: 4, tech: 8, agi: 8 }, role: "游侠" },
  { id: "magic",   name: "🔮 法系型", basic: { hp: 10, atk: 10, def: 10, res: 10 }, spec: { str: 4, int: 8, tech: 4, agi: 8 }, role: "术士" },
  { id: "tank",    name: "🛡️ 坦克型", basic: { hp: 10, atk: 10, def: 10, res: 10 }, spec: { str: 6, int: 4, tech: 8, agi: 6 }, role: "守护" }
];

export const CHAR = {
  maxLevel: 100,
  base: { atk: 60, hp: 500, def: 20, res: 15, spd: 10, critRate: 5, critDmg: 150 },
  perLevel: { atk: 6, hp: 40, def: 2, res: 1.5, spd: 0.1 },
  expNeed: (lv) => Math.round(80 * Math.pow(1.12, lv - 1)),
  spec: { str: 2, agi: 1.5, intel: 1, tech: 1 }
};

// ⚡ 突破节点（v2 定稿）：到点必须先突破才能继续升级
export const BREAKS = [
  { at: 20,  capTo: 40,  stone: 10,  gold: 2000,  bonus: 3, points: 3 },
  { at: 40,  capTo: 60,  stone: 25,  gold: 6000,  bonus: 3, points: 3 },
  { at: 60,  capTo: 80,  stone: 50,  gold: 14000, bonus: 3, points: 3 },
  { at: 80,  capTo: 100, stone: 90,  gold: 28000, bonus: 3, points: 3 },
  { at: 100, capTo: 100, stone: 150, gold: 50000, bonus: 3, points: 3 }
];
export const SHOP_PRICE = {
  weapon: { R: 400, SR: 1000, SSR: 2200, UR: 5400 },
  armor: { R: 350, SR: 850, SSR: 1900, UR: 4400 },
  accessory: { R: 300, SR: 750, SSR: 1700, UR: 4100 }
};
