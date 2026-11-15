// 闲得慌RPG v2 · 数据（纯数据，无逻辑）
export const RARITY_MULT = { R: 1, SR: 1.15, SSR: 1.3, UR: 1.5 };
// 🚧 内容开关：装备选择已开放；关卡内容仍待定（数据保留）
export const CONTENT_READY = true;
export const STAGE_READY = true;
export const SLOT_BASE = {
  weapon: { atk: 40 },
  armor: { hp: 220, def: 18, res: 14 },
  accessory: { atk: 6, hp: 50, spd: 1 }
};
export const WEAPONS = [
  {
    id: "w_k", name: "究极热动拳套", rarity: "SSR", style: "melee", limited: "26 庆典限定",
    atk: 104, aMult: 100, aHits: 2, uMult: 240, uHits: 1, uShape: "col",
    sName: "扳机", sMult: 68, sHits: 3, sSegWeights: [0.85, 1.0, 1.15], sCd: 3, sRage: 14, sShape: "single",
    aName: "刺拳", uName: "热动", dmgType: "phys",
    main: { atk: 104 }, aRage: 20, critRate: 10, critDmg: 22,
    desc: "缠着赤红火焰的拳套，热动解开手套的那一刻最危险。"
  },
  {
    id: "w_kyo", name: "草薙流古武典", rarity: "SSR", style: "melee", limited: "26 庆典限定",
    atk: 108, aMult: 115, aHits: 1, uMult: 100,
    desc: "草薙流代代相传的武典，记载着赤炎之拳的完整招式；越战越热，出手便是连段。",
    main: { atk: 108 }, aRage: 18, sRage: 0,
    aName: "外式·轰斧", uName: "大蛇薙", dmgType: "phys", uHits: 3,
    sName: "百八式·暗拂", sMult: 95, sHits: 2, sSegWeights: [0.9, 1.1], sCd: 3, sRage: 8, sShape: "single", uShape: "col",
    critRate: 8, critDmg: 25
  },

  // ── 通用 SSR 武器（玩家通用，非限定） ──────────
  { id: "w_bubble", name: "星辉法杖", rarity: "SSR", style: "focus", atk: 74,
    aMult: 105, aHits: 2, uMult: 220, uShape: "all", uHits: 1,
    sName: "星屑连射", sMult: 85, sHits: 2, sCd: 3, sRage: 12, sShape: "single",
    aName: "星光弹", uName: "星陨风暴", dmgType: "spell",
    main: { atk: 74 }, aRage: 22, critRate: 6, critDmg: 15,
    desc: "星辉凝成的法杖，杖头会自己发亮。" },
  { id: "w_hammer", name: "苍穹之刃", rarity: "SSR", style: "melee", atk: 90,
    aMult: 130, aHits: 1, uMult: 320, uShape: "single", uHits: 1,
    sName: "裂空斩", sMult: 200, sHits: 1, sCd: 4, sRage: 16, sShape: "single",
    aName: "斩击", uName: "苍穹断", dmgType: "phys",
    main: { atk: 90 }, aRage: 14, critRate: 5, critDmg: 30,
    desc: "据说斩开过云层的大剑，剑身泛着青光。" },
  { id: "w_fan", name: "破军重枪", rarity: "SSR", style: "melee", atk: 86,
    aMult: 95, aHits: 1, uMult: 260, uShape: "all", uHits: 1,
    sName: "横扫千军", sMult: 175, sHits: 1, sCd: 3, sRage: 20, sShape: "row",
    aName: "突刺", uName: "破军一击", dmgType: "phys",
    main: { atk: 86 }, aRage: 14, critRate: 5, critDmg: 20,
    desc: "军中重器，一枪能穿透三层甲。" },
  { id: "w_toybow", name: "疾风双刃", rarity: "SSR", style: "melee", atk: 76,
    aMult: 105, aHits: 2, uMult: 280, uShape: "row", uHits: 1,
    sName: "疾风三连", sMult: 92, sHits: 3, sCd: 3, sRage: 8, sShape: "single",
    aName: "双连斩", uName: "风刃乱舞", dmgType: "phys",
    main: { atk: 76 }, aRage: 24, critRate: 8, critDmg: 15,
    desc: "轻得几乎没有重量，出手便是三连。" },
  { id: "w_tambourine", name: "圣愈权杖", rarity: "SSR", style: "focus", atk: 66,
    aMult: 90, aHits: 1, uMult: 210, uShape: "all", uHits: 1,
    sName: "祈愈之光", sMult: 150, sHits: 1, sCd: 3, sRage: 22, sShape: "single",
    aName: "杖击", uName: "圣光普照", dmgType: "spell",
    main: { atk: 66 }, aRage: 10, critRate: 4, critDmg: 15,
    desc: "杖顶嵌着温润的圣石，靠近会觉得安心。" },
  { id: "w_thunder2", name: "雷鸣双戟", rarity: "SSR", style: "melee", atk: 82,
    aMult: 100, aHits: 2, uMult: 300, uShape: "single", uHits: 2,
    sName: "雷贯", sMult: 96, sHits: 2, sCd: 3, sRage: 12, sShape: "row",
    aName: "双戟连击", uName: "万雷轰顶", dmgType: "phys",
    main: { atk: 82 }, aRage: 18, critRate: 9, critDmg: 20,
    desc: "双戟交错时会拉出电弧，命中带麻。" },
  { id: "w_umbra", name: "幽影短弩", rarity: "SSR", style: "ranged", atk: 78,
    aMult: 105, aHits: 1, uMult: 250, uShape: "col", uHits: 2,
    sName: "影矢", sMult: 150, sHits: 2, sCd: 3, sRage: 10, sShape: "col",
    aName: "短弩射击", uName: "幽影贯穿", dmgType: "phys",
    main: { atk: 78 }, aRage: 22, critRate: 12, critDmg: 25,
    desc: "无声无光，箭出来时人已经倒了。" },
  { id: "w_tide", name: "潮汐法典", rarity: "SSR", style: "focus", atk: 80,
    aMult: 95, aHits: 1, uMult: 210, uShape: "all", uHits: 2,
    sName: "潮涌", sMult: 120, sHits: 2, sCd: 3, sRage: 18, sShape: "all",
    aName: "水刃", uName: "怒潮倾覆", dmgType: "spell",
    main: { atk: 80 }, aRage: 12, critRate: 6, critDmg: 18,
    desc: "书页会渗出水珠，翻动时像退潮。" },
  // ── R 阶（新手档）：只有普攻 + 必杀，没有技能 ──────────
  { id: "w_iron", name: "铁剑", rarity: "R", style: "melee", atk: 5, aMult: 100, aHits: 1, uMult: 260,
    desc: "协会统一配发的制式长剑，没有花哨的机关，胜在称手耐造。" },
  { id: "w_bow", name: "短弓", rarity: "R", style: "ranged", critRate: 2, aMult: 90, aHits: 2, uMult: 230,
    desc: "轻便的猎弓，拉满一箭能扎穿皮甲，出手比近战慢半拍。" },
  { id: "w_wood", name: "木法杖", rarity: "R", dmgType: "spell", style: "focus", res: 5, aMult: 95, aHits: 1, uMult: 240,
    desc: "学徒用的橡木杖，能引出一小团木灵之力，法术伤害但不算高。" },
  { id: "w_dagger", name: "短匕", rarity: "R", style: "melee", spd: 2, aMult: 70, aHits: 2, uMult: 300,
    desc: "贴身短刀，伤害不高，但出手极快，适合抢节奏。" },
  { id: "w_fist", name: "拳套", rarity: "R", style: "melee", spd: 1, aMult: 80, aHits: 2, uMult: 280,
    desc: "皮制拳套，左右开弓，一套打完正好接必杀。" },
  { id: "w_spear", name: "长枪", rarity: "R", style: "melee", atk: 4, aMult: 110, aHits: 1, uMult: 240,
    desc: "一丈长的木杆枪，捅得远、扎得稳，但转身慢。" },
  { id: "w_sling", name: "投石索", rarity: "R", style: "ranged", critRate: 1, aMult: 85, aHits: 2, uMult: 220,
    desc: "一根皮绳兜着石子，甩两下能砸出两个包。" },
  { id: "w_hunt", name: "猎弩", rarity: "R", style: "ranged", critRate: 1, aMult: 100, aHits: 1, uMult: 250,
    desc: "猎户用的小弩，上弦慢，但瞄得准。" },
  { id: "w_torch", name: "火把", rarity: "R", dmgType: "spell", style: "melee", res: 3, aMult: 90, aHits: 1, uMult: 260,
    desc: "烧着的木棒，谈不上法器，但火苗确实是法术伤害。" },
  { id: "w_shield", name: "木盾", rarity: "R", style: "melee", dmgCut: 2, aMult: 90, aHits: 1, uMult: 240,
    desc: "厚木板钉成的圆盾，砸人比砍人更顺手。" },
  // ── SR 阶：普攻 / 技能 / 必杀 三招齐全 ─────────────
  { id: "w_twin", name: "双刃短刀", rarity: "SR", style: "melee", aMult: 90, aHits: 2, uMult: 280,
    sName: "连斩", sMult: 160, sHits: 2, sCd: 2, sRage: 15,
    desc: "两把短刀交替出手，收招快，适合贴身缠斗。" },
  { id: "w_axe", name: "裂地战斧", rarity: "SR", style: "melee", aMult: 110, aHits: 1, uMult: 300,
    sName: "裂地", sMult: 210, sCd: 3, sRage: 20, sunderBoost: 30,
    desc: "斧刃砸地，一击能把护甲震裂。" },
  { id: "w_spear2", name: "穿云长枪", rarity: "SR", style: "melee", aMult: 105, aHits: 1, uMult: 270,
    sName: "穿刺", sMult: 185, sCd: 3, sRage: 18, penetrate: 15,
    desc: "枪尖专找甲缝，正面很难挡。" },
  { id: "w_cross", name: "复合十字弩", rarity: "SR", style: "ranged", aMult: 100, aHits: 1, uMult: 260,
    sName: "穿甲箭", sMult: 170, sCd: 3, sRage: 18, penetrate: 20,
    desc: "军械坊改的连发弩，弩箭能咬进甲缝里。" },
  { id: "w_longbow", name: "猎风长弓", rarity: "SR", style: "ranged", aMult: 90, aHits: 2, uMult: 270,
    sName: "三连射", sMult: 150, sHits: 3, sCd: 4, sRage: 20,
    desc: "长弓拉满一次能连放三箭。" },
  { id: "w_firestaff", name: "火石法杖", rarity: "SR", dmgType: "spell", style: "focus", aMult: 95, aHits: 1, uMult: 280,
    sName: "火球", sMult: 185, sCd: 3, sRage: 22, hitStatus: "burn", hitStatusV: 4, hitStatusTurns: 2, hitStatusName: "灼烧",
    desc: "杖头镶着火石，挥出去就是一团火。" },
  { id: "w_thunder", name: "雷鸣短杖", rarity: "SR", dmgType: "spell", style: "focus", aMult: 95, aHits: 1, uMult: 270,
    sName: "雷击", sMult: 175, sCd: 3, sRage: 20, stun: 25,
    desc: "短杖一敲，雷声比人先到。" },
  { id: "w_aegis", name: "守护权杖", rarity: "SR", style: "focus", aMult: 95, aHits: 1, uMult: 250,
    sName: "圣盾", sSupport: "shield", sShieldPct: 25, sCd: 3, sRage: 20,
    desc: "祈礼用的权杖，能把信仰凝成一面盾。" },
  { id: "w_purify", name: "净化铃", rarity: "SR", style: "focus", aMult: 95, aHits: 1, uMult: 250,
    sName: "净化", sSupport: "dispel", sDispelN: 2, sCd: 2, sRage: 15,
    desc: "摇一摇就能把身上的晦气抖落。" }
];
// ── SR / SSR / UR 尚未设计：旧占位装备已移除，等正式设计后再加 ─────
// 🔧 武器主属性（逐件绝对值，不吃稀有度乘数）——R 与 SR 差距控制在 1.2~1.4 倍
const WEAPON_ATK = {
  w_iron: 40, w_bow: 38, w_wood: 36, w_dagger: 34, w_fist: 36,
  w_spear: 42, w_sling: 34, w_hunt: 38, w_torch: 36, w_shield: 38,
  w_twin: 50, w_axe: 50, w_spear2: 50, w_cross: 50, w_longbow: 48,
  w_firestaff: 50, w_thunder: 50, w_aegis: 46, w_purify: 44};
WEAPONS.forEach((w) => { if (WEAPON_ATK[w.id]) w.main = { atk: WEAPON_ATK[w.id] }; });
// 🌊 攻击形式：single 单体 / row 一排 / col 一列 / cross 十字 / all 全体；back 无视前排
const WEAPON_SHAPE = {
  w_twin: { sShape: "single", uShape: "single" },
  w_axe: { sShape: "all", uShape: "all" },
  w_spear2: { sShape: "col", uShape: "col" },
  w_cross: { sShape: "single", uShape: "row" },
  w_longbow: { sShape: "single", sBack: 1, uShape: "all" },
  w_firestaff: { sShape: "all", uShape: "all" },
  w_thunder: { sShape: "single", uShape: "cross" },
  w_aegis: { sShape: "single" },
  w_purify: { sShape: "single" }
};
WEAPONS.forEach((w) => Object.assign(w, WEAPON_SHAPE[w.id] || {}));
// 🗡 SR 武器数值重做（普攻/技能/必杀）
const WEAPON_TUNE = {
  w_twin: { sName: "追影", sMult: 180, sHits: 2, sCd: 3, uMult: 320, uHits: 2 },
  w_axe: { sName: "裂地", sMult: 200, sCd: 4, uMult: 300, sunderBoost: 30 },
  w_spear2: { sName: "穿云", sMult: 210, sCd: 3, uMult: 330, penetrate: 15 },
  w_cross: { sName: "破甲弩", sMult: 190, sCd: 3, uMult: 300, penetrate: 20 },
  w_longbow: { sName: "猎风", sMult: 170, sHits: 2, sCd: 3, uMult: 260 },
  w_firestaff: { sName: "火石", sMult: 200, sCd: 4, uMult: 300, burn: true },
  w_thunder: { sName: "雷鸣", sMult: 190, sCd: 4, uMult: 320, stun: 30 },
  w_aegis: { sName: "守护", sSupport: "shield", sShieldPct: 25, sCd: 3, uMult: 0 },
  w_purify: { sName: "净化", sSupport: "dispel", sDispelN: 2, sCd: 3, uMult: 0 }
};
WEAPONS.forEach((w) => Object.assign(w, WEAPON_TUNE[w.id] || {}));
// 🗡 全武器重做：主属性（攻击）+ 副属性 + 招式组（形式/距离/类别/效果）
const WEAPON_FINAL = {
  // ── R ──────────────────────────────
  w_iron: { atk: 40, style: "melee", dmgType: "phys", sub: { atk: 5 },
    aMult: 100, uMult: 250, desc: "最普通的铁剑，胜在趁手。" },
  w_bow: { atk: 38, style: "ranged", dmgType: "phys", sub: { critRate: 2 },
    aMult: 95, uMult: 240, desc: "轻便的短弓，拉起来不费力。" },
  w_wood: { atk: 36, style: "focus", dmgType: "spell", sub: { res: 5 },
    aMult: 90, uMult: 230, desc: "练习用的木法杖，也能砸人。" },
  w_dagger: { atk: 34, style: "melee", dmgType: "phys", sub: { spd: 1 },
    aMult: 90, aHits: 2, uMult: 220, uHits: 2, desc: "短刃贴身，出手极快。" },
  w_fist: { atk: 36, style: "melee", dmgType: "phys", sub: { critRate: 1 },
    aMult: 85, aHits: 2, uMult: 210, uHits: 2, desc: "缠着布条的铁拳套。" },
  w_spear: { atk: 42, style: "melee", dmgType: "phys", sub: { hp: 20 },
    aMult: 105, uMult: 260, desc: "长枪一寸长一寸强。" },
  w_sling: { atk: 34, style: "ranged", dmgType: "phys", sub: { spd: 1 },
    aMult: 100, uMult: 240, desc: "投石索，打不死人也疼。" },
  w_hunt: { atk: 38, style: "ranged", dmgType: "phys", sub: { critRate: 2 },
    aMult: 110, uMult: 250, desc: "猎弩上弦慢，但这一下够狠。" },
  w_torch: { atk: 36, style: "melee", dmgType: "spell", sub: { res: 3 },
    aMult: 95, uMult: 230, burn: true, desc: "火把当武器，烫手也烫敌。" },
  w_shield: { atk: 38, style: "melee", dmgType: "phys", sub: { def: 6 },
    aMult: 90, uMult: 230, desc: "木盾主要用来挡，其次才是砸。" },
  // ── SR ─────────────────────────────
  w_twin: { atk: 50, style: "melee", dmgType: "phys", sub: { critRate: 3 },
    aMult: 100, aHits: 2, sName: "追影", sMult: 180, sHits: 2, sShape: "single", sCd: 3, sRage: 10,
    uMult: 320, uHits: 2, uShape: "single", desc: "双刃交错，追着影子砍。" },
  w_axe: { atk: 50, style: "melee", dmgType: "phys", sub: { hp: 40 },
    aMult: 110, sName: "裂地", sMult: 200, sShape: "all", sCd: 4, sunderBoost: 30, sRage: 5,
    uMult: 300, uShape: "all", desc: "一斧落地，半圈都碎。" },
  w_spear2: { atk: 50, style: "melee", dmgType: "phys", sub: { atk: 6 },
    aMult: 105, sName: "穿云", sMult: 210, sShape: "col", sCd: 3, penetrate: 15, sRage: 8,
    uMult: 330, uShape: "col", desc: "枪尖专找甲缝，正面很难挡。" },
  w_cross: { atk: 50, style: "ranged", dmgType: "phys", sub: { critRate: 4 },
    aMult: 100, sName: "破甲弩", sMult: 190, sShape: "single", sCd: 3, penetrate: 20, sRage: 8,
    uMult: 300, uShape: "row", desc: "弩机沉重，专破重甲。" },
  w_longbow: { atk: 48, style: "ranged", dmgType: "phys", sub: { spd: 2 },
    aMult: 95, aHits: 2, sName: "猎风", sMult: 170, sHits: 2, sShape: "single", sCd: 3, sRage: 10,
    uMult: 260, uShape: "all", desc: "长弓拉满，风声先到。" },
  w_firestaff: { atk: 50, style: "focus", dmgType: "spell", sub: { res: 8 },
    aMult: 100, sName: "火石", sMult: 200, sShape: "all", sCd: 4, burn: true, sRage: 6,
    uMult: 300, uShape: "all", desc: "杖头火石，落地一片火。" },
  w_thunder: { atk: 50, style: "focus", dmgType: "spell", sub: { critRate: 3 },
    aMult: 100, sName: "雷鸣", sMult: 190, sShape: "single", sCd: 4, stun: 30, sRage: 8,
    uMult: 320, uShape: "cross", desc: "短杖一响，雷先劈下来。" },
  w_aegis: { atk: 46, style: "focus", dmgType: "spell", sub: { res: 10, hp: 30 },
    aMult: 90, sName: "守护", sSupport: "shield", sShieldPct: 25, sCd: 3,
    uMult: 230, uShape: "single", desc: "权杖立地，替人挡下。" },
  w_purify: { atk: 44, style: "focus", dmgType: "spell", sub: { res: 12, spd: 1 },
    aMult: 90, sName: "净化", sSupport: "dispel", sDispelN: 2, sCd: 3,
    uMult: 220, uShape: "single", desc: "铃声清亮，能驱散不干净的东西。" }
};
// ⚡ 每把武器的回怒效率（普攻 / 技能）
const WEAPON_RAGE = {
  w_iron: { aRage: 20, sRage: 0 }, w_bow: { aRage: 22 }, w_wood: { aRage: 25 },
  w_dagger: { aRage: 9 }, w_fist: { aRage: 8 }, w_spear: { aRage: 26 },
  w_sling: { aRage: 20 }, w_hunt: { aRage: 18 }, w_torch: { aRage: 22 }, w_shield: { aRage: 15 },
  w_twin: { aRage: 9, sRage: 6 }, w_axe: { aRage: 26, sRage: 10 }, w_spear2: { aRage: 24, sRage: 12 },
  w_cross: { aRage: 20, sRage: 12 }, w_longbow: { aRage: 10, sRage: 7 }, w_firestaff: { aRage: 22, sRage: 12 },
  w_thunder: { aRage: 23, sRage: 12 }, w_aegis: { aRage: 28, sRage: 16 }, w_purify: { aRage: 30, sRage: 18 }
};
WEAPONS.forEach((w) => {
  const g = WEAPON_RAGE[w.id];
  if (!g) return;
  if (g.aRage != null) w.aRage = g.aRage;
  if (g.sRage != null) w.sRage = g.sRage;
});
const WEAPON_SKILL_NAMES = {
  w_iron: { aName: "直斩", uName: "铁锋一闪" },
  w_bow: { aName: "速射", uName: "穿叶" },
  w_wood: { aName: "敲击", uName: "木灵一击" },
  w_dagger: { aName: "双划", uName: "匿影刺" },
  w_fist: { aName: "连拳", uName: "崩山拳" },
  w_spear: { aName: "突刺", uName: "长驱直入" },
  w_sling: { aName: "抛石", uName: "破空石" },
  w_hunt: { aName: "上弦", uName: "猎杀" },
  w_torch: { aName: "挥火", uName: "燎原" },
  w_shield: { aName: "盾撞", uName: "铁壁反冲" },
  w_twin: { aName: "交错", sName: "追影", uName: "双影绝杀" },
  w_axe: { aName: "劈砍", sName: "裂地", uName: "山河俱裂" },
  w_spear2: { aName: "点刺", sName: "穿云", uName: "一枪贯日" },
  w_cross: { aName: "瞄准", sName: "破甲弩", uName: "万矢横排" },
  w_longbow: { aName: "连射", sName: "猎风", uName: "箭落如雨" },
  w_firestaff: { aName: "火星", sName: "火石", uName: "焚野" },
  w_thunder: { aName: "电击", sName: "雷鸣", uName: "十方雷狱" },
  w_aegis: { aName: "杖击", sName: "守护", uName: "圣光壁垒" },
  w_purify: { aName: "铃响", sName: "净化", uName: "清心普照" }
};
WEAPONS.forEach((w) => {
  const n = WEAPON_SKILL_NAMES[w.id];
  if (!n) return;
  if (n.aName) w.aName = n.aName;
  if (n.sName) w.sName = n.sName;
  if (n.uName) w.uName = n.uName;
});
WEAPONS.forEach((w) => {
  const f = WEAPON_FINAL[w.id];
  if (!f) return;
  w.main = { atk: f.atk };
  w.style = f.style;
  w.dmgType = f.dmgType;
  Object.assign(w, f.sub || {});
  ["aMult", "aHits", "sName", "sMult", "sHits", "sShape", "sCd", "sRage", "sSupport", "sShieldPct", "sDispelN",
    "uMult", "uHits", "uShape", "sunderBoost", "penetrate", "stun", "burn"].forEach((k) => {
    if (f[k] != null) w[k] = f[k];
  });
  if (f.desc) w.desc = f.desc;
});
// 回怒效率最终覆盖（避免被上面的招式数据覆盖）
WEAPONS.forEach((w) => {
  const g = WEAPON_RAGE[w.id];
  if (!g) return;
  if (g.aRage != null) w.aRage = g.aRage;
  if (g.sRage != null) w.sRage = g.sRage;
});

export const ARMORS = [
  // ── 上装（part: top）─────────────────
  { id: "a_cloth", name: "粗布衣", part: "top", rarity: "R", main: { hp: 100 }, dmgCut: 2, desc: "最普通的粗布上衣，挡不住刀，但聊胜于无。" },
  { id: "a_leather", name: "皮甲", part: "top", rarity: "R", main: { def: 8 }, desc: "鞣过的兽皮缝成的背心，硬邦邦的，挡钝器还行。" },
  { id: "a_mirror", name: "护心镜", part: "top", rarity: "R", main: { res: 10 }, desc: "一块磨亮的铜镜挂在胸口，图个心安。" },
  { id: "a_lava", name: "熔岩护甲", part: "top", rarity: "SR", main: { hp: 220, def: 10 }, dmgCut: 6, thorns: 10, desc: "嵌了火山岩的厚甲，打上去会烫手。" },
  { id: "a_mitril", name: "秘银轻甲", part: "top", rarity: "SR", main: { hp: 180, def: 12 }, dmgCut: 5, spd: 2, desc: "轻得出奇，挨打时却比铁甲还硬。" },
  { id: "a_guard", name: "铁卫护心镜", part: "top", rarity: "SR", main: { res: 18 }, dmgCut: 3, desc: "卫队制式的护心镜，挡法术也有一手。" },
  { id: "a_bulwark", name: "铁壁重甲", part: "top", rarity: "SR", main: { hp: 260, def: 14 }, dmgCut: 7, desc: "厚得能当墙用，走两步就喘。" },
  { id: "a_berserk", name: "狂战皮甲", part: "top", rarity: "SR", main: { hp: 160 }, atkPct: 4, desc: "划痕越多，穿的人越兴奋。" },
  { id: "a_rune", name: "法纹长袍", part: "top", rarity: "SR", main: { hp: 180, res: 10 }, dmgCut: 2, desc: "袍角绣着细密法纹，碰一下会发麻。" },
  { id: "a_pray", name: "祷言圣袍", part: "top", rarity: "SR", main: { hp: 200, res: 12 }, dmgCut: 2, desc: "袖口磨得发白，显然常被攥紧。" },
  // ── 下装（part: bottom）───────────────
  { id: "a_rattan", name: "藤甲护腿", part: "bottom", rarity: "R", main: { hp: 160 }, desc: "藤条编的护腿，轻，但挨打时会吱呀响。" },
  { id: "a_cloak", name: "轻便护腿", part: "bottom", rarity: "R", main: { spd: 2 }, desc: "薄布护腿，不挡刀，胜在不拖脚步。" },
  { id: "a_spike", name: "钉刺护腿", part: "bottom", rarity: "R", main: { def: 6 }, thorns: 3, desc: "内侧钉了铁刺，谁踢上来谁疼。" },
  { id: "a_vine", name: "藤蔓重腿", part: "bottom", rarity: "SR", main: { hp: 320 }, def: 10, desc: "层层老藤缠成的重腿甲，笨重但耐打。" },
  { id: "a_rock", name: "磐石护腿", part: "bottom", rarity: "SR", main: { def: 20 }, dmgCut: 4, desc: "整块石料磨的护腿，硬得离谱。" },
  { id: "a_rift", name: "裂痕长裤", part: "bottom", rarity: "SR", main: { hp: 200 }, thorns: 5, desc: "裤面全是旧裂口，却没人补。" },
  { id: "a_wind", name: "追风短裤", part: "bottom", rarity: "SR", main: { hp: 120, spd: 2 }, dmgCut: 3, desc: "薄得像一层风，跑起来几乎没声音。" },
  { id: "a_shadow", name: "影行长裤", part: "bottom", rarity: "SR", main: { hp: 100, spd: 3 }, dmgCut: 2, critRate: 1, desc: "穿上之后，脚步声会自己消失。" },
  { id: "a_aura", name: "灵能护腿", part: "bottom", rarity: "SR", main: { hp: 160, res: 12 }, dmgCut: 4, desc: "表面浮着一层看不见的薄膜。" },
  { id: "a_watch", name: "守望护腿", part: "bottom", rarity: "SR", main: { hp: 240, def: 8 }, desc: "巡逻队制式，轻便又耐站。" }
];
export const ACCESSORIES = [
  { id: "c_rope", name: "布绳", rarity: "R", main: { atk: 4, spd: 1 }, desc: "随手系在手腕上的布绳，图个心安。" },
  { id: "c_beads", name: "木珠串", rarity: "R", main: { hp: 70 }, desc: "几颗木珠串成的手串，据说能压惊。" },
  { id: "c_charm", name: "铜护符", rarity: "R", main: { def: 6 }, desc: "小铜片打的护符，边角已经磨圆了。" },
  { id: "c_glove", name: "皮质手套", rarity: "R", main: { spd: 2 }, desc: "旧皮手套，握东西更稳，动作也利索一点。" },
  { id: "c_luck", name: "幸运石", rarity: "R", main: { critRate: 3 }, desc: "路边捡的白色小石头，据说能带来好运。" },
  { id: "c_band", name: "麻布护腕", rarity: "R", main: { res: 6 }, desc: "缠在手腕上的麻布，挡不住什么，但心里有底。" },
  // ── SR ─────────────────────────────
  { id: "c_ring", name: "承山戒", rarity: "SR", main: { atk: 6 }, desc: "戒指内圈刻着山纹，握拳时像压着一座山。" },
  { id: "c_lavastone", name: "熔岩护石", rarity: "SR", main: { atk: 4, critDmg: 6 }, desc: "温热的黑石，擦出的火花特别亮。" },
  { id: "c_feather", name: "疾风羽", rarity: "SR", main: { spd: 3 }, desc: "一片轻得几乎没有重量的羽毛。" },
  { id: "c_mitril", name: "秘银坠", rarity: "SR", main: { atk: 5, spd: 1 }, desc: "细链坠着一小块秘银，凉丝丝的。" },
  // 守护
  { id: "c_bulwark", name: "磐石护符", rarity: "SR", main: { def: 10 }, desc: "厚石片打的护符，沉甸甸地压手。" },
  { id: "c_ironheart", name: "铁心吊坠", rarity: "SR", main: { hp: 100 }, desc: "一小块铁心嵌在坠子里，据说能定神。" },
  // 先锋
  { id: "c_badge", name: "战意徽章", rarity: "SR", main: { atk: 5, critRate: 2 }, desc: "旧徽章上的数字已经磨掉了。" },
  { id: "c_fury", name: "狂怒指环", rarity: "SR", main: { atk: 6 }, desc: "戴上之后，握拳会微微发烫。" },
  // 游侠
  { id: "c_goggle", name: "猎手目镜", rarity: "SR", main: { critRate: 4, spd: 2 }, desc: "镜片有划痕，但看远处依然清楚。" },
  { id: "c_windcharm", name: "追风羽饰", rarity: "SR", main: { spd: 4 }, desc: "两片羽毛串成的饰物，风一吹就抖。" },
  // 术士
  { id: "c_arcanestone", name: "秘能石", rarity: "SR", main: { res: 8, atk: 2 }, desc: "石头内部像有光在慢慢流动。" },
  { id: "c_runering", name: "咒文戒", rarity: "SR", main: { atk: 4, critDmg: 8 }, desc: "戒面刻着看不懂的细字。" },
  // 辅佐
  { id: "c_bell", name: "祈愿铃", rarity: "SR", main: { res: 9, hp: 40 }, desc: "铃舌很轻，摇起来只有自己听得见。" },
  { id: "c_mercy", name: "慈心吊坠", rarity: "SR", main: { hp: 80 }, dmgCut: 2, desc: "链条上挂着一枚小小的木十字。" }
];
import { enemyAt, ENEMIES } from "./enemies.js?v=5054b7b7";
const DUNGEON_LEVELS = [5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 80];
const foeOf = (name, lv, mul = 1) => ({
  name, lv,
  hp: Math.round((420 + lv * 46) * mul),
  atk: Math.round((38 + lv * 3.4) * mul),
  def: Math.round((10 + lv * 1.3) * mul),
  res: Math.round((8 + lv * 1.1) * mul),
  spd: Math.round((8 + lv * 0.09) * 10) / 10
});
const stageRewards = (kind, i) => {
  const g = Math.pow(1.18, i);
  const mile = (i + 1) % 5 === 0 ? 2 : 1;
  const r = { exp: 0, gold: 0, drop: {} };
  if (kind === "exp") { r.exp = Math.round(120 * g * mile); r.gold = Math.round(40 * g); }
  if (kind === "gold") { r.gold = Math.round(240 * g * mile); r.exp = Math.round(30 * g); }
  if (kind === "char") { r.drop.bstone = Math.round((1 + i * 0.95) * mile); r.exp = Math.round(25 * g); }
  if (kind === "gear") { r.drop.stone = Math.round((5 + i * 3.5) * mile); r.drop.shards = Math.round((10 + i * 8) * mile); r.exp = Math.round(25 * g); }
  return r;
};
function makeDaily(id, name, kind, icon, desc, foeName) {
  const stages = DUNGEON_LEVELS.map((lv, i) => {
    const r = stageRewards(kind, i);
    return {
      id: kind + "_" + (i + 1), name: "第 " + (i + 1) + " 关 · Lv" + lv, lv,
      group: Math.floor(i / 5) + 1, milestone: (i + 1) % 5 === 0,
      tier: i === 19 ? "首领" : (i === 9 || i === 14) ? "特色" : i === 4 ? "精英" : "普通",
      gold: r.gold, exp: r.exp,
      foe: foeOf(foeName, lv, (1 + Math.floor(i / 10) * 0.15) * 2.4),
      drop: Object.assign({ shards: [0, 0], stone: [0, 0], bstone: 0, gearChance: 0, manuscript: 0, medal: 0, medalChance: 0 }, r.drop)
    };
  });
  return { id, name, kind, icon, desc, type: "daily", stages };
}
// 🍁 经验本 · 红枫团（20 关，敌人按 Lv1 模板缩放）
// 🌦 战斗环境（天气）：影响双方属性
export const ENVIRONMENTS = {
  clear: { name: "晴朗", icon: "☀️", desc: "天气晴好，双方行动如常。", mods: {} },
  rain: { name: "细雨", icon: "🌦", desc: "速度 -5%。", mods: { spdPct: -5 } },
  storm: { name: "暴雨", icon: "⛈", desc: "速度 -10%，远程伤害 -15%。", mods: { spdPct: -10, rangedPct: -15 } },
  sun: { name: "烈日", icon: "🔥", desc: "攻击 +10%，防御 -10%。", mods: { atkPct: 10, defPct: -10 } },
  night: { name: "夜战", icon: "🌙", desc: "暴击率 -5%，法术伤害 +10%。", mods: { critRate: -5, spellPct: 10 } },
  fog: { name: "浓雾", icon: "🌫", desc: "远程伤害 -15%，速度 -5%。", mods: { rangedPct: -15, spdPct: -5 } },
  wind: { name: "山风", icon: "🌬", desc: "速度 +5%，远程伤害 -10%。", mods: { spdPct: 5, rangedPct: -10 } },
  heat: { name: "酷热", icon: "🌡", desc: "攻击 +8%，生命 -5%。", mods: { atkPct: 8, hpPct: -5 } },
  ash: { name: "灰烬", icon: "🌋", desc: "法术伤害 +10%，法抗 -8%。", mods: { spellPct: 10, resPct: -8 } },
  snow: { name: "风雪", icon: "❄️", desc: "速度 -8%，法抗 +8%。", mods: { spdPct: -8, resPct: 8 } },
  sand: { name: "沙尘", icon: "🌪", desc: "暴击率 -4%，速度 -6%。", mods: { critRate: -4, spdPct: -6 } },
  gale: { name: "强风", icon: "🌀", desc: "速度 +8%，防御 -5%。", mods: { spdPct: 8, defPct: -5 } }
};
// 🏞 场景（场地）：固定地形效果，每 2 关一处
export const SCENES = [
  { name: "红枫山林小径", desc: "林间小路视野开阔，行军轻快。", mods: { spdPct: 5 } },
  { name: "红枫营区前沿", desc: "营区外围无遮无挡，远程有优势。", mods: { rangedPct: 10 } },
  { name: "红枫营区隘口", desc: "两山夹一隘，易守难攻。", mods: { defPct: 10 } },
  { name: "红枫营区下山区", desc: "下坡地势，冲劲更足。", mods: { atkPct: 5 } },
  { name: "红枫营区山隘", desc: "山路崎岖，行动迟缓但站得稳。", mods: { spdPct: -5, defPct: 5 } },
  { name: "红枫营区上山区", desc: "仰攻地势，以攻代守。", mods: { atkPct: 8 } },
  { name: "红枫营区广场", desc: "开阔广场，谁都能找到破绽。", mods: { critRate: 3 } },
  { name: "红枫营区中央", desc: "营地核心，补给充足。", mods: { hpPct: 5 } },
  { name: "红枫营区主帐前", desc: "主帐前的空场，守卫森严。", mods: { defPct: 8 } },
  { name: "红枫营区战筹主帐", desc: "决战之地，士气与杀意同涨。", mods: { atkPct: 10 } }
];
const REDMAPLE_SCENE_IDX = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
const REDMAPLE_WEATHER = ["clear", "clear", "rain", "rain", "fog", "fog", "clear", "sun", "sun", "night",
  "wind", "wind", "storm", "storm", "night", "fog", "rain", "storm", "sun", "night"];
const REDMAPLE_TITLES = ["山径哨兵", "林间冷箭", "营前斥候", "断木拒马", "隘口双哨", "雾锁隘口", "下坡伏击", "半山营地",
  "山隘夜哨", "大当家的斧", "上山夺道", "火烧枫林", "广场械斗", "广场混战", "铁牙的狂笑", "亲卫合围", "帐前的火", "军师白霜", "全员压上", "枫王座前"];
const REDMAPLE_PLAN = [
  [5, ["e_thug"], 120, "一个打手抱着木棍守在枫林入口，哈欠连天。"],
  [9, ["e_thug", "e_archer"], 142, "打手在前挡路，树后有人拉开了弓。"],
  [13, ["e_archer", "e_archer"], 168, "两名弓手占据两侧高处，箭矢交叉封锁。"],
  [17, ["e_brute", "e_soldier"], 198, "暴徒吼着冲来，士兵紧随其后压住阵脚。"],
  [21, ["e_vet_soldier", "e_trainee_medic"], 470, "老兵带着背药箱的新人，显然不是普通巡逻。"],
  [25, ["e_soldier", "e_soldier", "e_crossbow"], 276, "三名士兵列阵，弩手在后方慢慢上弦。"],
  [29, ["e_trainee_mage", "e_archer", "e_archer"], 326, "术士指尖冒火，弓手掩护他念咒。"],
  [33, ["e_light_shield", "e_thug", "e_thug"], 385, "盾兵顶在前面，两个打手从侧翼围上来。"],
  [37, ["e_crossbow", "e_crossbow", "e_trainee_mage"], 454, "两支弩对准路口，术士在后方压阵。"],
  [41, ["e_chiyu", "e_thug", "e_thug"], 1072, "大当家赤羽扛着战斧，身后跟着两个打手。"],
  [45, ["e_heavy_shield", "e_soldier", "e_soldier"], 632, "重盾兵像一堵墙，士兵在墙后待命。"],
  [49, ["e_firebomb", "e_archer", "e_archer"], 746, "有人提着燃烧瓶，火光照亮了枫叶。"],
  [53, ["e_vet_shield", "e_vet_soldier", "e_archer"], 880, "精英小队压上，盾、枪、弓配合紧密。"],
  [57, ["e_vet_archer", "e_high_mage", "e_crossbow"], 1038, "箭雨与火球同时蓄势，这队不好惹。"],
  [61, ["e_tieya", "e_vet_soldier", "e_vet_soldier", "e_trainee_medic"], 2450, "二当家铁牙咧嘴笑着，身后是精锐与医护。"],
  [65, ["e_vet_medic", "e_vet_shield", "e_vet_soldier", "e_vet_soldier", "e_vet_crossbow"], 1445, "完整的精锐编队，攻守兼备。"],
  [69, ["e_bomber", "e_vet_crossbow", "e_vet_crossbow", "e_high_mage"], 1705, "爆破手点燃引线，远程火力覆盖全场。"],
  [73, ["e_baishuang", "e_vet_soldier", "e_vet_soldier", "e_vet_shield"], 2012, "军师白霜立于阵后，亲卫寸步不离。"],
  [77, ["e_thug", "e_brute", "e_soldier", "e_archer", "e_vet_soldier", "e_vet_archer", "e_firebomb", "e_light_shield"], 2374, "枫林深处涌出一大群杂兵，其中混着几名精锐。"],
  [80, ["e_fengwang", "e_vet_shield", "e_vet_shield", "e_high_mage", "e_drum", "e_horn", "e_vet_soldier", "e_vet_soldier"], 5602, "枫王终于现身，整片枫林都安静了下来。"]
];
function makeRedmaple() {
  const stages = REDMAPLE_PLAN.map(([lv, ids, exp, story], i) => {
    // 单人挑战编成：按关卡段限制同场敌人数
    const CAP = i < 5 ? 2 : i < 10 ? 3 : i < 15 ? 4 : i < 19 ? 6 : 4;
    ids = ids.slice(0, CAP);
    const first = enemyAt(ids[0], lv);
    const sc = SCENES[REDMAPLE_SCENE_IDX[i]] || SCENES[0];
    const tier = i === 19 ? "首领" : (i === 9 || i === 14) ? "特色" : i === 4 ? "精英" : "普通";
    return {
      id: "exp_" + (i + 1), name: "第 " + (i + 1) + " 关 · " + (REDMAPLE_TITLES[i] || sc.name), lv,
      tier, tierLabel: tier,
      story: story || "",
      scene: sc.name,
      sceneDesc: sc.desc,
      sceneMods: sc.mods,
      weather: REDMAPLE_WEATHER[i] || "clear",
      group: Math.floor(i / 5) + 1, milestone: (i + 1) % 5 === 0,
      enemies: ids, gold: Math.round(exp * 0.25), exp,
      foe: { name: first.name, lv, hp: first.stats.hp, atk: first.stats.atk, def: first.stats.def, res: first.stats.res, spd: first.stats.spd },
      drop: { shards: [0, 0], stone: [0, 0], bstone: 0, gearChance: 0, manuscript: 0, medal: 0, medalChance: 0 }
    };
  });
  return { id: "d_exp", name: "枫林剿匪", kind: "exp", icon: "🍁", desc: "红枫团盘踞的枫林，剿灭他们换取经验", type: "daily", stages };
}
// 🏦 金币本：哈罗德银行（抢银行）
function makeHaroldBank() {
  const PLACES = ["银行大厅", "一号柜台", "押运通道", "贵宾室", "地下金库走廊"];
  const FOES = [
    "保安", "前台柜员", "资深保安", "业务柜员",
    "保安队长", "保安犬", "保安护卫犬", "大堂经理",
    "见习监控员", "资深保安队长", "资深监控员",
    "运钞护卫队队员", "运钞护卫队弩手", "运钞护卫队重盾兵", "运钞护卫队队长",
    "反制小队先锋", "反制小队精锐",
    "金库护卫", "金库弩手", "金库重盾兵", "金库技工", "金库技师"
  ];
  // 关卡 → [敌人, 阶级]（普通 / 精英 / 特色）
  const PLAN = [
    ["保安", "普通"],
    ["前台柜员", "普通"],
    ["业务柜员", "普通"],
    ["保安犬", "普通"],
    ["资深保安", "精英"],
    ["见习监控员", "普通"],
    ["保安队长", "精英"],
    ["保安护卫犬", "精英"],
    ["大堂经理", "精英"],
    ["罗伊 · 哈罗德", "特色"],
    ["运钞护卫队队员", "普通"],
    ["运钞护卫队弩手", "精英"],
    ["运钞护卫队重盾兵", "精英"],
    ["运钞护卫队队长", "精英"],
    ["本乔 · 詹", "特色"],
    ["反制小队先锋", "精英"],
    ["金库护卫", "精英"],
    ["金库弩手", "精英"],
    ["金库重盾兵", "精英"],
    ["卡法特琳忒", "首领"]
  ];
  const BOSS_STORY = {
    "罗伊 · 哈罗德": "罗伊站在贵宾室门口，礼帽压得很低：「存钱还是取命？」",
    "本乔 · 詹": "本乔把运钞车的钥匙挂在腰上，笑得很和气，手里却拎着霰弹枪。",
    "卡法特琳忒": "金库最深处，卡法特琳忒坐在钱堆上：「你们来晚了——利息已经算好了。」"
  };
  const STORY = ["矿区入口的采岩工刚换班，镐子还热着。","采岩区机器轰鸣，岩壁被一块块削下来。","碎岩平台上堆满碎石，锤声不断。","狙击塔上的红点已经对准了你。","前沿哨卡里走出一个戴袖标的人。","术士的岩缚阵把地面都压低了。","盾墙防区的重盾兵排成一排。","机兵装配区里，自动机兵正被吊装。","碎岩机库的闸门打开，履带压过地面。","艾登 · 伊娃从指挥站走出来：「样本？还是入侵者？」","深井入口的升降梯还停在半空。","掘进通道又窄又热，钻头声从深处传来。","深层哨站的士兵举着灯照过来。","术士在通道尽头布下了深岩咒。","深层防线比你想象的厚得多。","指挥室的门开着，里面的人正在等你。","失控区的警报一直在响，没人来关。","采掘者的钻头把整条通道都挖空了。","两台失控机械同时启动。","哈曼 · 奥斯肯站在锻造核心前：「这条线是我造的，也是我关的。」"];
  const LV = [5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 80];
  // 名字 → 图鉴敌人 ID
  const NAME2ID = {};
  ENEMIES.filter((e) => e.camp === "哈罗德银行").forEach((e) => { NAME2ID[e.name] = e.id; });
  const stages = LV.map((lv, i) => {
    const g = Math.pow(1.18, i), mile = (i + 1) % 5 === 0 ? 2 : 1;
    const plan = PLAN[i % PLAN.length];
    const foeName = plan[0], tier = plan[1];
    const boss = tier === "首领";
    const mul = (boss ? 2.4 : tier === "特色" ? 1.6 : tier === "精英" ? 1.25 : 1) + Math.floor(i / 10) * 0.12;
    return {
      id: "gold_" + (i + 1),
      name: "第 " + (i + 1) + " 关 · " + (boss ? "金库核心" : PLACES[i % PLACES.length]),
      lv, group: Math.floor(i / 5) + 1, milestone: (i + 1) % 5 === 0,
      tier, tierLabel: tier,
      scene: ["银行大厅", "一号柜台", "押运通道", "贵宾室", "地下金库"][Math.min(4, Math.floor(i / 4))],
      sceneDesc: ["大理石大厅，回声很大。", "柜台后面堆满现金和单据。", "狭窄的押运通道，灯一闪一闪。", "厚地毯和皮沙发，空气很闷。", "地下金库，冷气混着钱的味道。"][Math.min(4, Math.floor(i / 4))],
      sceneMods: [{ defPct: 2 }, { resPct: 3 }, { spdPct: 3 }, { atkPct: 3 }, { defPct: 4, resPct: 4 }][Math.min(4, Math.floor(i / 4))],
      weather: ["clear", "rain", "gale", "fog"][Math.floor(i / 5) % 4],
      gold: Math.round(320 * g * mile), exp: Math.round(40 * g),
      drop: { shards: [], stone: [], bstone: 0, gearChance: 3 },
      foe: foeOf(foeName, lv, mul),
      enemies: NAME2ID[foeName] ? [NAME2ID[foeName]] : [],
      story: BOSS_STORY[foeName] || STORY[i % STORY.length]
    };
  });
  return { id: "d_gold", name: "哈罗德银行", kind: "gold", icon: "🏦", type: "daily", desc: "抢银行拿金币", stages };
}

// ❄️ 霜落雪原：第三个正式副本
function makeSnowfield() {
  const LV = [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 78];
  const WAVE = [["m_surf_miner"],["m_surf_miner","m_surf_crusher"],["m_surf_crusher","m_guard"],["m_guard","m_sniper"],["m_lead"],["m_mage","m_surf_miner"],["m_shield","m_sniper"],["m_mage","m_auto_mine"],["m_auto_crush"],["b_eva"],["m_deep_miner"],["m_deep_miner","m_deep_digger"],["m_d_guard","m_d_sniper"],["m_d_mage","m_d_guard"],["m_d_shield","m_d_sniper"],["m_d_lead"],["m_px"],["m_px","m_d_lead"],["m_px","m_px"],["b_harman","m_tx"]];
  const STORY = [
    "雪没到膝盖，脚印一直延伸到雾里。",
    "远处有狼在叫，不止一只。",
    "箭从雪堆后面射出来，看不见人。",
    "冰块拼成的人形挡在路口。",
    "狼王站在尸骨堆上，毛色发白。",
    "术士的咒文让空气结了霜。",
    "守卫和猎手配合得很熟练。",
    "寒气顺着呼吸钻进肺里。",
    "狼群开始包围。",
    "雪原队长举着碎冰刀。",
    "守卫排成一列，像一堵墙。",
    "混编队伍压了上来。",
    "队长的刀比刚才更快。",
    "法术和箭雨交替落下。",
    "队长带着狼王一起冲。",
    "守卫护着猎手，很难突破。",
    "两只狼王同时出现。",
    "队长的号令在雪原回荡。",
    "三只头目一起挡路。",
    "霜喉从雪里站起来，整片雪原都安静了。"
  ];
  const NAMES = ["矿区入口","采岩区","碎岩平台","狙击塔","前沿哨卡","术士营地","盾墙防区","机兵装配区","碎岩机库","地表指挥站","深井入口","掘进通道","深层哨站","深层术士阵","深层防线","深层指挥室","失控区","采掘者巢","双机暴走","锻造核心"];
  return {
    id: "d_snow", name: "霜落雪原", kind: "snow", icon: "❄️",
    desc: "雪原深处的寒潮源头，产出突破石与金币", type: "daily",
    stages: LV.map((lv, i) => {
      const ids = WAVE[i].slice();
      const tier = i === 19 ? "首领" : (i === 9 || i === 14) ? "特色" : i === 4 ? "精英" : "普通";
      const first = enemyAt(ids[0], lv);
      return {
        id: "snow_" + (i + 1), name: "第 " + (i + 1) + " 关 · " + NAMES[i], lv,
        tier, tierLabel: tier,
        story: STORY[i],
        scene: "霜落雪原",
        sceneDesc: "风雪终年不散的白色荒原，寒气会侵蚀体力。",
        sceneMods: { resPct: 5 },
        weather: "clear",
        enemies: ids,
        foe: first,
        drop: {
          shards: [3, 8 + Math.floor(i / 3)],
          stone: [10, 20 + Math.floor(i / 2)],
          refine: [4, 8 + Math.floor(i / 3)],
          shardR: [14, 24 + Math.floor(i / 2)],
          shardSR: [6, 10 + Math.floor(i / 3)],
          shardSSR: i === 19 ? [3, 8] : [0, 0],
          bstone: 2 + Math.floor(i / 3),
          gearChance: 8 + Math.floor(i / 4)
        },
        gold: Math.round(120 * Math.pow(1.17, i)) + 60,
        exp: Math.round(70 * Math.pow(1.16, i)) + 40,
        drops: [
          { name: "突破石", kind: "stone", count: [1, 2 + Math.floor(i / 4)] },
          { name: "金币", kind: "gold", count: [Math.round(60 * Math.pow(1.15, i)), Math.round(120 * Math.pow(1.15, i))] }
        ]
      };
    })
  };
}

// 🔨 矿采锻造基地：装备强化素材副本
function makeMine() {
  const LV = [15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 73];
  const WAVE = [["m_surf_miner"],["m_surf_miner","m_surf_crusher"],["m_surf_crusher","m_guard"],["m_guard","m_sniper"],["m_lead"],["m_mage","m_surf_miner"],["m_shield","m_sniper"],["m_mage","m_auto_mine"],["m_auto_crush"],["b_eva"],["m_deep_miner"],["m_deep_miner","m_deep_digger"],["m_d_guard","m_d_sniper"],["m_d_mage","m_d_guard"],["m_d_shield","m_d_sniper"],["m_d_lead"],["m_px"],["m_px","m_d_lead"],["m_px","m_px"],["b_harman","m_tx"]];
  const STORY = ["矿区入口的采岩工刚换班，镐子还热着。","采岩区机器轰鸣，岩壁被一块块削下来。","碎岩平台上堆满碎石，锤声不断。","狙击塔上的红点已经对准了你。","前沿哨卡里走出一个戴袖标的人。","术士的岩缚阵把地面都压低了。","盾墙防区的重盾兵排成一排。","机兵装配区里，自动机兵正被吊装。","碎岩机库的闸门打开，履带压过地面。","地表指挥站把最后的部队都派了出来。","深井入口的升降梯还停在半空。","掘进通道又窄又热，钻头声从深处传来。","深层哨站的士兵举着灯照过来。","术士在通道尽头布下了深岩咒。","深层防线比你想象的厚得多。","指挥室的门开着，里面的人正在等你。","失控区的警报一直在响，没人来关。","采掘者的钻头把整条通道都挖空了。","两台失控机械同时启动。","失控碎岩者-TX 从矿道深处走来，地面随它震动。"];
  const NAMES = ["矿区入口","采岩区","碎岩平台","狙击塔","前沿哨卡","术士营地","盾墙防区","机兵装配区","碎岩机库","地表指挥站","深井入口","掘进通道","深层哨站","深层术士阵","深层防线","深层指挥室","失控区","采掘者巢","双机暴走","锻造核心"];
  return {
    id: "d_gear", name: "矿采锻造基地", kind: "gear", icon: "🔨",
    desc: "采矿、熔炼、锻造一条龙，产出装备强化素材", type: "daily",
    stages: LV.map((lv, i) => {
      const ids = WAVE[i].slice();
      const tier = i === 19 ? "首领" : (i === 9 || i === 14) ? "特色" : i === 4 ? "精英" : "普通";
      const first = enemyAt(ids[0], lv);
      return {
        id: "gear_" + (i + 1), name: "第 " + (i + 1) + " 关 · " + NAMES[i], lv,
        tier, tierLabel: tier,
        story: STORY[i],
        scene: ["采岩区", "碎岩平台", "熔炉区", "深层矿道", "锻造核心"][Math.min(4, Math.floor(i / 4))],
        sceneDesc: ["矿壁被一层层削下来，碎石不断落下。", "碎岩机轰鸣，地面跟着震动。", "炉火不熄，铁水顺着沟槽流动。", "矿道又窄又热，灯照不到尽头。", "锻造核心悬在炉心，热浪扭曲了空气。"][Math.min(4, Math.floor(i / 4))],
        sceneMods: [{ defPct: 3 }, { atkPct: 3 }, { atkPct: 3, resPct: 2 }, { resPct: 4 }, { atkPct: 5 }][Math.min(4, Math.floor(i / 4))],
        weather: ["clear", "fog", "heat", "ash"][Math.min(3, Math.floor(i / 5))],
        enemies: ids,
        foe: first,
        drop: {
          shards: [3, 8 + Math.floor(i / 3)],
          stone: [10, 20 + Math.floor(i / 2)],
          refine: [4, 8 + Math.floor(i / 3)],
          shardR: [14, 24 + Math.floor(i / 2)],
          shardSR: [6, 10 + Math.floor(i / 3)],
          shardSSR: i === 19 ? [3, 8] : [0, 0],
          bstone: 0,
          gearChance: 8 + Math.floor(i / 4)
        },
        gold: Math.round(100 * Math.pow(1.16, i)) + 50,
        exp: Math.round(60 * Math.pow(1.15, i)) + 30,
        drops: [
          { name: "强化石", kind: "stone", count: [2, 3 + Math.floor(i / 4)] },
          { name: "金币", kind: "gold", count: [Math.round(50 * Math.pow(1.15, i)), Math.round(110 * Math.pow(1.15, i))] }
        ]
      };
    })
  };
}

// 🧬 修行洞窟：角色突破素材副本
function makeCave() {
  const LV = [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 78];
  const WAVE = [["tp_s"],["tp_s","tp_a"],["tp_a","tp_t"],["tp_t","tp_m"],["tc_s"],["tc_s","tc_a"],["tc_t","tc_m"],["tc_s","tc_s","tp_a"],["ep_s"],["ep_s","ep_a"],["ep_t","ep_m"],["ec_s","ec_a"],["ec_t","ec_m"],["ec_s","ec_t"],["bx_cent"],["bx_ghost1","bx_ghost2"],["mb_drone","mb_drone2"],["bx_lorne"],["bx_seth"],["mb_tenglong","mb_mg"]];
  const NAMES = ["广场入口","巡逻线","弩手高台","盾墙哨位","冲锋队集结","冲锋队突进","重盾推进","术士掩护","精锐巡逻","精锐弩线","精锐盾阵","精锐冲锋","精锐重盾","混编精锐","百夫长","幽灵弩组","无人机编队","机械混编","改装机入场","顶层决战"];
  const STORY = ["广场入口拉起警戒线，巡逻队已经就位。","巡逻队沿着步行街推进。","高台上的弩手已经瞄准。","重盾兵把通道堵死。","冲锋队从侧街包抄过来。","冲锋队一边推进一边射击。","重盾兵顶在最前面。","术士在后面布下咒术。","精锐巡逻队接管了这片区域。","精锐弩手占据了所有高点。","精锐盾阵一层叠一层。","精锐冲锋队开始强攻。","精锐重盾兵把路封死。","精锐部队混编压上。","百夫长举着塔盾走出来。","两个幽灵弩手同时扣下扳机。","无人机编队升空。","御卫、猎枭、爆鸽三台机械同时启动。","两台改装机从地库升上来。","顶层大厅里，所有单位都到齐了。"];
  return {
    id: "d_char", name: "时代广场商业区", kind: "char", icon: "🏙",
    desc: "商业区的核心地带，产出角色突破素材", type: "daily",
    stages: LV.map((lv, i) => {
      const ids = WAVE[i].slice();
      const tier = i === 19 ? "首领" : i === 9 ? "特色" : i === 4 ? "精英" : "普通";
      const first = enemyAt(ids[0], lv);
      return {
        id: "char_" + (i + 1), name: "第 " + (i + 1) + " 关 · " + NAMES[i], lv,
        tier, tierLabel: tier,
        story: STORY[i],
        scene: ["广场入口", "巡逻街区", "冲锋街区", "精锐防区", "顶层大厅"][Math.min(4, Math.floor(i / 4))],
        sceneDesc: ["警戒线、路障与巡逻队。", "步行街被清空，只剩巡逻的人。", "冲锋队从两侧街区推进。", "精锐防区，防线层层叠叠。", "顶层落地窗，整片商业区在脚下。"][Math.min(4, Math.floor(i / 4))],
        sceneMods: [{ spdPct: 3 }, { spdPct: 3, atkPct: 2 }, { critRate: 3 }, { atkPct: 3 }, { atkPct: 5 }][Math.min(4, Math.floor(i / 4))],
        weather: ["clear", "night", "fog", "sun"][Math.min(3, Math.floor(i / 5))],
        enemies: ids,
        foe: first,
        drop: (() => {
          const band = i < 7 ? 1 : i < 14 ? 2 : 3;
          const cert = i < 5 ? 1 : i < 12 ? 2 : i < 18 ? 3 : 4;
          const o = { ms: {}, md: {}, cert: {} };
          o.ms["ms" + band] = [2 + band, 4 + band + Math.floor(i / 5)];
          o.md["md" + band] = [1 + Math.floor(band / 2), 2 + band];
          o.cert["cert" + cert] = [1, 1 + Math.floor(i / 4)];
          return o;
        })(),
        gold: Math.round(90 * Math.pow(1.15, i)) + 40,
        exp: Math.round(80 * Math.pow(1.16, i)) + 40
      };
    })
  };
}

export const DUNGEONS = [
  makeRedmaple(),
  makeHaroldBank(),
  makeCave(),
  makeMine(),
  { id: "d_tbd", name: "待定日常", kind: "tbd", icon: "❔", desc: "内容待定", type: "daily", stages: [] },
  {
    id: "d_fest", name: "庆典试炼", kind: "fest", icon: "🏮", desc: "限定 BOSS 挑战（每周 1 次）", type: "event",
    stages: [{
      id: "fest_1", name: "庆典巨像", lv: 60, group: 1, milestone: false, gold: 12000, exp: 4000,
      foe: { name: "庆典巨像", lv: 60, hp: 26000, atk: 420, def: 180, res: 140, spd: 14 },
      drop: { shards: [400, 600], stone: [150, 220], bstone: 40, gearChance: 100, manuscript: 10, medal: 3, medalChance: 100 }
    }]
  }
];
export const STAGES = DUNGEONS.flatMap((d) => d.stages);
export const CONSUMABLES = [
  // 🏪 便利店日常货（战前准备：下一场战斗生效；limit = 每日限购）
  { id: "p_rice", name: "饭团", desc: "战前吃：生命 +5%", price: 30, meal: { hpPct: 5 }, limit: 5 },
  { id: "p_teaegg", name: "茶叶蛋", desc: "战前吃：生命 +4%", price: 25, meal: { hpPct: 4 }, limit: 5 },
  { id: "p_milk", name: "牛奶", desc: "战前喝：生命 +6%", price: 40, meal: { hpPct: 6 }, limit: 3 },
  { id: "p_noodle", name: "泡面", desc: "战前吃：生命 +4% · 攻击 +4%", price: 50, meal: { hpPct: 4, atkPct: 4 }, limit: 3 },
  { id: "p_bento", name: "便当", desc: "战前吃：生命 +10% · 攻击 +5%", price: 90, meal: { hpPct: 10, atkPct: 5 }, limit: 2 },
  { id: "p_oden", name: "关东煮", desc: "战前吃：生命 +8% · 防御 +4%", price: 70, meal: { hpPct: 8, defPct: 4 }, limit: 3 },
  { id: "p_coffee", name: "罐装咖啡", desc: "战前喝：攻击 +8% · 速度 +1", price: 60, meal: { atkPct: 8, spd: 1 }, limit: 3 },
  { id: "p_energy", name: "能量饮料", desc: "战前喝：攻击 +12% · 速度 +2", price: 150, meal: { atkPct: 12, spd: 2 }, limit: 1 },
  { id: "p_bandage", name: "绷带", desc: "战前缠：防御 +6%", price: 40, meal: { defPct: 6 }, limit: 3 },
  { id: "p_hp", name: "伤药", desc: "战前吃：生命 +8%", price: 120, meal: { hpPct: 8 }, limit: 2 },
  { id: "p_stone", name: "强化石", desc: "装备强化材料", price: 60, limit: 10 }
];
export const tier = (lv) => (lv <= 50 ? 1 : (lv <= 100 ? 2 : 4));
export const CULT = {
  maxLevel: 150,
  eqLv: 20, ct: 3,
  eqBreak: [
    { at: 20, stone: 10, gold: 3000 },
    { at: 25, stone: 20, gold: 6000 },
    { at: 30, stone: 35, gold: 12000 }
  ],
  breakNodes: [25, 50, 75, 100, 125, 150],
  breakStone: { 25: 18, 50: 45, 75: 75, 100: 115, 125: 165, 150: 230 },
  gold: (lv) => Math.round(2 * lv * tier(lv)),
  stone: (lv) => Math.ceil((lv / 4) * tier(lv)),
  maxStar: 5,
  starShards: (star) => Math.round(10 * Math.pow(2, star - 1)),
  // 🔧 精炼：只提升随机词条数值（每级 +8%）
  maxRefine: 10,
  refineGold: (r) => Math.round(120 * r),
  shardKey: { R: "shardR", SR: "shardSR", SSR: "shardSSR", UR: "shardUR" },
  shardBase: 60,
  refineStone: (r) => 2 + Math.floor((Number(r) || 1) * 0.8),
  refineShards: (r) => Math.round(20 * r),
  // ⬆️ 升阶：R/SR 5★ 可升下一品质；SSR5★ 需「觉醒」到 UR1🔥，UR1🔥 再觉醒到 UR5🔥
  rarityOrder: ["R", "SR", "SSR", "UR"],
  maxFire: 5,
  promote: {
    SR: { shards: 200, gold: 2000 },
    SSR: { shards: 500, gold: 6000 },
    UR: { shards: 1200, gold: 18000 }
  },
  awaken: {
    ur1: { shards: 1000, gold: 15000 }
  },
  // 火数逐级觉醒：1🔥→2🔥→3🔥→4🔥→5🔥
  awakenFire: {
    2: { shards: 400, gold: 6000 },
    3: { shards: 700, gold: 10000 },
    4: { shards: 1000, gold: 15000 },
    5: { shards: 1500, gold: 22000 }
  },
  // ⬜ 升阶白值：让低阶多次升阶后能在终局反超高阶
  flatGain: {
    promote: { weapon: { atk: 5 }, armor: { hp: 30 }, accessory: { atk: 1 } }
  }
};
// 🎖️ 资历评级（白/绿/蓝/紫/橙/红）—— 字母先用 D/C/B/A/S/SS
// 🧾 角色素材分档：手稿 初/中/高、勋章 青铜/白银/黄金、证书 新手/入门/精英/大师
export const MAT_TIER = {
  grade: [1, 1, 2, 3, 3, 3],      // D,C,B,A,S,SS → 需要的档
  apt: [1, 1, 1, 2, 2, 3, 3],     // ★1..7
  cert: [0, 1, 2, 3, 4, 4],       // 突破 0..5 次
  msName: ["初级手稿", "中级手稿", "高级手稿"],
  mdName: ["青铜勋章", "白银勋章", "黄金勋章"],
  certName: ["新手突破证书", "入门突破证书", "精英突破证书", "大师突破证书"]
};
export const GRADE = [
  { key: "D",  name: "白", color: "#d8d8d8", mult: 1.00, cost: 0 },
  { key: "C",  name: "绿", color: "#7ee787", mult: 1.06, cost: 40 },
  { key: "B",  name: "蓝", color: "#6ea8fe", mult: 1.13, cost: 120 },
  { key: "A",  name: "紫", color: "#c9a0ff", mult: 1.22, cost: 300 },
  { key: "S",  name: "橙", color: "#ffb86b", mult: 1.32, cost: 700 },
  { key: "SS", name: "红", color: "#ff6b6b", mult: 1.45, cost: 1500 }
];

// 🎯 资质评估（1★ ~ 7★）—— 每星全属性 +4%
export const APTITUDE = [
  { star: 1, mult: 1.00, cost: 0 },
  { star: 2, mult: 1.04, cost: 60 },
  { star: 3, mult: 1.08, cost: 180 },
  { star: 4, mult: 1.13, cost: 450 },
  { star: 5, mult: 1.18, cost: 1000 },
  { star: 6, mult: 1.24, cost: 2200 },
  { star: 7, mult: 1.30, cost: 4500 }
];

// 🎲 建角：基础四项（百分比）与专精四项（绝对值）共用点数
//    上限拉高，允许「全攻 / 全防 / 全血」这种极限流派；单项吃满 = 40 点
export const BIRTH = {
  basicPoints: 40, basicPct: 5, basicCap: 40,     // 生命/攻击/防御/法抗（上限 = 总点数，可全堆一项 +200%）
  specPoints: 24, specCap: 24,                    // 力量/智力/技巧/敏捷（建角上限 = 总点数）
  specLevelCap: 50,                              // 升级追加的专精点，每项最多 50（单项总上限 = 24 + 50 + 突破加点）
  specEffect: { str: 2, int: 2, tech: 2, agi: 0.6 }  // 力=近战伤、智=法术伤、技=远程伤、敏=速度
};

// 🧬 建角预设模型（一键套用，可再微调）
export const PRESETS = [
  { id: "balance", name: "⚖️ 均衡", role: "通用",
    basic: { hp: 10, atk: 10, def: 10, res: 10 },
    spec: { str: 6, int: 6, tech: 6, agi: 6 } },
  { id: "tank", name: "🛡️ 守护", role: "守护",
    basic: { hp: 16, atk: 6, def: 12, res: 6 },
    spec: { str: 8, int: 4, tech: 6, agi: 6 } },
  { id: "power", name: "🔥 先锋", role: "先锋",
    basic: { hp: 6, atk: 18, def: 8, res: 8 },
    spec: { str: 12, int: 2, tech: 4, agi: 6 } },
  { id: "agile", name: "🏹 游侠", role: "游侠",
    basic: { hp: 8, atk: 14, def: 8, res: 10 },
    spec: { str: 2, int: 2, tech: 12, agi: 8 } },
  { id: "magic", name: "🔮 术士", role: "术士",
    basic: { hp: 8, atk: 14, def: 8, res: 10 },
    spec: { str: 2, int: 12, tech: 4, agi: 6 } },
  { id: "support", name: "✨ 辅佐", role: "辅佐",
    basic: { hp: 12, atk: 8, def: 10, res: 10 },
    spec: { str: 4, int: 10, tech: 6, agi: 4 } }
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
  { at: 20,  capTo: 40,  stone: 10,  gold: 2000,  bonus: 3, points: 5 },
  { at: 40,  capTo: 60,  stone: 25,  gold: 6000,  bonus: 3, points: 5 },
  { at: 60,  capTo: 80,  stone: 50,  gold: 14000, bonus: 3, points: 5 },
  { at: 80,  capTo: 100, stone: 90,  gold: 28000, bonus: 3, points: 5 },
  { at: 100, capTo: 100, stone: 700, gold: 50000, bonus: 3, points: 5 }
];
// 📅 日常任务：每天 3 个，跨天重置
export const DAILY_QUESTS = [
  { id: "q_battle", name: "打 2 场战斗", key: "battles", target: 2, gold: 300 },
  { id: "q_level", name: "升 1 级", key: "levels", target: 1, gold: 300 },
  { id: "q_cult", name: "强化装备 1 次", key: "cults", target: 1, gold: 300 }
];
export const DAILY_BONUS = 800;

// 🏅 成就：kind 决定进度怎么算（在 create.html 里实现）
export const ACHIEVEMENTS = [
  { id: "a_lv10", name: "初出茅庐", desc: "角色达到 Lv10", kind: "lv", value: 10, gold: 500 },
  { id: "a_lv50", name: "小有所成", desc: "角色达到 Lv50", kind: "lv", value: 50, gold: 1500 },
  { id: "a_lv100", name: "登峰造极", desc: "角色达到 Lv100", kind: "lv", value: 100, gold: 4000 },
  { id: "a_win10", name: "初战告捷", desc: "累计胜利 10 场", kind: "wins", value: 10, gold: 800 },
  { id: "a_win100", name: "百战老兵", desc: "累计胜利 100 场", kind: "wins", value: 100, gold: 3000 },
  { id: "a_gold", name: "腰缠万贯", desc: "持有 10000 金币", kind: "gold", value: 10000, gold: 1000 },
  { id: "a_gear50", name: "锻造达人", desc: "任意装备强化到 Lv50", kind: "gearLv", value: 50, gold: 1200 },
  { id: "a_star5", name: "星光璀璨", desc: "任意装备升到 5★", kind: "gearStar", value: 5, gold: 1500 },
  { id: "a_items30", name: "收藏家", desc: "仓库有 30 件装备", kind: "items", value: 30, gold: 800 },
  { id: "a_break5", name: "突破极限", desc: "完成全部 5 次突破", kind: "breaks", value: 5, gold: 2500 },
  { id: "a_grade", name: "红色传说", desc: "资历达到 SS", kind: "grade", value: 5, gold: 3000 },
  { id: "a_apt", name: "完美资质", desc: "资质达到 7★", kind: "apt", value: 7, gold: 3000 }
];

// 🏆 周榜奖励：按名次档位发金币（每周可领一次）
export const WEEK_REWARD = [
  { maxRank: 1, gold: 3000 },
  { maxRank: 3, gold: 1500 },
  { maxRank: 10, gold: 800 }
];

export const SHOP_PRICE = {
  weapon: { R: 500, SR: 1250, SSR: 2700, UR: 6500 },
  armor: { R: 450, SR: 1100, SSR: 2300, UR: 5300 },
  accessory: { R: 400, SR: 950, SSR: 2100, UR: 5000 }
};

// 🌳 天赋树（5 定位）：每升 1 级 +1 点，每次突破 +2 点
//    节点 need = 需要本树已投入的点数；eff 由 power.js 的 talentBonus() 汇总
// 🌳 天赋树（职业定位版 · 长链）：5 职业 × 3 分支 × 14 阶 + 职业主动技
//    分支按等级解锁，阶按 TIER_LV 逐级开放；节点效果按「基础值 + 每阶成长」生成
const CN14 = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六"];
const r1 = (n) => Math.round(n * 10) / 10;

function chain(prefix, label, spec) {
  // 🎯 五种格子：基础 / 专精 / 小天赋 / 大天赋 / 终极
  const KIND = ["base", "spec", "minor", "base", "spec", "major", "base", "spec", "minor", "base", "spec", "major", "base", "spec", "major", "ultimate"];
  const SPEC_BY = { g: "str", v: "str", r: "agi", m: "intel", s: "tech" };
  const specKey = SPEC_BY[String(prefix).charAt(0)] || "str";
  const SMALL = { g: { block: 3, tenacity: 4 }, v: { critRate: 1.5, critDmg: 5 }, r: { chase: 4, penetrate: 5 }, m: { statusHit: 4, statusPower: 5 }, s: { healPct: 5, statusResist: 4 } };
  const BIG = {
    g: [{ lowHpCut: 8 }, { counter: 10 }, { block: 10 }],
    v: [{ critDmg: 10 }, { doubleStrike: 8 }, { atkPct: 6 }],
    r: [{ chase: 8 }, { spdPct: 6 }, { penetrate: 8 }],
    m: [{ penetrate: 8 }, { statusPower: 10 }, { statusHit: 8 }],
    s: [{ healPct: 8 }, { hpPct: 8 }, { statusResist: 8 }]
  };
  const key = String(prefix).charAt(0);
  const SCALE = { base: 1, minor: 1.35, major: 1.75, ultimate: 2.2 };
  let minorN = 0, majorN = 0;
  return Array.from({ length: 16 }, (_, i) => {
    const kind = KIND[i] || "base";
    const eff = {};
    if (kind === "spec") {
      eff[specKey] = 1 + Math.floor(i / 6);
    } else {
      const scale = SCALE[kind];
      Object.keys(spec.base).forEach((k) => { eff[k] = r1((spec.base[k] + (spec.step[k] || 0) * i) * scale); });
      if (spec.bonus && spec.bonus[i]) Object.assign(eff, spec.bonus[i]);
      if (kind === "minor") { minorN++; const sm = SMALL[key] || {}; Object.keys(sm).forEach((k) => { eff[k] = r1((Number(eff[k]) || 0) + sm[k] * minorN); }); }
      if (kind === "major") { majorN++; const big = (BIG[key] || [])[majorN - 1] || {}; Object.keys(big).forEach((k) => { eff[k] = r1((Number(eff[k]) || 0) + big[k]); }); }
    }
    const tag = kind === "base" ? "基础" : kind === "spec" ? "专精" : kind === "minor" ? "小天赋" : kind === "major" ? "大天赋" : "终极";
    return { id: prefix + (i + 1), name: tag, eff, kind };
  });
}

const tb = (id, name, unlockLv, desc, branchKey, spec) => {
  const b = { id, name, unlockLv, desc, nodes: chain(branchKey, name, spec) };
  return b;
};

export const TALENT_TREES = [
  { id: "guard", name: "🛡️ 守护", role: "坦克 · 减伤", color: "#8fd8ff",
    active: { id: "g_act", key: "wall", name: "盾墙", cd: 4, unlockLv: 15, desc: "获得自身最大生命 25% 的护盾（每级 +4%）。Lv5 时 41%。护盾持续到被打破。" },
    branches: [
      tb("g1", "铁壁", 5, "防御 · 格挡", "g1_", { base: { defPct: 3 }, step: { defPct: 0.6 }, bonus: { 3: { block: 3 }, 7: { block: 5 }, 11: { tenacity: 8 } } }),
      tb("g2", "不屈", 30, "生命 · 韧性", "g2_", { base: { hpPct: 4 }, step: { hpPct: 0.8 }, bonus: { 4: { lowHpCut: 4 }, 9: { lowHpCut: 6 }, 13: { tenacity: 10 } } }),
      tb("g3", "荆棘", 60, "反伤 · 反制", "g3_", { base: { thorns: 2 }, step: { thorns: 0.4 }, bonus: { 5: { block: 5 }, 10: { tenacity: 8 } } })
    ] },

  { id: "vanguard", name: "⚔️ 先锋", role: "爆发 · 暴击", color: "#ffb86b",
    active: { id: "v_act", key: "frenzy", name: "狂战", cd: 4, unlockLv: 15, desc: "攻击力 +30%，持续 2 回合（每级 +4%）。Lv5 时 +46%。" },
    branches: [
      tb("v1", "突袭", 5, "攻击 · 暴击", "v1_", { base: { atkPct: 3 }, step: { atkPct: 0.6 }, bonus: { 3: { critRate: 2 }, 8: { critDmg: 8 }, 12: { critRate: 3 } } }),
      tb("v2", "战意", 30, "怒气 · 收割", "v2_", { base: { atkPct: 2, rageStart: 1 }, step: { atkPct: 0.4, rageStart: 0.5 }, bonus: { 6: { rageOnKill: 8 }, 12: { rageOnSkill: 10 } } }),
      tb("v3", "狂暴", 60, "暴击 · 连击", "v3_", { base: { critRate: 1 }, step: { critRate: 0.3 }, bonus: { 4: { critDmg: 8 }, 9: { doubleStrike: 8 }, 13: { chase: 10 } } })
    ] },

  { id: "ranger", name: "🏹 游侠", role: "速度 · 技巧", color: "#7ee787",
    active: { id: "r_act", key: "gale", name: "疾风", cd: 4, unlockLv: 15, desc: "下回合额外行动 1 次（Lv3 起 2 次）。额外行动可正常使用招式与必杀。" },
    branches: [
      tb("r1", "疾风", 5, "速度 · 出手", "r1_", { base: { spdPct: 2 }, step: { spdPct: 0.5 }, bonus: { 5: { atkPct: 5 }, 11: { spdPct: 4 } } }),
      tb("r2", "猎手", 30, "穿透 · 暴击", "r2_", { base: { atkPct: 2 }, step: { atkPct: 0.5 }, bonus: { 3: { penetrate: 8 }, 8: { critRate: 3 }, 12: { critDmg: 10 } } }),
      tb("r3", "影袭", 60, "双生 · 追击", "r3_", { base: { atkPct: 2, spdPct: 2 }, step: { atkPct: 0.4, spdPct: 0.3 }, bonus: { 7: { dualborn: 8 }, 12: { chase: 10 } } })
    ] },

  { id: "mage", name: "🔮 术士", role: "法系 · 法抗", color: "#c9a0ff",
    active: { id: "m_act", key: "arcane", name: "奥术冲击", cd: 4, unlockLv: 15, desc: "造成 180% 法术伤害（每级 +18%）。Lv5 时 252%，无视目标 20% 法抗。" },
    branches: [
      tb("m1", "冥想", 5, "法抗 · 输出", "m1_", { base: { resPct: 3 }, step: { resPct: 0.6 }, bonus: { 4: { atkPct: 5 }, 10: { hpPct: 6 } } }),
      tb("m2", "元素", 30, "状态 · 强度", "m2_", { base: { statusPower: 3 }, step: { statusPower: 1 }, bonus: { 6: { statusHit: 8 }, 12: { statusPower: 10 } } }),
      tb("m3", "奥术", 60, "穿透 · 禁咒", "m3_", { base: { atkPct: 3 }, step: { atkPct: 0.5 }, bonus: { 5: { penetrate: 8 }, 10: { critDmg: 10 }, 13: { statusResist: 10 } } })
    ] },

  { id: "support", name: "✨ 辅佐", role: "治疗 · 防护", color: "#8fd8ff",
    active: { id: "s_act", key: "bless", name: "祝福", cd: 4, unlockLv: 15, desc: "恢复自身最大生命 25%（每级 +4%）。Lv5 时 41%。" },
    branches: [
      tb("s1", "守护", 5, "生命 · 减伤", "s1_", { base: { hpPct: 3 }, step: { hpPct: 0.7 }, bonus: { 5: { dmgCut: 4 }, 11: { block: 5 } } }),
      tb("s2", "治愈", 30, "治疗 · 回复", "s2_", { base: { healPct: 2 }, step: { healPct: 0.5 }, bonus: { 7: { healPct: 2 }, 12: { healPct: 2.5 } } }),
      tb("s3", "净化", 60, "抗性 · 免疫", "s3_", { base: { resPct: 3 }, step: { resPct: 0.6 }, bonus: { 5: { statusResist: 8 }, 10: { tenacity: 8 }, 13: { statusResist: 10 } } })
    ] }
];

// 🎭 每条分支的成长风格 + 第 14 阶专属机制（让自由加点搭得出流派）
const BRANCH_STYLE = {
  g1: "前期叠防御，后期格挡反震",
  g2: "血越少越硬，残血翻盘",
  g3: "挨打就还手，缴械嘲讽",
  v1: "稳定堆攻击与暴击",
  v2: "怒气循环，越打越凶",
  v3: "暴击后连击追击",
  r1: "抢速度，多行动",
  r2: "穿透破防，远程暴击",
  r3: "双生连动，追击收割",
  m1: "法抗护身，稳中输出",
  m2: "状态流，灼烧破防更痛",
  m3: "穿透禁咒，暴伤爆发",
  s1: "护盾与减伤",
  s2: "残血回复，站场更久",
  s3: "抗性免疫，驱散减益"
};
const BRANCH_SIGN = {
  g1: { counter: 15 }, g2: { reverse: 1 }, g3: { taunt: 1 },
  v1: { critRate: 4 }, v2: { rageOnKill: 12 }, v3: { chase: 12 },
  r1: { dualborn: 10 }, r2: { penetrate: 12 }, r3: { doubleStrike: 12 },
  m1: { statusResist: 15 }, m2: { statusHit: 15 }, m3: { penetrate: 15 },
  s1: { block: 6 }, s2: { healPct: 5 }, s3: { tenacity: 8 }
};
// ✦ 大天赋 / 终天赋的独有机制词条
const MAJOR_MECH = {
  g1: { block: 6 }, g2: { lowHpCut: 6 }, g3: { thorns: 6 },
  v1: { critDmg: 12 }, v2: { rageOnKill: 10 }, v3: { doubleStrike: 8 },
  r1: { spdPct: 4 }, r2: { penetrate: 10 }, r3: { chase: 10 },
  m1: { statusResist: 9 }, m2: { statusHit: 9 }, m3: { penetrate: 10 },
  s1: { block: 6 }, s2: { healPct: 5 }, s3: { tenacity: 8 }
};
const ULT_MECH = {
  g1: { tenacity: 12 }, g2: { lowHpCut: 12 }, g3: { thorns: 12 },
  v1: { critDmg: 18 }, v2: { rageOnSkill: 12 }, v3: { chase: 12 },
  r1: { spdPct: 6 }, r2: { penetrate: 15 }, r3: { dualborn: 10 },
  m1: { statusPower: 9 }, m2: { statusHit: 10 }, m3: { statusPower: 10 },
  s1: { block: 8 }, s2: { healPct: 8 }, s3: { tenacity: 10 }
};
TALENT_TREES.forEach((t) => t.branches.forEach((b) => {
  b.style = BRANCH_STYLE[b.id] || "";
  const addEff = (node, extra) => {
    if (!node || !extra) return;
    Object.keys(extra).forEach((k) => { node.eff[k] = r1((Number(node.eff[k]) || 0) + Number(extra[k])); });
  };
  const major = MAJOR_MECH[b.id];
  if (major) {
    [4, 9].forEach((i) => addEff(b.nodes[i], major));
    addEff(b.nodes[13], ULT_MECH[b.id]);
  }
  const last = b.nodes[b.nodes.length - 1];
  if (last) {
    if (BRANCH_SIGN[b.id]) addEff(last, BRANCH_SIGN[b.id]);
    last.mech = true;
  }
}));

// 🧮 上限保护：个别词条叠加后过高，统一压到合理区间
const TALENT_CAP = { chase: 20, doubleStrike: 20, block: 20, tenacity: 20, penetrate: 25, statusPower: 40, statusHit: 25, statusResist: 25, lowHpCut: 15, dmgCut: 20, spdPct: 25, atkPct: 25, hpPct: 30, defPct: 25, resPct: 25, critRate: 12, critDmg: 25, healPct: 32, rageStart: 20 };
TALENT_TREES.forEach((t) => t.branches.forEach((b) => b.nodes.forEach((n) => {
  Object.keys(n.eff).forEach((k) => {
    const cap = TALENT_CAP[k];
    if (cap != null && Number(n.eff[k]) > cap) n.eff[k] = cap;
  });
})));
// ⏳ 天赋成长节奏：三条分支都在天赋开放（Lv5）时一起可用；阶每 5 级开放一阶
//    分支：Lv5 全开；阶：Lv5 → Lv70
export const TALENT_BRANCH_LV = [5, 5, 5];
export const TALENT_TIER_LV = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
TALENT_TREES.forEach((t) => (t.branches || []).forEach((b, i) => { b.unlockLv = TALENT_BRANCH_LV[i] || b.unlockLv; }));

// 天赋点获取：每级 1 点，每次突破 +2
export const talentPointsOf = (ch) => {
  if (!ch) return 0;
  return Math.max(0, (Number(ch.lv) || 1) - 1) + 2 * Math.max(0, Number(ch.breaks) || 0);
};

// 🎉 26 庆典：草薙京 10 关试炼（Lv20 → Lv80）
const KYO_LV = [20, 27, 33, 40, 47, 53, 60, 67, 73, 80];
const FEST_TITLES = ["初火之试","外式入门","连段之试","暗拂之炎","百八式","火之意志","草薙之炎","无式","大蛇薙","最终试炼 · 大蛇薙"];
const festD = DUNGEONS.find((x) => x.id === "d_fest");
if (festD) {
  Object.assign(festD, {
    name: "26 庆典", icon: "🎉", desc: "26 周年限定 BOSS 战：草薙京十番试炼", type: "event",
    stages: KYO_LV.map((lv, i) => {
      const first = enemyAt("fest_kyo", lv);
      return {
        id: "fest_" + (i + 1),
        name: FEST_TITLES[i] || ("第 " + (i + 1) + " 试炼 · 草薙京"),
        bossTitle: "炎之贵公子",
        lv, tier: "首领", tierLabel: "首领",
        story: [
          "武道馆的木门被推开，草薙京正在热身。",
          "他抬了抬下巴：「再来？」",
          "火苗在指尖跳动。",
          "馆内的空气开始发烫。",
          "他开始认真了。",
          "连段一次比一次快。",
          "草薙之炎缠上双臂。",
          "地板被烤出焦痕。",
          "他收起了笑容。",
          "「最后一试炼——别让我失望。」"
        ][i],
        scene: "草薙流武道馆",
        sceneDesc: "木地板被烤得发烫，旧匾额下的空气在扭曲。",
        sceneMods: { atkPct: 6 },
        weather: "heat",
        enemies: ["fest_kyo"],
        foe: first,
        drop: i === 9 ? { gearChance: 100, themeGear: true, kyoShard: [11, 22] } : { kyoShard: [2 + i, 4 + i * 2] },
        themeGear: i === 9 ? "草薙流古武典" : "",
        gold: 6000 + i * 3500,
        exp: 2500 + i * 1200
      };
    })
  });
}

// ⚡ 回怒重做：普攻回怒 / 技能回怒（按武器性质）
const RAGE_MAP = {
  w_dagger: [24, 6], w_fist: [24, 6], w_twin: [24, 6], w_bow: [24, 6], w_hunt: [24, 6],
  w_sling: [22, 6], w_longbow: [24, 6],
  w_iron: [20, 10], w_torch: [20, 10], w_shield: [18, 10], w_wood: [18, 12],
  w_spear: [14, 16], w_spear2: [14, 16], w_axe: [12, 18],
  w_firestaff: [12, 18], w_thunder: [12, 18],
  w_aegis: [10, 20], w_purify: [10, 20], w_cross: [20, 10], w_kyo: [18, 14]
};
WEAPONS.forEach((w) => { const r = RAGE_MAP[w.id]; if (r) { w.aRage = r[0]; w.sRage = r[1]; } });

// 🔨 装备突破石掉落（锻造基地，按关递增）
const _gearD = DUNGEONS.find((d) => d.id === "d_gear");
if (_gearD) _gearD.stages.forEach((s, i) => { s.drop = s.drop || {}; s.drop.bstone = 2 + Math.floor(i / 3); });

// 🔫 玩具 SSR 回怒（普攻 / 技能）
const TOY_RAGE = { w_bubble: [22, 12], w_hammer: [14, 16], w_fan: [14, 20], w_toybow: [24, 8], w_tambourine: [10, 22],
  w_thunder2: [18, 12], w_umbra: [22, 10], w_tide: [12, 18] };
WEAPONS.forEach((w) => { const r = TOY_RAGE[w.id]; if (r) { w.aRage = r[0]; w.sRage = r[1]; } });

// 🛡 SSR 防具 / 饰品（主属性 + 特化词条）
ARMORS.push(
  { id: "a_dragon", name: "龙鳞战甲", part: "top", rarity: "SSR", main: { hp: 400, def: 26 }, defPct: 6, dmgCut: 6, thorns: 8, desc: "鳞甲会记住每一次撞击，再还回去。" },
  { id: "a_sky", name: "苍穹胸甲", part: "top", rarity: "SSR", main: { hp: 380, def: 30 }, resPct: 6, dmgCut: 5, desc: "轻甲里灌了风，法抗意外地好。" },
  { id: "a_star", name: "星辉法袍", part: "top", rarity: "SSR", main: { hp: 340, res: 24, def: 14 }, resPct: 10, ragePct: 6, desc: "法袍上的星屑会随怒气变亮。" },
  { id: "a_umbra", name: "幽影夜行衣", part: "top", rarity: "SSR", main: { hp: 320, def: 18 }, defPct: 4, spd: 2, critRate: 4, desc: "布料的接缝都藏在暗处。" },
  { id: "a_dragon_leg", name: "龙鳞战裤", part: "bottom", rarity: "SSR", main: { hp: 240, def: 18 }, defPct: 4, thorns: 5, desc: "护膝的鳞片最厚。" },
  { id: "a_sky_leg", name: "苍穹护腿", part: "bottom", rarity: "SSR", main: { hp: 220, def: 20 }, spd: 3, dmgCut: 3, desc: "跑起来几乎没有负担。" },
  { id: "a_star_leg", name: "星辉法裙", part: "bottom", rarity: "SSR", main: { hp: 230, res: 18 }, resPct: 8, hpPct: 4, desc: "裙摆流动时会带起微光。" },
  { id: "a_umbra_leg", name: "幽影绑腿", part: "bottom", rarity: "SSR", main: { hp: 200, def: 12 }, spd: 4, critRate: 3, desc: "缠得紧，落地无声。" }
);
ACCESSORIES.push(
  { id: "c_dragon_fang", name: "龙牙护符", rarity: "SSR", main: { atk: 26, hp: 120 }, atkPct: 6, critDmg: 12, desc: "龙牙会放大出手时的力道。" },
  { id: "c_star_drop", name: "星辉吊坠", rarity: "SSR", main: { atk: 18, hp: 140 }, resPct: 8, ragePct: 8, desc: "吊坠里的夜空会随着怒气翻涌。" },
  { id: "c_umbra_mask", name: "幽影面罩", rarity: "SSR", main: { atk: 22, spd: 1 }, spd: 3, critRate: 6, atkPct: 4, desc: "看不见脸，也看不清出手。" },
  { id: "c_mercy_ring", name: "圣愈指环", rarity: "SSR", main: { hp: 180, atk: 10 }, hpPct: 8, dmgCut: 4, desc: "戴着它，伤口会慢慢合上。" }
);

// 🎯 专精装：不堆基础四维，走词条特化
ARMORS.push({
  id: "a_vigil", name: "守夜胸甲", part: "top", rarity: "SSR",
  main: { hp: 260, def: 12 }, defPct: 8, resPct: 8, dmgCut: 8, thorns: 10,
  desc: "不为硬扛而生，为「挨打也要还手」而生。"
});
ACCESSORIES.push({
  id: "c_dawn", name: "破晓指环", rarity: "SSR",
  main: { atk: 16, spd: 1 }, critRate: 12, critDmg: 25, atkPct: 6, ragePct: 8,
  desc: "天将亮时最冷，也最容易一击得手。"
});

// 🎯 武器专精要求（按类型与品质）
const REQ_BY = { melee: "str", ranged: "agi", focus: "intel" };
const REQ_NAME = { str: "力量", agi: "敏捷", intel: "智力", tech: "技巧" };
const REQ_VAL = { R: 10, SR: 20, SSR: 32, UR: 44 };
WEAPONS.forEach((w) => {
  let key = REQ_BY[w.style] || "str";
  if (/匕|双刃|拳套|短刀/.test(w.name)) key = "tech";
  const base = REQ_VAL[w.rarity] || 9;
  const heavy = /斧|枪|锤|戟|重|巨/.test(w.name);
  const light = /匕|拳|双刃|短刀|弓|弩|飞刀|面罩/.test(w.name);
  let val = base + (heavy ? 5 : light ? -5 : 0);
  if ((Number(w.main && w.main.atk) || 0) >= 85) val += 2;
  val = Math.max(6, Math.min(46, val));
  w.req = { key, val };
  const tip = "需要" + REQ_NAME[key] + " " + val;
  if (w.desc && w.desc.indexOf("需要") < 0) w.desc = w.desc + "（" + tip + "）";
});
export const SPEC_REQ_NAME = REQ_NAME;

// 🎉 26 庆典 · 第二组：K' 十番试炼（Lv40~85）
const K_LV = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
const K_TITLES = ["灯灭之后", "墨镜客", "赤手空拳", "皮夹克", "不肯摘的墨镜", "右手在烧", "火与沉默", "记忆的碎片", "暴走边缘", "最终试炼 · 摘下的墨镜"];
const _fest = DUNGEONS.find((x) => x.id === "d_fest");
if (_fest) {
  K_LV.forEach((lv, i) => {
    const first = enemyAt("fest_k", lv);
    _fest.stages.push({
      id: "fest2_" + (i + 1),
      name: K_TITLES[i],
      lv, tier: "首领", tierLabel: "首领",
      bossTitle: "墨镜下的火焰",
      story: [
        "武道馆的灯忽然灭了，一个戴墨镜的男人靠在墙边。",
        "「不用热身。」他把墨镜往上推了推。",
        "他的右拳开始发红。",
        "空气被烤得扭曲。",
        "连招没有停顿，像秒针一样准。",
        "赤红的火焰沿着手臂爬到肩膀。",
        "冰与火在这一刻重叠。",
        "他摘下了墨镜。",
        "火光把他整个人吞没。",
        "「最后一击——看清楚了。」"
      ][i],
      scene: "NESTS 废弃研究所",
      sceneDesc: "断电的走廊漂着冷雾，墙上的编号被划掉了。",
      sceneMods: { spdPct: 5 },
      weather: "fog",
      enemies: ["fest_k"],
      foe: first,
      drop: i === 9 ? { gearChance: 100, themeGear: true, kShard: [11, 22] } : { kShard: [2 + i, 4 + i * 2] },
      themeGear: i === 9 ? "究极热动拳套" : "",
      gold: 8000 + i * 4000,
      exp: 3200 + i * 1500
    });
  });
}

// 🧹 去重：武器/防具/饰品若已有 main，删除与其重复的顶层白值字段（避免重复计算）
[].concat(WEAPONS, ARMORS, ACCESSORIES).forEach((x) => {
  if (!x.main) return;
  Object.keys(x.main).forEach((k) => {
    if (x[k] != null && Number(x[k]) === Number(x.main[k])) delete x[k];
  });
});

// 🧹 武器一律以 main 为准，删除遗留的顶层 atk
WEAPONS.forEach((w) => { if (w.main && w.main.atk != null) delete w.atk; });

// 📏 压缩品阶数值跨度：高品阶封顶，低品阶托底
const CAP = {
  weapon: { R: 38, SR: 56, SSR: 106, UR: 120 },
  armorHp: { R: 160, SR: 280, SSR: 420, UR: 480 },
  armorDef: { R: 12, SR: 22, SSR: 36, UR: 42 },
  accAtk: { R: 9, SR: 15, SSR: 26, UR: 30 }
};
const FLOOR = { weapon: { R: 26, SR: 44, SSR: 78 }, armorHp: { R: 90, SR: 180, SSR: 300 }, armorDef: { R: 4, SR: 10, SSR: 16 }, accAtk: { R: 3, SR: 6, SSR: 12 } };
const clampN = (v, kind, rarity) => {
  const cap = (CAP[kind] || {})[rarity], fl = (FLOOR[kind] || {})[rarity];
  let n = Number(v) || 0;
  if (cap != null) n = Math.min(n, cap);
  if (fl != null) n = Math.max(n, fl);
  return Math.round(n);
};
WEAPONS.forEach((w) => {
  if (!w.main) return;
  Object.keys(w.main).forEach((k) => {
    if (k === "atk") w.main[k] = clampN(w.main[k], "weapon", w.rarity);
  });
});
ARMORS.forEach((a) => {
  if (!a.main) return;
  if (a.main.hp != null) a.main.hp = clampN(a.main.hp, "armorHp", a.rarity);
  if (a.main.def != null) a.main.def = clampN(a.main.def, "armorDef", a.rarity);
});
ACCESSORIES.forEach((c) => {
  if (!c.main) return;
  if (c.main.atk != null) c.main.atk = clampN(c.main.atk, "accAtk", c.rarity);
});

// 📏 品阶数值重排：每个品阶按线性映射到目标区间（压缩跨度）
const remap = (arr, get, set, lo, hi) => {
  const vals = arr.map((x) => Number(get(x)) || 0).filter((v) => v > 0);
  if (!vals.length) return;
  const mn = Math.min(...vals), mx = Math.max(...vals);
  arr.forEach((x) => {
    const v = Number(get(x)) || 0;
    if (v <= 0) return;
    const t = mx === mn ? 0.5 : (v - mn) / (mx - mn);
    set(x, Math.round(lo + (hi - lo) * t));
  });
};
["R", "SR", "SSR"].forEach((r) => {
  const TGT = { R: [30, 38], SR: [42, 52], SSR: [62, 78] }[r];
  remap(WEAPONS.filter((w) => w.rarity === r), (w) => w.main && w.main.atk, (w, v) => { w.main.atk = v; }, TGT[0], TGT[1]);
  const AH = { R: [90, 160], SR: [180, 260], SSR: [290, 380] }[r];
  remap(ARMORS.filter((a) => a.rarity === r), (a) => a.main && a.main.hp, (a, v) => { a.main.hp = v; }, AH[0], AH[1]);
  const AD = { R: [4, 10], SR: [10, 18], SSR: [18, 30] }[r];
  remap(ARMORS.filter((a) => a.rarity === r), (a) => a.main && a.main.def, (a, v) => { a.main.def = v; }, AD[0], AD[1]);
  const AA = { R: [3, 8], SR: [6, 13], SSR: [12, 22] }[r];
  remap(ACCESSORIES.filter((c) => c.rarity === r), (c) => c.main && c.main.atk, (c, v) => { c.main.atk = v; }, AA[0], AA[1]);
});

// ♾ 每个庆典 BOSS 的「无尽碎片试炼」（可重复挑战，只刷专属碎片）
const _fest2 = DUNGEONS.find((x) => x.id === "d_fest");
if (_fest2) {
  [
    { id: "fest_11", boss: "fest_kyo", name: "无尽试炼 · 草薙京", lv: 95, bossTitle: "炎之贵公子", shardKey: "kyoShard", story: "武道馆的火不会熄，来多少次都一样。" },
    { id: "fest2_11", boss: "fest_k", name: "无尽试炼 · K'", lv: 95, bossTitle: "墨镜下的火焰", shardKey: "kShard", story: "研究所的雾散不掉，他也一直站在那里。" }
  ].forEach((cfg) => {
    const first = enemyAt(cfg.boss, cfg.lv);
    _fest2.stages.push({
      id: cfg.id, name: cfg.name, lv: cfg.lv, tier: "首领", tierLabel: "首领",
      bossTitle: cfg.bossTitle, repeat: true, endless: true, rounds: 10,
      story: cfg.story,
      scene: cfg.boss === "fest_kyo" ? "草薙流武道馆" : "NESTS 废弃研究所",
      sceneDesc: cfg.boss === "fest_kyo" ? "木地板被烤得发烫，空气在扭曲。" : "断电的走廊漂着冷雾。",
      sceneMods: cfg.boss === "fest_kyo" ? { atkPct: 6 } : { spdPct: 5 },
      weather: cfg.boss === "fest_kyo" ? "heat" : "fog",
      enemies: [cfg.boss],
      foe: first,
      drop: {},
      themeGear: "", gold: 0, exp: 0
    });
  });
}
