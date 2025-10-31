const LS = {
  get(k, fb = null) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fb;
    } catch {
      return fb;
    }
  },
  set(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  },
  del(k) {
    localStorage.removeItem(k);
  },
};

export const KEYS = {
  settings: "app:settings",
  persona: "app:persona:selected",
  sessions: "app:sessions:index",
  sessionPrefix: "session:",
};

const DEFAULTS = {
  theme: document.documentElement.dataset.theme || "dark",
  lang: document.documentElement.lang || "tr",
  saveHistory: true,
};

export function loadSettings() {
  return { ...DEFAULTS, ...LS.get(KEYS.settings, {}) };
}
export function saveSettings(s) {
  LS.set(KEYS.settings, s);
  document.documentElement.dataset.theme = s.theme;
  document.documentElement.lang = s.lang;
}

export function setSelectedPersona(p) {
  LS.set(KEYS.persona, p);
}
export function getSelectedPersona() {
  return LS.get(KEYS.persona, null);
}

export function upsertSessionIndex(item) {
  const list = LS.get(KEYS.sessions, []);
  const i = list.findIndex((x) => x.id === item.id);
  if (i >= 0) list[i] = item;
  else list.unshift(item);
  LS.set(KEYS.sessions, list);
  return list;
}
export function getSessionIndex() {
  return LS.get(KEYS.sessions, []);
}
export function saveSession(id, data) {
  LS.set(KEYS.sessionPrefix + id, data);
}
export function loadSession(id) {
  return LS.get(KEYS.sessionPrefix + id, null);
}
export function deleteAllSessions() {
  Object.keys(localStorage).forEach((k) => {
    if (k.startsWith(KEYS.sessionPrefix)) localStorage.removeItem(k);
  });
  LS.del(KEYS.sessions);
}

// src/services/storage.js
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("kullanicilar") || "[]");
  } catch {
    return [];
  }
}
export function saveUsers(list) {
  localStorage.setItem("kullanicilar", JSON.stringify(list || []));
}

export function setCurrentUserEmail(email) {
  if (email) localStorage.setItem("currentUserEmail", email);
  else localStorage.removeItem("currentUserEmail");
  // header vb. yerleri güncelle
  window.dispatchEvent(new CustomEvent("auth:update"));
}
export function getCurrentUser() {
  const email = localStorage.getItem("currentUserEmail");
  if (!email) return null;
  return getUsers().find((u) => u.email === email) || null;
}
export function signOut() {
  localStorage.removeItem("currentUserEmail");
  window.dispatchEvent(new CustomEvent("auth:update"));
}

export function buildInitials(first, last) {
  const a = (first || "").trim(),
    b = (last || "").trim();
  const i1 = a ? a[0].toUpperCase() : "",
    i2 = b ? b[0].toUpperCase() : "";
  return i1 + i2 || i1 || i2 || "?";
}
export function makeInitialsAvatar(first, last, size = 128) {
  const initials = buildInitials(first, last);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const hue = hashToHue((first + last).toLowerCase());
  ctx.fillStyle = `hsl(${hue},45%,35%)`;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = "destination-in";
  rounded(ctx, 0, 0, size, size, size / 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.floor(
    size * 0.45
  )}px system-ui,-apple-system,Segoe UI,Roboto`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, size / 2, size / 2);
  return canvas.toDataURL("image/png");
}
function hashToHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}
function rounded(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
