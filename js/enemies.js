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
    [{ name: "简易护盾", desc: "给一名友军 60 点护盾", shield: 60, cd: 3 }],
    { weapon: "板手", armor: "皮甲", armor2: "灵能护腿", accessory: "秘能石" }, EG_E, "背着一箱零件，叮叮当当。"),
  E("e_mech2", "资深机械师", "辅助", { atk: 14, hp: 300, def: 16, res: 16, spd: 9 },
    [{ name: "力场护盾", desc: "给全体友军 140 点护盾", shield: 140, cd: 4 }],
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

export function enemyById(id) { return ENEMIES.find((e) => e.id === id); }
// 按关卡等级缩放（Lv1 基准 → 目标等级）
export function enemyAt(id, lv) {
  const e = enemyById(id);
  if (!e) return null;
  const L = Math.max(1, Number(lv) || 1);
  const k = (key) => Math.round((e.stats[key] || 0) * (1 + (e.growth[key] || 0) * (L - 1)) * 10) / 10;
  return {
    id: e.id, name: e.name, camp: e.camp, role: e.role, desc: e.desc, lv: L,
    stats: { atk: k("atk"), hp: k("hp"), def: k("def"), res: k("res"), spd: k("spd"), critRate: e.critRate, critDmg: e.critDmg },
    equip: e.equip, skills: e.skills
  };
}
