// 闲得慌RPG v2 · 核心（存档 / 云端 / 工具）
export const CLOUD = { url: "https://xyrjcmavaxystoojimjh.supabase.co", key: "sb_publishable_Wqa6Uy_2qEEG0frCrftV7Q_6mNo6Vzv" };
export const now = () => Date.now();
export const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const uid = (p = "id") => p + "_" + now().toString(36) + Math.random().toString(36).slice(2, 6);
export const fmt = (n) => Math.round(Number(n) || 0).toLocaleString("en-US");

export function newStore() {
  return { v: 2, gold: 0, exp: 0, items: [], chars: [], activeChar: "", mail: [], receipts: [], flags: {}, __at: 0, __by: "" };
}
export function newChar(name) {
  return {
    id: uid("char"), name: String(name || "无名"), lv: 1, exp: 0,
    str: 10, agi: 5, intel: 0, tech: 0,
    equip: { weapon: null, armor: null, accessory: null },
    talent: { path: "", points: {} }
  };
}
export function validateStore(st) {
  const e = [];
  if (!st || typeof st !== "object") return ["不是对象"];
  if (Number(st.v) !== 2) e.push("版本不是 2");
  if (!Array.isArray(st.items)) e.push("items 不是数组");
  if (!Array.isArray(st.chars)) e.push("chars 不是数组");
  (st.items || []).forEach((it, i) => { if (!it || !it.id) e.push("第 " + (i + 1) + " 件物品缺 id"); });
  return e;
}

const H = () => ({ apikey: CLOUD.key, Authorization: "Bearer " + CLOUD.key, "Content-Type": "application/json" });

export async function cloudGet(box) {
  const r = await fetch(CLOUD.url + "/rest/v1/slots?box=eq." + encodeURIComponent(box) + "&select=*", { headers: H() });
  const j = await r.json();
  return (Array.isArray(j) && j[0]) || null;
}

export async function cloudSave(box, store, updatedAt, name) {
  const bad = validateStore(store);
  if (bad.length) throw new Error("存档结构不合法：" + bad.join("；"));
  const body = { store, updated_at: new Date().toISOString() };
  if (name) body.name = name;
  const base = CLOUD.url + "/rest/v1/slots?box=eq." + encodeURIComponent(box) + (updatedAt ? "&updated_at=eq." + encodeURIComponent(updatedAt) : "");
  const r = await fetch(base, {
    method: updatedAt ? "PATCH" : "POST",
    headers: Object.assign({ Prefer: "return=representation" }, H()),
    body: JSON.stringify(updatedAt ? body : Object.assign({ box }, body))
  });
  const j = await r.json().catch(() => null);
  if (!Array.isArray(j) || !j.length) return { ok: false, reason: "写入未生效（冲突或权限）" };
  return { ok: true, row: j[0] };
}

export function addReceipt(store, kind, title, opts = {}) {
  if (!Array.isArray(store.receipts)) store.receipts = [];
  store.receipts.push({
    id: uid("rc"), at: now(), kind, title,
    gold: Number(opts.gold) || 0, goldAfter: Number(store.gold) || 0,
    items: opts.items || [], note: opts.note || ""
  });
  if (store.receipts.length > 200) store.receipts = store.receipts.slice(-200);
}

// 🔐 口令哈希（只存哈希，不存明文）
export async function hashPw(text) {
  const raw = "rpg2|" + String(text || "");
  try {
    if (globalThis.crypto && crypto.subtle) {
      const buf = new TextEncoder().encode(raw);
      const dig = await crypto.subtle.digest("SHA-256", buf);
      return Array.from(new Uint8Array(dig)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch (e) {}
  // 兜底（非安全环境）：简单散列，仅防手滑
  let h = 5381;
  for (let i = 0; i < raw.length; i++) h = ((h << 5) + h + raw.charCodeAt(i)) | 0;
  return "w" + (h >>> 0).toString(16);
}

// 🔐 统一入口校验：读存档 + 口令门禁
//   返回 { ok, store, updatedAt, reason }
//   opts.askSet = true 时，若该位号还没口令，会问要不要设置
export async function gateLoad(box, opts = {}) {
  if (!box) return { ok: false, reason: "缺 box" };
  let row = null;
  try { row = await cloudGet(box); } catch (e) { return { ok: false, reason: "云同步不可用：" + e.message }; }
  const cached = cacheLoad(box);
  if (!row || !row.store) {
    if (cached && Number(cached.store.v) === 2) return { ok: true, store: cached.store, updatedAt: "", offline: true };
    return { ok: false, reason: "没有存档" };
  }
  const st = row.store;
  if (Number(st.v) !== 2) return { ok: false, reason: "旧版存档" };
  const pw = st.__pw || "";
  if (pw) {
    for (let i = 0; i < 3; i++) {
      const input = prompt("「" + box + "」已设口令，请输入（错 3 次会锁）");
      if (input == null) return { ok: false, reason: "已取消" };
      if ((await hashPw(input)) === pw) return { ok: true, store: st, updatedAt: row.updated_at || "" };
      alert("口令不对，还有 " + (2 - i) + " 次");
    }
    return { ok: false, reason: "口令错误" };
  }
  if (opts.askSet && confirm("这个位号还没设口令，是否现在设置？（推荐）")) {
    const p1 = prompt("设置口令（4~20 位）");
    if (p1 && p1.length >= 4) {
      st.__pw = await hashPw(p1);
      try { await cloudSave(box, st, row.updated_at || null); } catch (e) {}
      alert("口令已设置，请记牢（忘记无法找回）");
    }
  }
  return { ok: true, store: st, updatedAt: row.updated_at || "" };
}

export function cacheSave(box, store) {
  try { localStorage.setItem("rpg2:" + box, JSON.stringify({ at: now(), store })); } catch (e) {}
}
export function cacheLoad(box) {
  try {
    const raw = localStorage.getItem("rpg2:" + box);
    if (!raw) return null;
    const o = JSON.parse(raw);
    return o && o.store ? o : null;
  } catch (e) { return null; }
}
