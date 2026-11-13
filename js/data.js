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
import { enemyAt } from "./enemies.js?v=bd80e1b4";
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
      gold: r.gold, exp: r.exp,
      foe: foeOf(foeName, lv, 1 + Math.floor(i / 10) * 0.15),
      drop: Object.assign({ shards: [0, 0], stone: [0, 0], bstone: 0, gearChance: 0, manuscript: 0, medal: 0, medalChance: 0 }, r.drop)
    };
  });
  return { id, name, kind, icon, desc, type: "daily", stages };
}
// 🍁 经验本 · 红枫团（20 关，敌人按 Lv1 模板缩放）
const REDMAPLE_PLAN = [
  [5, ["e_thug"], 120],
  [9, ["e_thug", "e_archer"], 142],
  [13, ["e_archer", "e_archer"], 168],
  [17, ["e_brute", "e_soldier"], 198],
  [21, ["e_vet_soldier", "e_trainee_medic"], 470],
  [25, ["e_soldier", "e_soldier", "e_crossbow"], 276],
  [29, ["e_trainee_mage", "e_archer", "e_archer"], 326],
  [33, ["e_light_shield", "e_thug", "e_thug"], 385],
  [37, ["e_crossbow", "e_crossbow", "e_trainee_mage"], 454],
  [41, ["e_chiyu", "e_thug", "e_thug"], 1072],
  [45, ["e_heavy_shield", "e_soldier", "e_soldier"], 632],
  [49, ["e_firebomb", "e_archer", "e_archer"], 746],
  [53, ["e_vet_shield", "e_vet_soldier", "e_archer"], 880],
  [57, ["e_vet_archer", "e_high_mage", "e_crossbow"], 1038],
  [61, ["e_tieya", "e_vet_soldier", "e_vet_soldier", "e_trainee_medic"], 2450],
  [65, ["e_vet_medic", "e_vet_shield", "e_vet_soldier", "e_vet_soldier"], 1445],
  [69, ["e_bomber", "e_vet_crossbow", "e_vet_crossbow", "e_high_mage"], 1705],
  [73, ["e_baishuang", "e_vet_soldier", "e_vet_soldier", "e_vet_shield"], 2012],
  [77, ["e_thug", "e_brute", "e_soldier", "e_archer", "e_crossbow", "e_trainee_mage", "e_firebomb", "e_light_shield"], 2374],
  [80, ["e_fengwang", "e_vet_shield", "e_vet_shield", "e_high_mage", "e_drum", "e_horn", "e_vet_soldier", "e_vet_soldier"], 5602]
];
function makeRedmaple() {
  const STAGE_TITLE = { 8: "双弩手", 18: "杂兵乱战", 19: "枫王·终局" };
  const stages = REDMAPLE_PLAN.map(([lv, ids, exp], i) => {
    const first = enemyAt(ids[0], lv);
    return {
      id: "exp_" + (i + 1), name: "第 " + (i + 1) + " 关 · " + (STAGE_TITLE[i] || first.name), lv,
      group: Math.floor(i / 5) + 1, milestone: (i + 1) % 5 === 0,
      enemies: ids, gold: Math.round(exp * 0.25), exp,
      foe: { name: first.name, lv, hp: first.stats.hp, atk: first.stats.atk, def: first.stats.def, res: first.stats.res, spd: first.stats.spd },
      drop: { shards: [0, 0], stone: [0, 0], bstone: 0, gearChance: 0, manuscript: 0, medal: 0, medalChance: 0 }
    };
  });
  return { id: "d_exp", name: "红枫团", kind: "exp", icon: "🍁", desc: "盘踞枫林的山贼佣兵团，练级首选", type: "daily", stages };
}
export const DUNGEONS = [
  makeRedmaple(),
  makeDaily("d_gold", "旧金库", "gold", "💰", "大量金币", "守财奴"),
  makeDaily("d_char", "修行洞窟", "char", "🧬", "角色突破素材", "洞窟守卫"),
  makeDaily("d_gear", "废弃矿脉", "gear", "⚒️", "装备强化素材", "矿脉蠕虫"),
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
  breakNodes: [25, 50, 75, 100, 125, 150],
  breakStone: { 25: 18, 50: 45, 75: 75, 100: 115, 125: 165, 150: 230 },
  gold: (lv) => Math.round(2 * lv * tier(lv)),
  stone: (lv) => Math.ceil((lv / 4) * tier(lv)),
  maxStar: 5,
  starShards: (star) => Math.round(10 * Math.pow(2, star - 1)),
  // 🔧 精炼：只提升随机词条数值（每级 +8%）
  maxRefine: 10,
  refineGold: (r) => Math.round(120 * r),
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
  specPoints: 24, specCap: 24,                    // 力量/智力/技巧/敏捷（建角上限 = 总点数）
  specLevelCap: 70,                              // 升级追加的专精点，每项最多 70（单项总上限 = 24 + 70 = 94）
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
  weapon: { R: 500, SR: 1250, SSR: 2700, UR: 6500 },
  armor: { R: 450, SR: 1100, SSR: 2300, UR: 5300 },
  accessory: { R: 400, SR: 950, SSR: 2100, UR: 5000 }
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
