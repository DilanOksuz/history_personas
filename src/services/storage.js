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
