// 闲得慌RPG v2 · 数据（纯数据，无逻辑）
export const RARITY_MULT = { R: 1, SR: 1.6, SSR: 2.4, UR: 3.4 };
// 🚧 内容开关：装备选择已开放；关卡内容仍待定（数据保留）
export const CONTENT_READY = true;
export const STAGE_READY = false;
export const SLOT_BASE = {
  weapon: { atk: 40 },
  armor: { hp: 220, def: 18, res: 14 },
  accessory: { atk: 8, hp: 60, def: 4, res: 10, spd: 2 }
};
export const WEAPONS = [
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
    desc: "厚木板钉成的圆盾，砸人比砍人更顺手。" }
  // ── SR / SSR / UR 尚未设计：旧占位武器已移除，等正式设计后再加 ──
];
// ── SR / SSR / UR 尚未设计：旧占位装备已移除，等正式设计后再加 ─────
export const ARMORS = [
  { id: "a_cloth", name: "粗布衣", rarity: "R", dmgCut: 2, desc: "最普通的粗布衣服，挡不住刀，但聊胜于无。" },
  { id: "a_leather", name: "皮甲", rarity: "R", def: 8, desc: "鞣过的兽皮缝成的背心，硬邦邦的，挡钝器还行。" },
  { id: "a_rattan", name: "藤甲", rarity: "R", hp: 40, desc: "藤条编的护身甲，轻，但挨打时会吱呀响。" },
  { id: "a_cloak", name: "轻便斗篷", rarity: "R", spd: 2, desc: "薄布斗篷，不挡刀，胜在不拖脚步。" },
  { id: "a_mirror", name: "护心镜", rarity: "R", res: 8, desc: "一块磨亮的铜镜挂在胸口，图个心安。" },
  { id: "a_spike", name: "钉刺背心", rarity: "R", thorns: 5, desc: "内衬钉了铁刺，谁抱上来谁疼。" }
];
export const ACCESSORIES = [
  { id: "c_rope", name: "布绳", rarity: "R", atkPct: 2, desc: "随手系在手腕上的布绳，图个心安。" },
  { id: "c_beads", name: "木珠串", rarity: "R", hp: 30, desc: "几颗木珠串成的手串，据说能压惊。" },
  { id: "c_charm", name: "铜护符", rarity: "R", def: 5, desc: "小铜片打的护符，边角已经磨圆了。" },
  { id: "c_glove", name: "皮质手套", rarity: "R", spd: 1, desc: "旧皮手套，握东西更稳，动作也利索一点。" },
  { id: "c_luck", name: "幸运石", rarity: "R", critRate: 2, desc: "路边捡的白色小石头，据说能带来好运。" },
  { id: "c_band", name: "麻布护腕", rarity: "R", res: 5, desc: "缠在手腕上的麻布，挡不住什么，但心里有底。" }
];
export const STAGES = [
  { id: "k1", name: "训练木桩", tier: 1, gold: 120, exp: 40,
    foe: { name: "木桩", lv: 5, hp: 800, atk: 60, def: 20, res: 10, spd: 8 },
    drop: { shards: [8, 12], stone: [2, 4], gearChance: 10, manuscript: 1, medal: 0, medalChance: 0 } },
  { id: "k2", name: "街头混混", tier: 2, gold: 260, exp: 90,
    foe: { name: "混混", lv: 15, hp: 1800, atk: 120, def: 40, res: 20, spd: 11 },
    drop: { shards: [14, 22], stone: [5, 9], gearChance: 25, manuscript: 2, medal: 1, medalChance: 30 } },
  { id: "k3", name: "草薙京·试炼", tier: 3, gold: 520, exp: 180,
    foe: { name: "草薙京", lv: 34, hp: 2398, atk: 170, def: 60, res: 40, spd: 13 },
    drop: { shards: [26, 40], stone: [10, 16], gearChance: 45, manuscript: 4, medal: 1, medalChance: 60 } },
  { id: "k4", name: "无尽·第一层", tier: 4, gold: 900, exp: 320,
    foe: { name: "影武者", lv: 50, hp: 5200, atk: 260, def: 90, res: 60, spd: 15 },
    drop: { shards: [40, 60], stone: [18, 28], gearChance: 70, manuscript: 6, medal: 2, medalChance: 80 } },
  { id: "k5", name: "鬼武者", tier: 5, gold: 1400, exp: 460,
    foe: { name: "鬼武者", lv: 65, hp: 7200, atk: 330, def: 130, res: 90, spd: 17 },
    drop: { shards: [55, 75], stone: [24, 34], gearChance: 80, manuscript: 8, medal: 2, medalChance: 85 } },
  { id: "k6", name: "影众·头目", tier: 6, gold: 2000, exp: 650,
    foe: { name: "影众头目", lv: 80, hp: 9800, atk: 420, def: 170, res: 120, spd: 19 },
    drop: { shards: [70, 95], stone: [30, 42], gearChance: 85, manuscript: 10, medal: 3, medalChance: 90 } },
  { id: "k7", name: "剑圣·试炼", tier: 7, gold: 2800, exp: 900,
    foe: { name: "剑圣", lv: 90, hp: 13000, atk: 520, def: 210, res: 150, spd: 21 },
    drop: { shards: [90, 120], stone: [38, 52], gearChance: 90, manuscript: 12, medal: 3, medalChance: 95 } },
  { id: "k8", name: "无尽·主宰", tier: 8, gold: 3800, exp: 1200,
    foe: { name: "无尽主宰", lv: 100, hp: 18000, atk: 650, def: 260, res: 190, spd: 23 },
    drop: { shards: [120, 160], stone: [48, 66], gearChance: 100, manuscript: 15, medal: 4, medalChance: 100 } }
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
//    上限拉高，允许「全攻 / 全防 / 全血」这种极限流派；单项吃满 = 40 点
export const BIRTH = {
  basicPoints: 40, basicPct: 5, basicCap: 40,     // 生命/攻击/防御/法抗（上限 = 总点数，可全堆一项 +200%）
  specPoints: 24, specCap: 24,                    // 力量/智力/技巧/敏捷（上限 = 总点数，可全堆一项）
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
  { at: 20,  capTo: 40,  stone: 10,  gold: 2000,  bonus: 3, points: 3 },
  { at: 40,  capTo: 60,  stone: 25,  gold: 6000,  bonus: 3, points: 3 },
  { at: 60,  capTo: 80,  stone: 50,  gold: 14000, bonus: 3, points: 3 },
  { at: 80,  capTo: 100, stone: 90,  gold: 28000, bonus: 3, points: 3 },
  { at: 100, capTo: 100, stone: 150, gold: 50000, bonus: 3, points: 3 }
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
  weapon: { R: 400, SR: 1000, SSR: 2200, UR: 5400 },
  armor: { R: 350, SR: 850, SSR: 1900, UR: 4400 },
  accessory: { R: 300, SR: 750, SSR: 1700, UR: 4100 }
};

// 🌳 天赋树（5 定位）：每升 1 级 +1 点，每次突破 +2 点
//    节点 need = 需要本树已投入的点数；eff 由 power.js 的 talentBonus() 汇总
// 🌳 天赋树（职业定位版 · 长链）：5 职业 × 3 分支 × 14 阶 + 职业主动技
//    分支按等级解锁，阶按 TIER_LV 逐级开放；节点效果按「基础值 + 每阶成长」生成
const CN14 = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四"];
const r1 = (n) => Math.round(n * 10) / 10;

function chain(prefix, label, spec) {
  return Array.from({ length: 14 }, (_, i) => {
    const eff = {};
    Object.keys(spec.base).forEach((k) => { eff[k] = r1(spec.base[k] + (spec.step[k] || 0) * i); });
    if (spec.bonus && spec.bonus[i]) Object.assign(eff, spec.bonus[i]);
    return { id: prefix + (i + 1), name: label + "·" + CN14[i], eff };
  });
}

const tb = (id, name, unlockLv, desc, branchKey, spec) => {
  const b = { id, name, unlockLv, desc, nodes: chain(branchKey, name, spec) };
  return b;
};

export const TALENT_TREES = [
  { id: "guard", name: "🛡️ 守护", role: "坦克 · 减伤", color: "#8fd8ff",
    active: { id: "g_act", key: "wall", name: "盾墙", cd: 4, need: 10, desc: "获得 30% 生命护盾" },
    branches: [
      tb("g1", "铁壁", 5, "防御 · 格挡", "g1_", { base: { defPct: 3 }, step: { defPct: 0.6 }, bonus: { 3: { block: 3 }, 7: { block: 5 }, 11: { tenacity: 8 } } }),
      tb("g2", "不屈", 30, "生命 · 韧性", "g2_", { base: { hpPct: 4 }, step: { hpPct: 0.8 }, bonus: { 4: { lowHpCut: 4 }, 9: { lowHpCut: 6 }, 13: { tenacity: 10 } } }),
      tb("g3", "荆棘", 60, "减伤 · 反制", "g3_", { base: { dmgCut: 2 }, step: { dmgCut: 0.3 }, bonus: { 5: { block: 5 }, 10: { tenacity: 8 } } })
    ] },

  { id: "vanguard", name: "⚔️ 先锋", role: "爆发 · 暴击", color: "#ffb86b",
    active: { id: "v_act", key: "frenzy", name: "狂战", cd: 4, need: 10, desc: "攻击 +40%，持续 2 回合" },
    branches: [
      tb("v1", "突袭", 5, "攻击 · 暴击", "v1_", { base: { atkPct: 3 }, step: { atkPct: 0.6 }, bonus: { 3: { critRate: 2 }, 8: { critDmg: 8 }, 12: { critRate: 3 } } }),
      tb("v2", "战意", 30, "怒气 · 收割", "v2_", { base: { atkPct: 2, rageStart: 2 }, step: { atkPct: 0.4, rageStart: 1 }, bonus: { 6: { rageOnKill: 8 }, 12: { rageOnSkill: 10 } } }),
      tb("v3", "狂暴", 60, "暴击 · 连击", "v3_", { base: { critRate: 1 }, step: { critRate: 0.3 }, bonus: { 4: { critDmg: 8 }, 9: { doubleStrike: 8 }, 13: { chase: 10 } } })
    ] },

  { id: "ranger", name: "🏹 游侠", role: "速度 · 技巧", color: "#7ee787",
    active: { id: "r_act", key: "gale", name: "疾风", cd: 4, need: 10, desc: "本回合多行动一次" },
    branches: [
      tb("r1", "疾风", 5, "速度 · 出手", "r1_", { base: { spdPct: 2 }, step: { spdPct: 0.5 }, bonus: { 5: { atkPct: 5 }, 11: { spdPct: 4 } } }),
      tb("r2", "猎手", 30, "穿透 · 暴击", "r2_", { base: { atkPct: 2 }, step: { atkPct: 0.5 }, bonus: { 3: { penetrate: 8 }, 8: { critRate: 3 }, 12: { critDmg: 10 } } }),
      tb("r3", "影袭", 60, "双生 · 追击", "r3_", { base: { atkPct: 2, spdPct: 2 }, step: { atkPct: 0.4, spdPct: 0.3 }, bonus: { 7: { dualborn: 8 }, 12: { chase: 10 } } })
    ] },

  { id: "mage", name: "🔮 术士", role: "法系 · 法抗", color: "#c9a0ff",
    active: { id: "m_act", key: "arcane", name: "奥术冲击", cd: 4, need: 10, desc: "200% 攻击的无视部分减伤伤害" },
    branches: [
      tb("m1", "冥想", 5, "法抗 · 输出", "m1_", { base: { resPct: 3 }, step: { resPct: 0.6 }, bonus: { 4: { atkPct: 5 }, 10: { hpPct: 6 } } }),
      tb("m2", "元素", 30, "状态 · 强度", "m2_", { base: { statusPower: 6 }, step: { statusPower: 2 }, bonus: { 6: { statusHit: 8 }, 12: { statusPower: 10 } } }),
      tb("m3", "奥术", 60, "穿透 · 禁咒", "m3_", { base: { atkPct: 3 }, step: { atkPct: 0.5 }, bonus: { 5: { penetrate: 8 }, 10: { critDmg: 10 }, 13: { statusResist: 10 } } })
    ] },

  { id: "support", name: "✨ 辅佐", role: "治疗 · 防护", color: "#8fd8ff",
    active: { id: "s_act", key: "bless", name: "祝福", cd: 4, need: 10, desc: "恢复 30% 生命" },
    branches: [
      tb("s1", "守护", 5, "生命 · 减伤", "s1_", { base: { hpPct: 3 }, step: { hpPct: 0.7 }, bonus: { 5: { dmgCut: 4 }, 11: { block: 5 } } }),
      tb("s2", "治愈", 30, "生命 · 回复", "s2_", { base: { hpPct: 4 }, step: { hpPct: 0.6 }, bonus: { 7: { lowHpCut: 6 }, 12: { hpPct: 6 } } }),
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
  s1: { block: 8 }, s2: { lowHpCut: 10 }, s3: { tenacity: 12 }
};
TALENT_TREES.forEach((t) => t.branches.forEach((b) => {
  b.style = BRANCH_STYLE[b.id] || "";
  const last = b.nodes[b.nodes.length - 1];
  if (last) {
    if (BRANCH_SIGN[b.id]) Object.assign(last.eff, BRANCH_SIGN[b.id]);
    last.mech = true;
  }
}));

// ⏳ 天赋成长节奏：三条分支都在天赋开放（Lv5）时一起可用；阶每 5 级开放一阶
//    分支：Lv5 全开；阶：Lv5 → Lv70
export const TALENT_BRANCH_LV = [5, 5, 5];
export const TALENT_TIER_LV = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
TALENT_TREES.forEach((t) => (t.branches || []).forEach((b, i) => { b.unlockLv = TALENT_BRANCH_LV[i] || b.unlockLv; }));

// 天赋点获取：每级 1 点，每次突破 +2
export const talentPointsOf = (ch) => {
  if (!ch) return 0;
  return Math.max(0, (Number(ch.lv) || 1) - 1) + 2 * Math.max(0, Number(ch.breaks) || 0);
};
