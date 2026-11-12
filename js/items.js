// 闲得慌RPG v2 · 装备操作（只改数据，不碰 UI / 云端）
import { CULT } from "./data.js?v=0763b9ef";
import { uid } from "./core.js?v=8b89ef2b";
import { applyAffixes } from "./affixes.js?v=ee432832";

export const isEquip = (it) => !!(it && (it.cat === "weapon" || it.cat === "armor" || it.cat === "accessory"));
export function makeItem(cat, def) {
  const data = Object.assign({}, def, { lv: 1, star: 1 });
  try { applyAffixes(data, cat, data.rarity || "R"); } catch (e) {}
  return { id: uid("it"), cat, lock: false, data };
}
export const findItem = (store, id) => (store.items || []).find((x) => x.id === id) || null;

export function equip(store, charId, itemId) {
  const ch = (store.chars || []).find((c) => c.id === charId);
  const it = findItem(store, itemId);
  if (!ch) return { ok: false, why: "没有这个角色" };
  if (!it) return { ok: false, why: "装备不在仓库" };
  if (!isEquip(it)) return { ok: false, why: "这不是装备" };
  const old = ch.equip[it.cat];
  store.items = store.items.filter((x) => x.id !== itemId);
  if (old) store.items.push({ id: uid("it"), cat: it.cat, lock: false, data: old });
  ch.equip[it.cat] = it.data;
  return { ok: true };
}

export function unequip(store, charId, kind) {
  const ch = (store.chars || []).find((c) => c.id === charId);
  if (!ch || !ch.equip[kind]) return { ok: false, why: "这里没有装备" };
  store.items.push({ id: uid("it"), cat: kind, lock: false, data: ch.equip[kind] });
  ch.equip[kind] = null;
  return { ok: true };
}

export function cultCheck(it, kind, store) {
  const d = it && it.data;
  if (!d) return { ok: false, why: "没有数据" };
  if (kind === "level") {
    const lv = Number(d.lv) || 1;
    if (lv >= CULT.maxLevel) return { ok: false, why: "已满强化" };
    const needBreak = CULT.breakNodes.indexOf(lv) >= 0;
    return {
      ok: true, to: lv + 1,
      gold: CULT.gold(lv), stone: CULT.stone(lv),
      breakStone: needBreak ? CULT.breakStone[lv] : 0
    };
  }
  if (kind === "star") {
    if ((Number(d.star) || 1) >= CULT.maxStar) return { ok: false, why: "已满星" };
    return { ok: true, to: (Number(d.star) || 1) + 1, shards: CULT.starShards(Number(d.star) || 1) };
  }
  return { ok: false, why: "未知类型" };
}

export function cultApply(store, it, kind) {
  const chk = cultCheck(it, kind, store);
  if (!chk.ok) return chk;
  store.flags = store.flags || {};
  if (kind === "level") {
    if ((store.gold || 0) < chk.gold) return { ok: false, why: "金币不够" };
    const stone = Number(store.flags.stone) || 0;
    if (stone < chk.stone) return { ok: false, why: "强化石不够" };
    if (chk.breakStone && (Number(store.flags.bstone) || 0) < chk.breakStone) return { ok: false, why: "突破石不够" };
    store.gold -= chk.gold;
    store.flags.stone = stone - chk.stone;
    if (chk.breakStone) store.flags.bstone = (Number(store.flags.bstone) || 0) - chk.breakStone;
    it.data.lv = chk.to;
    return { ok: true, lv: it.data.lv };
  }
  it.data.star = chk.to;
  return { ok: true, star: it.data.star };
}

// 🔁 装备继承：把「源装备」的培养（等级/星级）搬到「目标装备」，源回到 Lv1/1★
//   条件：同部位、目标培养不高于源、金币足够
export function inheritCost(fromIt, toIt) {
  const fl = Number(fromIt.data.lv) || 1, tl = Number(toIt.data.lv) || 1;
  const fs2 = Number(fromIt.data.star) || 1, ts = Number(toIt.data.star) || 1;
  const dl = Math.max(0, fl - tl), ds = Math.max(0, fs2 - ts);
  return { dl, ds, gold: dl * 20 + ds * 200 };
}
export function inheritCheck(store, fromId, toId) {
  const a = findItem(store, fromId), b = findItem(store, toId);
  if (!a || !b) return { ok: false, why: "找不到装备" };
  if (a.cat !== b.cat) return { ok: false, why: "只能同部位继承（武器→武器）" };
  if (a.lock || b.lock) return { ok: false, why: "有装备被锁定，先解锁" };
  const c = inheritCost(a, b);
  if (c.dl <= 0 && c.ds <= 0) return { ok: false, why: "目标已经不比源低" };
  if ((Number(store.gold) || 0) < c.gold) return { ok: false, why: "金币不够（需要 " + c.gold + "）" };
  return { ok: true, cost: c };
}
export function inheritApply(store, fromId, toId) {
  const chk = inheritCheck(store, fromId, toId);
  if (!chk.ok) return chk;
  const a = findItem(store, fromId), b = findItem(store, toId);
  const c = chk.cost;
  store.gold -= c.gold;
  b.data.lv = Math.max(Number(b.data.lv) || 1, Number(a.data.lv) || 1);
  b.data.star = Math.max(Number(b.data.star) || 1, Number(a.data.star) || 1);
  a.data.lv = 1;
  a.data.star = 1;
  return { ok: true, gold: c.gold, lv: b.data.lv, star: b.data.star };
}

export function dismantle(store, itemId) {
  const it = findItem(store, itemId);
  if (!it) return { ok: false, why: "找不到" };
  if (it.lock) return { ok: false, why: "已锁定，先解锁" };
  const d = it.data || {};
  const stone = Math.max(2, Math.round((Number(d.lv) || 1) * 0.6));
  const shards = Math.max(1, Math.round((Number(d.star) || 1) * 2));
  store.items = store.items.filter((x) => x.id !== itemId);
  store.flags = store.flags || {};
  store.flags.stone = (Number(store.flags.stone) || 0) + stone;
  store.flags.shards = (Number(store.flags.shards) || 0) + shards;
  return { ok: true, stone, shards };
}

export function sellPrice(it) {
  const d = (it && it.data) || {};
  return Math.round((40 + (Number(d.lv) || 1) * 6 + ((Number(d.star) || 1) - 1) * 60) * 0.5);
}
export function sell(store, itemId) {
  const it = findItem(store, itemId);
  if (!it) return { ok: false, why: "找不到" };
  if (it.lock) return { ok: false, why: "已锁定，先解锁" };
  const price = sellPrice(it);
  store.items = store.items.filter((x) => x.id !== itemId);
  store.gold = (Number(store.gold) || 0) + price;
  return { ok: true, price };
}
