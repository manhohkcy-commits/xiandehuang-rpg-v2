import { cloudGet, cloudSave } from "./core.js?v=13807141";

// 🧑‍💻 主机端原创角色（由设计器导出，加到游戏里）
// 字段：id, name, title, role, rare, camp("enemy"|"ally"), desc, gear, notes,
//       basic{hp,atk,def,res}, spec{str,int,tech,agi}, stats{atk,hp,def,res,spd,critRate,critDmg,power}
export const ORIGINALS = [];

// ☁️ 云端原创角色：主机发布，全玩家拉取（失败时用本地空数组兜底）
const ORIGINALS_BOX = "__originals";
export async function pullOriginals() {
  try {
    const r = await cloudGet(ORIGINALS_BOX);
    const list = r && r.store && r.store.originals;
    if (Array.isArray(list) && list.length) {
      ORIGINALS.length = 0;
      list.forEach((o) => ORIGINALS.push(o));
    }
  } catch (e) {}
  return ORIGINALS;
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
