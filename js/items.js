// 闲得慌RPG v2 · 装备操作（只改数据，不碰 UI / 云端）
import { CULT, RARITY_MULT } from "./data.js?v=feee8c61";
import { uid } from "./core.js?v=13807141";
import { applyAffixes } from "./affixes.js?v=ee432832";

export const isEquip = (it) => !!(it && (it.cat === "weapon" || it.cat === "armor" || it.cat === "accessory"));
export function makeItem(cat, def) {
  const data = Object.assign({}, def, { lv: 1, star: 1, born: def.rarity });
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
  // 🛡 防具按身体部位分格：上装 → armor，下装 → armor2
  let slot = it.cat;
  if (it.cat === "armor") {
    slot = (it.data.part === "bottom") ? "armor2" : "armor";
    const other = slot === "armor" ? "armor2" : "armor";
    if (ch.equip[other] && ch.equip[other].id === it.data.id) {
      return { ok: false, why: "同一件装备不能重复穿" };
    }
  }
  const old = ch.equip[slot];
  store.items = store.items.filter((x) => x.id !== itemId);
  if (old) store.items.push({ id: uid("it"), cat: slot, lock: false, data: old });
  ch.equip[slot] = it.data;
  return { ok: true };
}

export function unequip(store, charId, kind) {
  const ch = (store.chars || []).find((c) => c.id === charId);
  if (!ch || !ch.equip[kind]) return { ok: false, why: "这里没有装备" };
  store.items.push({ id: uid("it"), cat: kind, lock: false, data: ch.equip[kind] });
  ch.equip[kind] = null;
  return { ok: true };
}

// 🔧 精炼：只提升随机词条（每级 +8%），消耗金币 + 碎片
export function refineCheck(it, store) {
  const d = it && it.data;
  if (!d) return { ok: false, why: "没有装备" };
  const r = Number(d.refine) || 1;
  if (r >= CULT.maxRefine) return { ok: false, why: "精炼已满" };
  const gold = CULT.refineGold(r), shards = CULT.refineShards(r);
  if ((Number(store.gold) || 0) < gold) return { ok: false, why: "金币不够", gold, shards };
  if ((Number((store.flags || {}).shards) || 0) < shards) return { ok: false, why: "碎片不够", gold, shards };
  return { ok: true, gold, shards, next: r + 1 };
}
export function refineApply(store, it) {
  const c = refineCheck(it, store);
  if (!c.ok) return c;
  store.gold = (Number(store.gold) || 0) - c.gold;
  store.flags = store.flags || {};
  store.flags.shards = (Number(store.flags.shards) || 0) - c.shards;
  it.data.refine = c.next;
  return { ok: true, refine: c.next };
}

// ⬆️ 升阶 / 觉醒
//    R/SR 5★ → 升下一品质（保持 5★）
//    SSR 5★ → 觉醒 → UR 1🔥（保留 5★ 强度）
//    UR 1🔥 → 觉醒 → UR 5🔥（满）
export function promoteCheck(it, store) {
  const d = it && it.data;
  if (!d) return { ok: false, why: "没有装备" };
  const haveS = Number((store.flags || {}).shards) || 0;
  const haveG = Number(store.gold) || 0;
  const check = (cost, extra) => {
    if (haveS < cost.shards) return { ok: false, why: "碎片不够", shards: cost.shards, gold: cost.gold, ...extra };
    if (haveG < cost.gold) return { ok: false, why: "金币不够", shards: cost.shards, gold: cost.gold, ...extra };
    return { ok: true, shards: cost.shards, gold: cost.gold, ...extra };
  };

  if (d.rarity === "UR") {
    const fire = Number(d.fire) || 1;
    if (fire >= (CULT.maxFire || 5)) return { ok: false, why: "已达 UR5🔥" };
    const nextFire = fire + 1;
    const cost = (CULT.awakenFire || {})[nextFire] || { shards: 0, gold: 0 };
    return check(cost, { action: "awakenFire", next: "UR", fire: nextFire, label: "觉醒 → UR" + nextFire + "🔥" });
  }

  if ((Number(d.star) || 1) < 5) return { ok: false, why: "先升到 5★ 才能升阶" };
  const order = CULT.rarityOrder || ["R", "SR", "SSR", "UR"];
  const i = order.indexOf(d.rarity);
  if (i < 0 || i >= order.length - 1) return { ok: false, why: "已是最高品质" };
  const next = order[i + 1];
  if (next === "UR") {
    // SSR5⭐ → 升阶 → UR1🔥（这一步是升阶，不是觉醒）
    const cost = (CULT.promote || {}).UR || { shards: 1200, gold: 18000 };
    return check(cost, { action: "promote", next: "UR", fire: 1, label: "升阶 → UR1🔥" });
  }
  const cost = (CULT.promote || {})[next] || { shards: 0, gold: 0 };
  return check(cost, { action: "promote", next, fire: 0, label: "升阶 → " + next });
}

export function promoteApply(store, it) {
  const c = promoteCheck(it, store);
  if (!c.ok) return c;
  store.flags = store.flags || {};
  store.flags.shards = (Number(store.flags.shards) || 0) - c.shards;
  store.gold = (Number(store.gold) || 0) - c.gold;
  // ⬜ 只有「升阶」给白值；觉醒（火数）不给
  if (c.action === "promote") {
    const g = ((CULT.flatGain || {}).promote || {})[it.cat] || {};
    if (Object.keys(g).length) {
      it.data.flat = it.data.flat || {};
      Object.keys(g).forEach((k) => { it.data.flat[k] = (Number(it.data.flat[k]) || 0) + g[k]; });
    }
  }
  const oldRarity = it.data.rarity;
  it.data.rarity = c.next;
  // ⬆️ 升阶缩放：底子 = 当前基础 ÷ 旧系数，升阶后 = 底子 × 新系数
  if (c.action === "promote" && it.data.main) {
    const oldRm = RARITY_MULT[oldRarity] || 1;
    const newRm = RARITY_MULT[c.next] || 1;
    Object.keys(it.data.main).forEach((k) => {
      const base0 = (Number(it.data.main[k]) || 0) / oldRm;
      it.data.main[k] = Math.round(base0 * newRm * 10) / 10;
    });
  }
  it.data.star = 5;
  if (c.next === "UR" && c.fire) it.data.fire = c.fire;
  return { ok: true, next: c.next, fire: c.fire, action: c.action };
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
