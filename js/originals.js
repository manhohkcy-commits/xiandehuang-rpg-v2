// 🧑‍💻 主机端原创角色（由设计器导出，加到游戏里）
// 字段：id, name, title, role, rare, camp("enemy"|"ally"), desc, gear, notes,
//       basic{hp,atk,def,res}, spec{str,int,tech,agi}, stats{atk,hp,def,res,spd,critRate,critDmg,power}
export const ORIGINALS = [
  // 示例（正式内容请用设计器导出后覆盖）：
  // { id: "o_sample", name: "灰烬", title: "不眠的守夜人", role: "守护", rare: false, camp: "enemy",
  //   desc: "…", gear: "灰烬之刃 — …", notes: "",
  //   basic: { hp: 15, atk: 15, def: 15, res: 15 }, spec: { str: 9, int: 9, tech: 9, agi: 9 },
  //   stats: { atk: 132, hp: 900, def: 42, res: 30, spd: 14, critRate: 8, critDmg: 150, power: 4200 } }
];

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
