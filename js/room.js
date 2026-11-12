// ═══════════════════════════════════════════════════════════
//  闲得慌RPG v2 · 房间（联机第 1 步：建房 / 加入 / 准备）
//  房间存在 slots 的 __room__<房号> 位号里；这里只做读写与合并
// ═══════════════════════════════════════════════════════════
import { CLOUD, now, uid } from "./core.js?v=13807141";

const H = () => ({ apikey: CLOUD.key, Authorization: "Bearer " + CLOUD.key, "Content-Type": "application/json" });
const boxOf = (room) => "__room__" + room;

export function newRoomId() {
  return Math.random().toString(36).slice(2, 8);
}

export function emptyRoom(id, hostBox, hostName) {
  return {
    v: 2,
    room: id,
    phase: "waiting",
    host: hostBox,
    mode: "pve",
    stage: "k1",
    members: { [hostBox]: { name: hostName || "房主", side: "A", ready: true } },
    state: null,
    seq: 1,
    updatedAt: now()
  };
}

export async function getRoom(id) {
  const r = await fetch(CLOUD.url + "/rest/v1/slots?box=eq." + encodeURIComponent(boxOf(id)) + "&select=store,updated_at", { headers: H() });
  const j = await r.json();
  const row = Array.isArray(j) && j[0];
  if (!row || !row.store) return null;
  return { room: row.store, updatedAt: row.updated_at };
}

export async function putRoom(room, updatedAt) {
  room.updatedAt = now();
  room.seq = (Number(room.seq) || 0) + 1;
  const body = { store: room, updated_at: new Date().toISOString() };
  if (!updatedAt) {
    const r = await fetch(CLOUD.url + "/rest/v1/slots", {
      method: "POST",
      headers: Object.assign({ Prefer: "return=representation" }, H()),
      body: JSON.stringify(Object.assign({ box: boxOf(room.room) }, body))
    });
    const j = await r.json().catch(() => null);
    return Array.isArray(j) && j.length ? { ok: true, updatedAt: j[0].updated_at } : { ok: false, reason: "建房失败（房号已被占用？）" };
  }
  const r = await fetch(CLOUD.url + "/rest/v1/slots?box=eq." + encodeURIComponent(boxOf(room.room)) + "&updated_at=eq." + encodeURIComponent(updatedAt), {
    method: "PATCH",
    headers: Object.assign({ Prefer: "return=representation" }, H()),
    body: JSON.stringify(body)
  });
  const j = await r.json().catch(() => null);
  return Array.isArray(j) && j.length ? { ok: true, updatedAt: j[0].updated_at } : { ok: false, reason: "写入冲突，别人刚改过，重试一次" };
}

export async function createRoom(hostBox, hostName) {
  const id = newRoomId();
  const room = emptyRoom(id, hostBox, hostName);
  const r = await putRoom(room, null);
  return r.ok ? { ok: true, id, room } : r;
}

export async function joinRoom(id, box, name) {
  const got = await getRoom(id);
  if (!got) return { ok: false, reason: "房间不存在" };
  const room = got.room;
  if (room.phase === "fighting") return { ok: false, reason: "已经开打了" };
  if (Object.keys(room.members || {}).length >= 4 && !room.members[box]) return { ok: false, reason: "房间满了（最多 4 人）" };
  room.members = room.members || {};
  room.members[box] = room.members[box] || { name: name || "玩家", side: "B", ready: false };
  const r = await putRoom(room, got.updatedAt);
  return r.ok ? { ok: true, room } : r;
}

export async function setReady(id, box, ready) {
  const got = await getRoom(id);
  if (!got) return { ok: false, reason: "房间不存在" };
  const room = got.room;
  if (room.members && room.members[box]) room.members[box].ready = !!ready;
  const r = await putRoom(room, got.updatedAt);
  return r.ok ? { ok: true, room } : r;
}

export async function leaveRoom(id, box) {
  const got = await getRoom(id);
  if (!got) return { ok: false, reason: "房间不存在" };
  const room = got.room;
  if (room.members) delete room.members[box];
  if (room.host === box) {
    // 房主退出：把房主交给下一个成员，没人就解散
    const rest = Object.keys(room.members || {});
    if (!rest.length) {
      await fetch(CLOUD.url + "/rest/v1/slots?box=eq." + encodeURIComponent(boxOf(id)), { method: "DELETE", headers: H() });
      return { ok: true, closed: true };
    }
    room.host = rest[0];
  }
  const r = await putRoom(room, got.updatedAt);
  return r.ok ? { ok: true, room } : r;
}

// ── 单位归属：房主 = me，第一个客人 = foe，其余观战 ──
export function assignOwners(room) {
  const boxes = Object.keys(room.members || {});
  const host = room.host;
  const guests = boxes.filter((b) => b !== host);
  room.owners = { me: host, foe: guests[0] || null };
  room.spectators = boxes.filter((b) => b !== host && b !== guests[0]);
  return room;
}

export function myUnitOf(room, box) {
  const o = room.owners || {};
  if (o.me === box) return "me";
  if (o.foe === box) return "foe";
  return null;
}

// ── 多人（2v2 / 3v3）：把成员排成两方，生成建战用的单位表 ──
//   room.members[box] = { name, side:'A'|'B', ready, char:{lv,atk,hp,def,res,spd,critRate,critDmg,dmgCut,weapon} }
export function buildUnits(room, maxPerSide = 6) {
  const boxes = Object.keys(room.members || {});
  const A = [], B = [];
  boxes.forEach((bx) => {
    const m = room.members[bx] || {};
    const side = m.side === "B" ? B : A;
    if (side.length < maxPerSide) side.push({ box: bx, m });
  });
  // 人少的挪一半过去，保证两边都有人
  while (!B.length && A.length > 1) B.push(A.pop());
  const units = [];
  const owners = {};
  [["A", A, "a"], ["B", B, "b"]].forEach(([side, team, prefix]) => {
    team.forEach((x, i) => {
      const c = (x.m && x.m.char) || {};
      const id = prefix + (i + 1);
      units.push({
        id, name: (x.m && x.m.name) || ("玩家" + (i + 1)), side,
        lv: Number(c.lv) || 1,
        hp: Number(c.hp) || 500, maxHp: Number(c.hp) || 500,
        atk: Number(c.atk) || 60, def: Number(c.def) || 20, res: Number(c.res) || 15,
        spd: Number(c.spd) || 10, critRate: Number(c.critRate) || 5, critDmg: Number(c.critDmg) || 150,
        dmgCut: Number(c.dmgCut) || 0, rage: 0,
        traits: c.traits || {},
        weapon: c.weapon || null
      });
      owners[id] = x.box;
    });
  });
  room.owners = owners;
  room.unitCount = units.length;
  return { units, owners };
}

export function unitOfPlayer(room, box) {
  const o = room.owners || {};
  const hit = Object.keys(o).filter((k) => o[k] === box);
  return hit.length ? hit[0] : null;
}

// 🧹 清理过期房间：默认 2 小时没更新的 __room__ 位号直接删
export async function cleanupRooms(maxAgeHours = 2) {
  const r = await fetch(CLOUD.url + "/rest/v1/slots?box=like.__room__*&select=box,updated_at", { headers: H() });
  const rows = await r.json();
  const cut = Date.now() - maxAgeHours * 3600 * 1000;
  const dead = (Array.isArray(rows) ? rows : []).filter((x) => new Date(x.updated_at).getTime() < cut);
  let deleted = 0;
  for (const x of dead) {
    const d = await fetch(CLOUD.url + "/rest/v1/slots?box=eq." + encodeURIComponent(x.box), { method: "DELETE", headers: H() });
    if (d.ok) deleted++;
  }
  return { checked: (rows || []).length, deleted, dead };
}

// 轮询：客户端每 400ms 调一次，seq 变了就重绘
export function changed(prevSeq, room) {
  return (Number(room && room.seq) || 0) !== (Number(prevSeq) || 0);
}

// ── 步 4：客户端出手（intent 提交）─────────────────────
export async function pushIntent(id, intent) {
  const got = await getRoom(id);
  if (!got) return { ok: false, reason: "房间不存在" };
  const room = got.room;
  room.intents = Array.isArray(room.intents) ? room.intents.slice(-10) : [];
  const seq = (Number(room.seq) || 0) + 1;
  room.intents.push(Object.assign({ seq, at: now() }, intent));
  const r = await putRoom(room, got.updatedAt);
  return r.ok ? { ok: true } : r;
}

// 房主：取出「还没处理过的」intent
export async function takeIntents(id, lastHandled) {
  const got = await getRoom(id);
  if (!got) return { ok: false, reason: "房间不存在" };
  const room = got.room;
  const list = (room.intents || []).filter((x) => Number(x.seq) > Number(lastHandled || 0));
  return { ok: true, room, updatedAt: got.updatedAt, intents: list };
}

// 房主：处理完把 intent 清掉（避免重复执行）
export async function clearIntents(id, updatedAt) {
  const got = await getRoom(id);
  if (!got) return { ok: false, reason: "房间不存在" };
  const room = got.room;
  room.intents = [];
  const r = await putRoom(room, got.updatedAt);
  return r.ok ? { ok: true, updatedAt: r.updatedAt } : r;
}
