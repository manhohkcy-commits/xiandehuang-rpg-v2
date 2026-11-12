// 🎲 词条生成（第一批：纯数值词条）
//   按位稀有度决定「词条条数」与「数值区间」，生成结果直接写进 item.data
//   这些字段 js/power.js 的 itemBonus 已经会读，所以不需要改引擎

const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

// 基础数值词条（按部位可出）
const BASE_POOL = {
  weapon:    [["atk", 8, 60]],
  armor:     [["hp", 60, 420], ["def", 4, 40], ["res", 4, 40]],
  accessory: [["atk", 6, 40], ["hp", 50, 300], ["res", 4, 30], ["spd", 1, 8]]
};

// 📖 词条库一览（给「词条一览」页面用；也是生成规则的事实来源）
export const AFFIX_LIB = {
  基础数值: {
    weapon:    [["攻击", 8, 60]],
    armor:     [["生命", 60, 420], ["防御", 4, 40], ["法抗", 4, 40]],
    accessory: [["攻击", 6, 40], ["生命", 50, 300], ["法抗", 4, 30], ["速度", 1, 8]]
  },
  百分比: {
    weapon:    [["攻击加成", 2, 12, "%"], ["暴击率", 1, 8, "%"], ["暴击伤害", 4, 20, "%"], ["怒气获取", 5, 25, "%"]],
    armor:     [["生命加成", 2, 12, "%"], ["防御加成", 2, 10, "%"], ["法抗加成", 2, 10, "%"], ["减伤", 1, 8, "%"], ["反伤", 5, 25, "%"]],
    accessory: [["攻击加成", 2, 10, "%"], ["生命加成", 2, 10, "%"], ["暴击率", 1, 6, "%"], ["暴击伤害", 4, 16, "%"], ["怒气获取", 5, 20, "%"]]
  },
  条数规则: { R: 2, SR: 3, SSR: 4, UR: 5 }
};

// 数值扩展（乘区类，接进战斗后启用）
export const AFFIX_LIB_EXT = [
  ["伤害增加", "造成伤害 +3~15%", "武器 / 饰品"],
  ["伤害减免", "受到伤害 −3~12%", "防具"],
  ["暴击抵抗", "被暴击概率 −5~20%", "防具"],
  ["效果抵抗", "受到减益概率 −10~40%", "防具 / 饰品"],
  ["治疗效果加成", "治疗量 +5~20%", "饰品 / 防具"],
  ["治疗降低", "目标受到治疗 −10~50%", "武器"],
  ["护盾强度", "护盾量 +5~25%", "饰品 / 防具"],
  ["护盾破坏", "对护盾伤害 +10~40%", "武器"],
  ["持续伤害增加", "灼烧/中毒伤害 +5~25%", "武器"],
  ["持续伤害减免", "受到 DoT 伤害 −5~25%", "防具"],
  ["怒气消耗降低", "必杀消耗 −10~30%", "饰品"],
  ["怒气回复", "每回合自动回怒 +2~8", "饰品"],
  ["命中加成", "命中率 +5~20%", "武器 / 饰品"],
  ["闪避加成", "闪避率 +3~12%", "饰品 / 防具"],
  ["无视防御", "无视目标 X% 防御", "武器（SSR+）"],
  ["真实伤害", "每击附加 X 点固定伤害", "武器（UR）"]
];

// 第二批（小改，接战斗后启用）
export const AFFIX_LIB_2 = [
  ["破防强度", "碎甲数值 +10~60%", "武器 / 饰品"],
  ["状态强度", "DoT 数值 +10~50%", "武器 / 饰品"],
  ["状态命中", "附带状态概率 +10~40%", "武器"],
  ["状态抗性", "受到状态概率 −10~40%", "防具"],
  ["冷却缩减", "招式冷却 −1 回合", "武器"],
  ["招式回怒", "招式命中回怒 +20~50%", "武器"],
  ["击杀回怒", "击杀时怒气 +10~30", "武器 / 饰品"],
  ["初始怒气", "开战怒气 +20~50", "饰品"],
  ["残血减伤", "生命<30% 时减伤 +10~20%", "防具"],
  ["格挡", "受到伤害 −10~25%", "防具"],
  ["韧性", "受到暴击伤害 −10~30%", "防具"]
];

// 第三批（新机制，控制与史诗级）
export const AFFIX_LIB_3 = [
  ["连击", "普攻 X% 再打一次（半伤）", "武器"],
  ["追击", "招式命中后 X% 追加 50% 普攻", "武器"],
  ["反击", "受击后 X% 反击 60% 伤害", "防具"],
  ["溅射", "对目标相邻单位造成 30% 伤害", "武器"],
  ["穿透", "无视目标 X% 减伤", "武器"],
  ["眩晕", "无法行动 1 回合", "武器（控制）"],
  ["沉默", "不能使用招式/必杀 2 回合", "武器（控制）"],
  ["缴械", "只能防御 1~2 回合", "防具（控制）"],
  ["嘲讽", "强制攻击施法者 1~2 回合", "防具"],
  ["冰冻", "无法行动，受击碎冰额外伤害", "武器（控制）"],
  ["禁疗", "治疗效果 −50~100%", "武器"],
  ["净化", "立即移除 N 个减益", "饰品"],
  ["双生", "15% 概率不消耗回合", "UR 专属"],
  ["蓄势", "防御后下次攻击 +60%", "UR 专属"],
  ["逆流", "生命<25% 时攻击 +40%、减伤 +20%", "UR 专属"],
  ["天命", "每场第一次致死伤害无效", "UR 专属"]
];

const PCT_BY_CAT = {
  weapon:    [["atkPct", 2, 12], ["critRate", 1, 8], ["critDmg", 4, 20], ["ragePct", 5, 25]],
  armor:     [["hpPct", 2, 12], ["defPct", 2, 10], ["resPct", 2, 10], ["dmgCut", 1, 8], ["thorns", 5, 25]],
  accessory: [["atkPct", 2, 10], ["hpPct", 2, 10], ["critRate", 1, 6], ["critDmg", 4, 16], ["ragePct", 5, 20]]
};

// 🥈 第二批：战斗词条（会真的接进战斗，字段名和 power.js 的 combatTraits 对应）
const COMBAT_BY_CAT = {
  weapon:    [["cdReduce", 1, 1], ["rageOnSkill", 20, 50], ["rageOnKill", 10, 30], ["statusHit", 10, 40], ["sunderBoost", 10, 60]],
  armor:     [["block", 10, 25], ["tenacity", 10, 30], ["lowHpCut", 10, 20], ["statusResist", 10, 40]],
  accessory: [["rageStart", 20, 50], ["rageOnKill", 10, 30], ["statusPower", 10, 50], ["sunderBoost", 10, 60]]
};
// 稀有度 → 该装备「带一条战斗词条」的概率（会替换掉一条百分比词条）
const COMBAT_CHANCE = { R: 0.08, SR: 0.18, SSR: 0.32, UR: 0.5 };

// 🥉 第三批：控制类（只在 SSR / UR 上小概率出现，走 applyStatus 的 70% 基础命中）
const CONTROL_BY_CAT = {
  weapon:    [["stun", 1, 1], ["silence", 2, 2], ["freeze", 1, 1], ["noheal", 50, 100],
              ["penetrate", 10, 40], ["doubleStrike", 15, 30], ["chase", 15, 30]],
  armor:     [["disarm", 1, 2], ["taunt", 1, 2], ["counter", 15, 30], ["reverse", 1, 1]],
  accessory: [["purify", 1, 2], ["dualborn", 10, 20], ["charge", 1, 1], ["fate", 1, 1], ["splash", 20, 35]]
};
const CONTROL_CHANCE = { R: 0, SR: 0, SSR: 0.04, UR: 0.12 };

// 稀有度 → 词条条数
const COUNT = { R: 2, SR: 3, SSR: 4, UR: 5 };

export function rollAffixes(cat, rarity) {
  const n = COUNT[rarity] || 2;
  const out = {};
  const bases = (BASE_POOL[cat] || []).slice();
  // 先塞 1~2 条基础
  const baseCount = Math.min(bases.length, n >= 4 ? 2 : 1);
  for (let i = 0; i < baseCount && bases.length; i++) {
    const idx = Math.floor(Math.random() * bases.length);
    const [k, lo, hi] = bases.splice(idx, 1)[0];
    out[k] = R(lo, hi);
  }
  // 剩下用该部位允许的百分比填
  const pool = (PCT_BY_CAT[cat] || PCT_BY_CAT.weapon).slice();
  while (Object.keys(out).length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    const [k, lo, hi] = pool.splice(idx, 1)[0];
    if (out[k] !== undefined) continue;
    out[k] = R(lo, hi);
  }
  // 🥈 按稀有度换一条战斗词条（保留基础数值词条，替换百分比那条）
  if (Math.random() < (COMBAT_CHANCE[rarity] != null ? COMBAT_CHANCE[rarity] : 0.1)) {
    const cpool = (COMBAT_BY_CAT[cat] || []).slice();
    if (cpool.length) {
      const [k, lo, hi] = cpool[Math.floor(Math.random() * cpool.length)];
      const pctKeys = Object.keys(out).filter((key) => (PCT_BY_CAT[cat] || []).some(([kk]) => kk === key));
      if (out[k] === undefined) {
        if (pctKeys.length) delete out[pctKeys[pctKeys.length - 1]];
        out[k] = R(lo, hi);
      }
    }
  }
  // 🥉 控制类：极低概率再换一条（眩晕/沉默/冰冻/缴械…）
  if (Math.random() < (CONTROL_CHANCE[rarity] || 0)) {
    const ctrl = (CONTROL_BY_CAT[cat] || []).slice();
    if (ctrl.length) {
      const [k, lo, hi] = ctrl[Math.floor(Math.random() * ctrl.length)];
      if (out[k] === undefined) {
        const pctKeys = Object.keys(out).filter((key) => (PCT_BY_CAT[cat] || []).some(([kk]) => kk === key));
        if (pctKeys.length) delete out[pctKeys[pctKeys.length - 1]];
        out[k] = R(lo, hi);
      }
    }
  }
  return out;
}

// 把词条并进装备数据（不覆盖装备自带的核心字段）
export function applyAffixes(data, cat, rarity) {
  const roll = rollAffixes(cat, rarity);
  Object.keys(roll).forEach((k) => {
    if (data[k] === undefined) data[k] = roll[k];
  });
  data.__affix = Object.keys(roll);
  return data;
}
