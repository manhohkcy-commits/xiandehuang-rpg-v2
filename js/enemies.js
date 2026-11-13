// 🗡 敌人模板（全部 Lv1 基准，按关卡等级缩放）
// stats = Lv1 面板；growth = 每级线性成长率；equip = 显示用装备名；skills = 招式组
const EG = { atk: 0.07, hp: 0.08, def: 0.06, res: 0.05, spd: 0.02 };
const EG_E = { atk: 0.075, hp: 0.085, def: 0.065, res: 0.055, spd: 0.02 };
const EG_B = { atk: 0.08, hp: 0.09, def: 0.07, res: 0.06, spd: 0.02 };
const E = (id, name, role, stats, skills, equip, growth = EG, desc = "") => ({
  id, name, camp: "红枫团", role, desc, stats, growth, equip, skills,
  critRate: stats.critRate || 5, critDmg: stats.critDmg || 150
});
export const ENEMIES = [
  // ── 普通 ────────────────────────
  E("e_thug", "打手", "近战", { atk: 22, hp: 180, def: 6, res: 4, spd: 9 },
    [{ name: "闷棍", desc: "单体 130% 攻击", mult: 130, cd: 2 }],
    { weapon: "短棍", armor: "粗布衣", armor2: "轻便护腿", accessory: "布绳" }, EG, "红枫团最底层的杂兵，只会挥棍子。"),
  E("e_brute", "暴徒", "近战", { atk: 26, hp: 220, def: 8, res: 4, spd: 8 },
    [{ name: "蛮撞", desc: "单体 150% 攻击", mult: 150, cd: 3 }],
    { weapon: "铁棍", armor: "皮甲", armor2: "藤甲护腿", accessory: "皮质手套" }, EG, "力气比脑子大，冲起来不看路。"),
  E("e_soldier", "士兵", "近战", { atk: 20, hp: 260, def: 12, res: 6, spd: 8 },
    [{ name: "列阵突刺", desc: "单体 120% 攻击", mult: 120, cd: 2 }],
    { weapon: "长枪", armor: "皮甲", armor2: "轻便护腿", accessory: "麻布护腕" }, EG, "受过基本训练，站得比打手稳。"),
  E("e_archer", "弓手", "远程", { atk: 24, hp: 150, def: 5, res: 5, spd: 11 },
    [{ name: "穿甲箭", desc: "单体 140% 攻击", mult: 140, cd: 3 }],
    { weapon: "短弓", armor: "粗布衣", armor2: "轻便护腿", accessory: "幸运石" }, EG, "躲在人群后面放冷箭的家伙。"),
  E("e_crossbow", "弩手", "远程", { atk: 30, hp: 160, def: 5, res: 5, spd: 10 },
    [{ name: "重弩", desc: "单体 160% 攻击", mult: 160, cd: 3 }],
    { weapon: "猎弩", armor: "粗布衣", armor2: "轻便护腿", accessory: "皮质手套" }, EG, "一发就要上弦半天，但确实疼。"),
  E("e_trainee_mage", "见习术士", "法术", { atk: 28, hp: 150, def: 4, res: 10, spd: 9 },
    [{ name: "火苗", desc: "单体 140% 法术伤害", mult: 140, cd: 3, spell: true }],
    { weapon: "木法杖", armor: "粗布衣", armor2: "轻便护腿", accessory: "秘能石" }, EG, "刚学会点火，烧得不太准。"),
  E("e_trainee_medic", "见习医疗兵", "辅助", { atk: 14, hp: 170, def: 6, res: 8, spd: 9 },
    [{ name: "包扎", desc: "治疗一名队友", heal: 25, cd: 3 }],
    { weapon: "木法杖", armor: "粗布衣", armor2: "轻便护腿", accessory: "祈愿铃" }, EG, "背着药箱跑来跑去，很怕挨打。"),
  E("e_light_shield", "轻甲盾兵", "坦克", { atk: 16, hp: 300, def: 18, res: 8, spd: 7 },
    [{ name: "盾击", desc: "单体 100% 攻击", mult: 100, cd: 2 }],
    { weapon: "木盾", armor: "皮甲", armor2: "藤甲护腿", accessory: "铜护符" }, EG, "举着轻盾，挡得住杂物，挡不住重击。"),
  E("e_heavy_shield", "重盾兵", "坦克", { atk: 18, hp: 380, def: 26, res: 10, spd: 6 },
    [{ name: "铁壁格挡", desc: "本回合减伤", guard: 30, cd: 3 }],
    { weapon: "木盾", armor: "铁卫护心镜", armor2: "钉刺护腿", accessory: "磐石护符" }, EG, "一面大盾扛在身前，走得很慢。"),
  E("e_firebomb", "燃烧瓶投掷手", "远程", { atk: 26, hp: 160, def: 5, res: 6, spd: 10 },
    [{ name: "投掷燃烧瓶", desc: "单体 130% 攻击并灼烧", mult: 130, cd: 3, burn: true }],
    { weapon: "投石索", armor: "粗布衣", armor2: "轻便护腿", accessory: "幸运石" }, EG, "腰上挂满瓶子，谁靠近就砸谁。"),
  // ── 精英 ────────────────────────
  E("e_vet_soldier", "资深士兵", "近战", { atk: 32, hp: 420, def: 20, res: 10, spd: 9 },
    [{ name: "连刺", desc: "单体 120% 攻击 ×2", mult: 120, hits: 2, cd: 3 }],
    { weapon: "长枪", armor: "藤蔓重腿", armor2: "钉刺护腿", accessory: "战意徽章" }, EG_E, "打了十年仗，枪尖磨得发亮。"),
  E("e_vet_archer", "资深弓手", "远程", { atk: 38, hp: 240, def: 8, res: 8, spd: 12 },
    [{ name: "箭雨", desc: "全体 80% 攻击", mult: 80, aoe: true, cd: 4 }],
    { weapon: "长弓", armor: "追风短裤", armor2: "轻便护腿", accessory: "猎手目镜" }, EG_E, "一箭封喉，从不多射第二箭。"),
  E("e_vet_crossbow", "资深弩手", "远程", { atk: 46, hp: 240, def: 8, res: 8, spd: 10 },
    [{ name: "破甲弩矢", desc: "单体 180% 攻击", mult: 180, cd: 4 }],
    { weapon: "十字弩", armor: "影行长裤", armor2: "轻便护腿", accessory: "猎手目镜" }, EG_E, "弩机是他自己改的，力道大得吓人。"),
  E("e_vet_medic", "资深医疗兵", "辅助", { atk: 20, hp: 280, def: 10, res: 14, spd: 10 },
    [{ name: "战地急救", desc: "治疗全体 20% 生命", heal: 20, cd: 4 }],
    { weapon: "木法杖", armor: "祷言圣袍", armor2: "灵能护腿", accessory: "慈心吊坠" }, EG_E, "能在箭雨里给人缝伤口。"),
  E("e_vet_shield", "资深重盾兵", "坦克", { atk: 30, hp: 600, def: 40, res: 16, spd: 6 },
    [{ name: "盾墙", desc: "本回合减伤 40%", guard: 40, cd: 3 }],
    { weapon: "木盾", armor: "铁壁重甲", armor2: "磐石护腿", accessory: "磐石护符" }, EG_E, "一整面墙，红枫团拿他堵门。"),
  E("e_high_mage", "高阶术士", "法术", { atk: 44, hp: 240, def: 6, res: 16, spd: 9 },
    [{ name: "烈焰冲击", desc: "单体 170% 法术伤害并灼烧", mult: 170, cd: 3, spell: true, burn: true }],
    { weapon: "火石法杖", armor: "法纹长袍", armor2: "灵能护腿", accessory: "秘能石" }, EG_E, "火球比见习术士大十倍。"),
  E("e_bomber", "爆破投掷手", "远程", { atk: 42, hp: 250, def: 8, res: 10, spd: 9 },
    [{ name: "爆破弹", desc: "全体 110% 攻击", mult: 110, aoe: true, cd: 4 }],
    { weapon: "投石索", armor: "裂痕长裤", armor2: "轻便护腿", accessory: "熔岩护石" }, EG_E, "他扔的东西会响，然后大家就听不见了。"),
  // ── 特色 ────────────────────────
  E("e_horn", "冲阵号角手", "辅助", { atk: 12, hp: 240, def: 10, res: 8, spd: 10 },
    [{ name: "冲阵号角", desc: "全体友军攻击 +10%", buff: { atkPct: 10 }, cd: 3 }],
    { weapon: "号角", armor: "皮甲", armor2: "轻便护腿", accessory: "战意徽章" }, EG_E, "一声号角，全队往前冲。"),
  E("e_drum", "破阵擂鼓手", "辅助", { atk: 12, hp: 260, def: 10, res: 8, spd: 8 },
    [{ name: "破阵鼓", desc: "全体友军伤害 +20%", buff: { dmgPct: 20 }, cd: 4 }],
    { weapon: "战鼓", armor: "藤甲护腿", armor2: "轻便护腿", accessory: "铁心吊坠" }, EG_E, "鼓点越急，士气越疯。"),
  E("e_mech", "入门机械师", "辅助", { atk: 10, hp: 220, def: 12, res: 12, spd: 9 },
    [{ name: "简易护盾", desc: "给一名友军 8% 最大生命护盾", shieldPct: 8, cd: 3 }],
    { weapon: "板手", armor: "皮甲", armor2: "灵能护腿", accessory: "秘能石" }, EG_E, "背着一箱零件，叮叮当当。"),
  E("e_mech2", "资深机械师", "辅助", { atk: 14, hp: 300, def: 16, res: 16, spd: 9 },
    [{ name: "力场护盾", desc: "给全体友军 12% 最大生命护盾", shieldPct: 12, cd: 4 }],
    { weapon: "板手", armor: "秘银轻甲", armor2: "灵能护腿", accessory: "秘能石" }, EG_E, "他造的护盾，刀砍不进、火烧不穿。"),
  // ── 首领 ────────────────────────
  E("e_chiyu", "赤羽", "首领·群攻", { atk: 40, hp: 900, def: 20, res: 12, spd: 10 },
    [{ name: "横扫", desc: "全体 120% 攻击", mult: 120, aoe: true, cd: 3 },
     { name: "呼喝", desc: "半血召唤打手", summon: "e_thug", cd: 5 }],
    { weapon: "裂地战斧", armor: "狂战皮甲", armor2: "裂痕长裤", accessory: "狂怒指环" }, EG_B, "红枫团大当家，一把战斧扫半圈。"),
  E("e_tieya", "铁牙", "首领·爆发", { atk: 50, hp: 1100, def: 24, res: 10, spd: 10 },
    [{ name: "破甲重击", desc: "单体 200% 攻击", mult: 200, cd: 3 },
     { name: "狂怒", desc: "受击 5 次后攻击 +30%", rage: 30, cd: 6 }],
    { weapon: "双刃短刀", armor: "铁壁重甲", armor2: "磐石护腿", accessory: "战意徽章" }, EG_B, "二当家，越打越兴奋。"),
  E("e_baishuang", "白霜", "首领·辅助", { atk: 36, hp: 900, def: 16, res: 20, spd: 11 },
    [{ name: "鼓舞", desc: "全体友军攻击 +20%", buff: { atkPct: 20 }, cd: 4 },
     { name: "寒霜愈合", desc: "治疗全体 25% 生命", heal: 25, cd: 4 }],
    { weapon: "净化铃", armor: "祷言圣袍", armor2: "灵能护腿", accessory: "祈愿铃" }, EG_B, "军师，从不亲自上前。"),
  E("e_fengwang", "枫王", "首领·终局", { atk: 60, hp: 1600, def: 30, res: 20, spd: 11 },
    [{ name: "号令", desc: "全体友军攻击 +15%", buff: { atkPct: 15 }, cd: 3 },
     { name: "战鼓催阵", desc: "全体友军伤害 +20%", buff: { dmgPct: 20 }, cd: 4 },
     { name: "枫落", desc: "半血狂暴并召唤流寇", rage: 40, summon: "e_thug", cd: 6 }],
    { weapon: "裂地战斧", armor: "铁壁重甲", armor2: "磐石护腿", accessory: "狂怒指环" }, EG_B, "红枫团首领，据说没人见过他全力。")
];

// ⚡ 回怒效率（每次行动获得怒气）与必杀招式（怒气 100 释放）
const ENEMY_RAGE = {
  e_thug: 25, e_brute: 22, e_soldier: 24, e_archer: 28, e_crossbow: 26,
  e_trainee_mage: 30, e_trainee_medic: 32, e_light_shield: 20, e_heavy_shield: 18, e_firebomb: 28,
  e_vet_soldier: 26, e_vet_archer: 30, e_vet_crossbow: 27, e_vet_medic: 34, e_vet_shield: 20, e_high_mage: 32, e_bomber: 29,
  e_horn: 36, e_drum: 34, e_mech: 33, e_mech2: 30,
  e_chiyu: 30, e_tieya: 33, e_baishuang: 34, e_fengwang: 31
};
const ENEMY_ULT = {
  e_thug: { name: "乱棍", desc: "单体 200% 攻击", mult: 200 },
  e_brute: { name: "狂暴冲撞", desc: "单体 220% 攻击", mult: 220 },
  e_soldier: { name: "盾墙突击", desc: "单体 190% 攻击", mult: 190 },
  e_archer: { name: "贯目箭", desc: "单体 240% 攻击", mult: 240 },
  e_crossbow: { name: "穿甲重弩", desc: "单体 260% 攻击", mult: 260, pierce: true },
  e_trainee_mage: { name: "火球术", desc: "单体 220% 法术并灼烧", mult: 220, spell: true, burn: true },
  e_trainee_medic: { name: "应急包扎", desc: "治疗全体 15% 生命", heal: 15 },
  e_light_shield: { name: "铁壁", desc: "全体获得 10% 最大生命护盾", shieldPct: 10 },
  e_heavy_shield: { name: "磐石壁垒", desc: "全体获得 15% 最大生命护盾", shieldPct: 15 },
  e_firebomb: { name: "火海", desc: "全体 140% 攻击并灼烧", mult: 140, aoe: true, burn: true },
  e_vet_soldier: { name: "连刺突袭", desc: "单体 200% 攻击 ×2", mult: 200, hits: 2 },
  e_vet_archer: { name: "万箭齐发", desc: "全体 150% 攻击", mult: 150, aoe: true },
  e_vet_crossbow: { name: "破军弩", desc: "单体 280% 攻击", mult: 280, pierce: true },
  e_vet_medic: { name: "战地圣歌", desc: "治疗全体 20% 生命", heal: 20 },
  e_vet_shield: { name: "不动如山", desc: "全体获得 20% 最大生命护盾", shieldPct: 20 },
  e_high_mage: { name: "炎爆", desc: "全体 160% 法术并灼烧", mult: 160, aoe: true, spell: true, burn: true },
  e_bomber: { name: "连环爆破", desc: "全体 170% 攻击", mult: 170, aoe: true },
  e_horn: { name: "冲锋号", desc: "全体友军攻击 +20%（3 回合）", buff: { atkPct: 20 } },
  e_drum: { name: "战意鼓", desc: "全体友军伤害 +30%（3 回合）", buff: { dmgPct: 30 } },
  e_mech: { name: "护盾发生器", desc: "全体获得 10% 最大生命护盾", shieldPct: 10 },
  e_mech2: { name: "要塞装甲", desc: "全体获得 18% 最大生命护盾", shieldPct: 18 },
  e_chiyu: { name: "血斧狂扫", desc: "全体 170% 攻击", mult: 170, aoe: true },
  e_tieya: { name: "兽性爆发", desc: "单体 300% 攻击", mult: 300 },
  e_baishuang: { name: "霜华结界", desc: "治疗全体 25% 并给 10% 护盾", heal: 25, shieldPct: 10 },
  e_fengwang: { name: "枫落九天", desc: "全体 200% 攻击并召唤流寇", mult: 200, aoe: true, summon: "e_thug" }
};

// 🏷 特性标签
const ENEMY_TAGS = {
  e_thug: ["杂兵", "近战"],
  e_brute: ["杂兵", "近战", "高攻"],
  e_soldier: ["杂兵", "近战", "均衡"],
  e_archer: ["杂兵", "远程", "高速"],
  e_crossbow: ["杂兵", "远程", "单发"],
  e_trainee_mage: ["杂兵", "法术", "灼烧"],
  e_trainee_medic: ["杂兵", "治疗"],
  e_light_shield: ["杂兵", "坦克", "护盾"],
  e_heavy_shield: ["杂兵", "坦克", "护盾", "高防"],
  e_firebomb: ["杂兵", "远程", "灼烧", "群攻"],
  e_vet_soldier: ["精英", "近战", "多段"],
  e_vet_archer: ["精英", "远程", "群攻", "高速"],
  e_vet_crossbow: ["精英", "远程", "穿透"],
  e_vet_medic: ["精英", "治疗", "群疗"],
  e_vet_shield: ["精英", "坦克", "护盾", "高防"],
  e_high_mage: ["精英", "法术", "群攻", "灼烧"],
  e_bomber: ["精英", "远程", "群攻"],
  e_horn: ["特色", "增益", "加攻"],
  e_drum: ["特色", "增益", "加伤"],
  e_mech: ["特色", "护盾"],
  e_mech2: ["特色", "护盾", "群盾"],
  e_chiyu: ["首领", "群攻", "召唤"],
  e_tieya: ["首领", "爆发", "单体"],
  e_baishuang: ["首领", "治疗", "增益", "护盾"],
  e_fengwang: ["首领", "群攻", "召唤", "增益"]
};

export function enemyById(id) { return ENEMIES.find((e) => e.id === id); }
// ⚔️ 敌人战力（与角色同一套换算）
export function enemyPower(e) {
  if (!e || !e.stats) return 0;
  const s = e.stats;
  return Math.round((s.atk || 0) * 16 + (s.hp || 0) + (s.def || 0) * 7 + (s.res || 0) * 5 +
    (s.spd || 0) * 28 + (e.critRate || 5) * 16 + (e.critDmg || 150) * 5);
}
// 🏯 关卡建议战力：该关全部敌人（含增援/波次）的战力总和
export function stagePower(stage) {
  if (!stage) return 0;
  const ids = stage.enemies && stage.enemies.length ? stage.enemies : [];
  if (!ids.length) return enemyPower({ stats: stage.foe });
  return ids.reduce((sum, id) => sum + enemyPower(enemyAt(id, stage.lv)), 0);
}
// 📊 数值重定：以「平均 Lv1 角色」为基准（攻 144 / 生 850 / 防 29 / 抗 22 / 速 11）
const ENEMY_STATS = {
  // 普通
  e_thug: { atk: 42, hp: 250, def: 13, res: 8, spd: 9 },
  e_brute: { atk: 48, hp: 305, def: 12, res: 7, spd: 8 },
  e_soldier: { atk: 38, hp: 330, def: 18, res: 10, spd: 8 },
  e_archer: { atk: 44, hp: 190, def: 9, res: 9, spd: 12 },
  e_crossbow: { atk: 52, hp: 180, def: 8, res: 8, spd: 10 },
  e_trainee_mage: { atk: 46, hp: 170, def: 7, res: 13, spd: 9 },
  e_trainee_medic: { atk: 20, hp: 240, def: 11, res: 14, spd: 10 },
  e_light_shield: { atk: 30, hp: 430, def: 26, res: 12, spd: 7 },
  e_heavy_shield: { atk: 26, hp: 560, def: 34, res: 15, spd: 6 },
  e_firebomb: { atk: 45, hp: 185, def: 8, res: 10, spd: 11 },
  // 精英
  e_vet_soldier: { atk: 70, hp: 470, def: 24, res: 12, spd: 9 },
  e_vet_archer: { atk: 76, hp: 250, def: 11, res: 11, spd: 12 },
  e_vet_crossbow: { atk: 86, hp: 240, def: 10, res: 10, spd: 10 },
  e_vet_medic: { atk: 34, hp: 310, def: 14, res: 18, spd: 10 },
  e_vet_shield: { atk: 40, hp: 780, def: 42, res: 20, spd: 6 },
  e_high_mage: { atk: 82, hp: 230, def: 8, res: 20, spd: 9 },
  e_bomber: { atk: 74, hp: 245, def: 9, res: 12, spd: 9 },
  // 特色
  e_horn: { atk: 24, hp: 300, def: 14, res: 12, spd: 11 },
  e_drum: { atk: 22, hp: 320, def: 14, res: 12, spd: 8 },
  e_mech: { atk: 18, hp: 280, def: 16, res: 15, spd: 9 },
  e_mech2: { atk: 26, hp: 380, def: 20, res: 18, spd: 9 },
  // 首领
  e_chiyu: { atk: 96, hp: 1900, def: 26, res: 16, spd: 10 },
  e_tieya: { atk: 118, hp: 1700, def: 30, res: 14, spd: 10 },
  e_baishuang: { atk: 72, hp: 1600, def: 20, res: 26, spd: 12 },
  e_fengwang: { atk: 108, hp: 2400, def: 32, res: 22, spd: 11 }
};
// 成长特色：坦克血防成长高、远程攻高血低、首领双高
const GROWTH_BY = (e) => {
  if (e.tier === "boss") return { atk: 0.08, hp: 0.095, def: 0.07, res: 0.06, spd: 0.02 };
  if (/盾|坦克/.test(e.role)) return { atk: 0.06, hp: 0.09, def: 0.075, res: 0.06, spd: 0.015 };
  if (/远程|法术/.test(e.role)) return { atk: 0.085, hp: 0.07, def: 0.055, res: 0.055, spd: 0.025 };
  if (/辅助/.test(e.role)) return { atk: 0.05, hp: 0.08, def: 0.06, res: 0.06, spd: 0.02 };
  return { atk: 0.075, hp: 0.08, def: 0.06, res: 0.05, spd: 0.02 };
};
ENEMIES.forEach((e) => {
  e.stats = Object.assign({}, e.stats, ENEMY_STATS[e.id] || {});
  e.tier = (e.role || "").indexOf("首领") >= 0 ? "boss"
    : /号角|鼓|机械/.test(e.name) ? "special"
    : /资深|高阶|爆破/.test(e.name) ? "elite" : "normal";
  e.growth = GROWTH_BY(e);
  // 🎯 固定招式结构：普攻 / 技能（部分敌人没有）/ 必杀
  const old = e.skills || [];
  const sk = old[0] || { name: "猛击", desc: "单体 130% 攻击", mult: 130, cd: 2 };
  const ult = ENEMY_ULT[e.id] || { name: "全力一击", desc: "单体 200% 攻击", mult: 200 };
  // 纯杂兵只有普攻 + 必杀，不配技能
  const NO_SKILL = { e_thug: 1, e_brute: 1, e_soldier: 1, e_archer: 1, e_crossbow: 1 };
  e.skills = NO_SKILL[e.id]
    ? [{ name: "普攻", desc: "100% 攻击", mult: 100, kind: "normal" },
       Object.assign({ kind: "ult", rage: 100 }, ult)]
    : [{ name: "普攻", desc: "100% 攻击", mult: 100, kind: "normal" },
       Object.assign({ kind: "skill" }, sk),
       Object.assign({ kind: "ult", rage: 100 }, ult)];
  e.rageGain = ENEMY_RAGE[e.id] || 25;
  e.tags = ENEMY_TAGS[e.id] || [];
  e.faction = e.camp;
});
// 按关卡等级缩放（Lv1 基准 → 目标等级）
export function enemyAt(id, lv) {
  const e = enemyById(id);
  if (!e) return null;
  const L = Math.max(1, Number(lv) || 1);
  const k = (key) => {
    const raw = (e.stats[key] || 0) * (1 + (e.growth[key] || 0) * (L - 1));
    return key === "spd" ? Math.round(raw * 10) / 10 : Math.round(raw);
  };
  return {
    id: e.id, name: e.name, camp: e.camp, role: e.role, desc: e.desc, lv: L,
    stats: { atk: k("atk"), hp: k("hp"), def: k("def"), res: k("res"), spd: k("spd"), critRate: e.critRate, critDmg: e.critDmg },
    equip: e.equip, skills: e.skills, rageGain: e.rageGain
  };
}
