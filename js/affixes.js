// 🎲 词条生成（通用池）：不再按部位限制，所有装备共用
//   条数按稀有度；基础数值 + 百分比/专精/伤害类型 从总池随机
const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// 基础数值（通用）
const BASE_POOL = [["atk", 8, 60], ["hp", 60, 420], ["def", 4, 40], ["res", 4, 40], ["spd", 1, 8]];

// 📖 词条库（给「词条库」页面用，只列名字）
export const AFFIX_LIB = {
  基础数值: ["攻击", "生命", "防御", "法抗", "速度"],
  百分比: ["攻击加成", "生命加成", "防御加成", "法抗加成", "暴击率", "暴击伤害", "减伤", "反伤", "怒气获取"],
  专精: ["力量", "智力", "技巧", "敏捷", "力量加成", "智力加成", "技巧加成", "敏捷加成"],
  伤害类型: ["物理伤害加成", "法术伤害加成", "普攻伤害加成", "技能伤害加成", "必杀伤害加成",
    "物理穿透", "法术穿透", "近战伤害加成", "远程伤害加成", "法器伤害加成"]
};

// 数值扩展（乘区类，展示用）
export const AFFIX_LIB_EXT = [
  ["伤害增加", "造成伤害 +3~15%"],
  ["伤害减免", "受到伤害 −3~12%"],
  ["暴击抵抗", "被暴击概率 −5~20%"],
  ["效果抵抗", "受到减益概率 −10~40%"],
  ["治疗效果加成", "治疗量 +5~20%"],
  ["治疗降低", "目标受到治疗 −10~50%"],
  ["护盾强度", "护盾量 +5~25%"],
  ["护盾破坏", "对护盾伤害 +10~40%"],
  ["持续伤害增加", "灼烧/中毒伤害 +5~25%"],
  ["持续伤害减免", "受到 DoT 伤害 −5~25%"],
  ["怒气消耗降低", "必杀消耗 −10~30%"],
  ["怒气回复", "每回合自动回怒 +2~8"],
  ["命中加成", "命中率 +5~20%"],
  ["闪避加成", "闪避率 +3~12%"],
  ["无视防御", "无视目标 X% 防御"],
  ["真实伤害", "每击附加 X 点固定伤害"]
];

// 第二批（战斗词条，展示用）
export const AFFIX_LIB_2 = [
  ["破防强度", "碎甲数值 +10~60%"],
  ["状态强度", "DoT 数值 +10~50%"],
  ["状态命中", "附带状态概率 +10~40%"],
  ["状态抗性", "受到状态概率 −10~40%"],
  ["冷却缩减", "招式冷却 −1 回合"],
  ["招式回怒", "招式命中回怒 +20~50%"],
  ["击杀回怒", "击杀时怒气 +10~30"],
  ["初始怒气", "开战怒气 +20~50"],
  ["残血减伤", "生命<30% 时减伤 +10~20%"],
  ["格挡", "受到伤害 −10~25%"],
  ["韧性", "受到暴击伤害 −10~30%"]
];

// 第三批（机制词条，展示用）
export const AFFIX_LIB_3 = [
  ["连击", "普攻 X% 再打一次（半伤）"],
  ["追击", "招式命中后 X% 追加 50% 普攻"],
  ["反击", "受击后 X% 反击 60% 伤害"],
  ["溅射", "对目标相邻单位造成 30% 伤害"],
  ["穿透", "无视目标 X% 减伤"],
  ["眩晕", "无法行动 1 回合"],
  ["沉默", "不能使用招式/必杀 2 回合"],
  ["缴械", "只能防御 1~2 回合"],
  ["嘲讽", "强制攻击施法者 1~2 回合"],
  ["冰冻", "无法行动，受击碎冰额外伤害"],
  ["禁疗", "治疗效果 −50~100%"],
  ["净化", "立即移除 N 个减益"],
  ["双生", "15% 概率不消耗回合"],
  ["蓄势", "防御后下次攻击 +60%"],
  ["逆流", "生命<25% 时攻击 +40%、减伤 +20%"],
  ["天命", "每场第一次致死伤害无效"]
];

// 通用百分比池（所有部位都能出）
const ALL_PCT = [
  ["atkPct", 2, 12], ["hpPct", 2, 12], ["defPct", 2, 10], ["resPct", 2, 10],
  ["critRate", 1, 8], ["critDmg", 4, 20], ["dmgCut", 1, 8], ["thorns", 5, 25], ["ragePct", 5, 25],
  ["str", 1, 3], ["intel", 1, 3], ["tech", 1, 3], ["agi", 1, 2],
  ["strPct", 2, 8], ["intelPct", 2, 8], ["techPct", 2, 8], ["agiPct", 2, 6],
  ["physPct", 2, 10], ["spellPct", 2, 10], ["normalPct", 2, 8], ["skillPct", 2, 8], ["ultPct", 2, 10],
  ["physPen", 3, 10], ["spellPen", 3, 10], ["meleePct", 2, 8], ["rangedPct", 2, 8], ["focusPct", 2, 8]
];

// 🥈 战斗词条（通用池）
const COMBAT_POOL = [
  ["cdReduce", 1, 1], ["rageOnSkill", 20, 50], ["rageOnKill", 10, 30], ["statusHit", 10, 40], ["sunderBoost", 10, 60],
  ["block", 10, 25], ["tenacity", 10, 30], ["lowHpCut", 10, 20], ["statusResist", 10, 40], ["statusPower", 10, 50],
  ["rageStart", 20, 50], ["penetrate", 10, 40], ["doubleStrike", 15, 30], ["chase", 15, 30], ["counter", 15, 30],
  ["dualborn", 10, 20], ["charge", 1, 1], ["reverse", 1, 1], ["fate", 1, 1], ["splash", 20, 35]
];
const COMBAT_CHANCE = { R: 0.08, SR: 0.18, SSR: 0.32, UR: 0.5 };

// 🥉 控制类（通用池，极低概率）
const CONTROL_POOL = [
  ["stun", 1, 1], ["silence", 2, 2], ["freeze", 1, 1], ["noheal", 50, 100],
  ["disarm", 1, 2], ["taunt", 1, 2], ["purify", 1, 2]
];
const CONTROL_CHANCE = { R: 0, SR: 0, SSR: 0.04, UR: 0.12 };

const COUNT = { R: [1, 2], SR: [2, 3], SSR: [3, 4], UR: [4, 5] };
const countFor = (rarity) => {
  const r = COUNT[rarity] || [2, 2];
  return r[0] + Math.floor(Math.random() * (r[1] - r[0] + 1));
};

// 🎯 每件装备的词条数（按设计而定，不写满；未列出的按稀有度随机）
const AFFIX_PLAN = {
  // R 武器：入门简单，1 条
  w_iron: 1, w_bow: 1, w_wood: 1, w_dagger: 1, w_fist: 1, w_spear: 1, w_sling: 1, w_hunt: 1, w_torch: 1, w_shield: 1,
  // SR 武器：主力 2 条；重击/法术型 3 条；辅助型 1 条
  w_twin: 2, w_axe: 3, w_spear2: 2, w_cross: 2, w_longbow: 3,
  w_firestaff: 3, w_thunder: 2, w_aegis: 1, w_purify: 1,
  // R 防具 / 饰品：1 条
  a_cloth: 1, a_leather: 1, a_rattan: 1, a_cloak: 1, a_mirror: 1, a_spike: 1,
  c_rope: 1, c_beads: 1, c_charm: 1, c_glove: 1, c_luck: 1, c_band: 1,
  // SR 防具：常规 2 条；重甲型 3 条
  a_lava: 2, a_mitril: 2, a_vine: 3, a_guard: 2, a_bulwark: 3, a_rock: 2,
  a_berserk: 2, a_rift: 2, a_wind: 2, a_shadow: 2, a_rune: 2, a_aura: 2, a_pray: 2, a_watch: 2,
  // SR 饰品：常规 2 条；堆属性型 3 条
  c_ring: 2, c_lavastone: 3, c_feather: 2, c_mitril: 3, c_bulwark: 2, c_ironheart: 2,
  c_badge: 2, c_fury: 2, c_goggle: 2, c_windcharm: 2, c_arcanestone: 2, c_runering: 2,
  c_bell: 2, c_mercy: 2
};
const PCT_KEYS = new Set(ALL_PCT.map(([k]) => k));

// 从池里换掉一条百分比，加入特殊词条
function swapIn(out, pool, rarityChance) {
  if (Math.random() >= rarityChance) return;
  if (!pool.length) return;
  const [k, lo, hi] = pool[Math.floor(Math.random() * pool.length)];
  if (out[k] !== undefined) return;
  const pctKeys = Object.keys(out).filter((key) => PCT_KEYS.has(key));
  if (pctKeys.length) delete out[pctKeys[pctKeys.length - 1]];
  out[k] = R(lo, hi);
}

export function rollAffixes(cat, rarity, forced) {
  const n = Number(forced) > 0 ? Number(forced) : countFor(rarity);
  const out = {};
  // 先塞 1~2 条基础数值
  const bases = BASE_POOL.slice();
  const baseCount = Math.min(bases.length, n <= 1 ? 1 : (Math.random() < 0.6 ? 1 : 2));
  for (let i = 0; i < baseCount && bases.length; i++) {
    const idx = Math.floor(Math.random() * bases.length);
    const [k, lo, hi] = bases.splice(idx, 1)[0];
    out[k] = R(lo, hi);
  }
  // 其余从通用百分比池抽
  const pool = ALL_PCT.slice();
  while (Object.keys(out).length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    const [k, lo, hi] = pool.splice(idx, 1)[0];
    if (out[k] !== undefined) continue;
    out[k] = R(lo, hi);
  }
  // 战斗词条 / 控制词条（概率替换一条百分比）
  swapIn(out, COMBAT_POOL, COMBAT_CHANCE[rarity] != null ? COMBAT_CHANCE[rarity] : 0.1);
  swapIn(out, CONTROL_POOL, CONTROL_CHANCE[rarity] || 0);
  return out;
}

// 把词条并进装备数据（不覆盖装备自带的核心字段）
export function applyAffixes(data, cat, rarity) {
  const roll = rollAffixes(cat, rarity, AFFIX_PLAN[data.id]);
  Object.keys(roll).forEach((k) => {
    if (data[k] === undefined) data[k] = roll[k];
  });
  data.__affix = Object.keys(roll);
  return data;
}
