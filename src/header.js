import { loadSettings, saveSettings } from "./services/storage.js";

const s = loadSettings();

function applyTheme(theme) {
  const t =
    theme === "system"
      ? matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  document.documentElement.setAttribute("data-theme", t);
}

applyTheme(s.theme);
document.documentElement.lang = s.lang;

const themeBtn = document.getElementById("themeToggle");
const langBtn = document.getElementById("langToggle");
const settingsBtn = document.getElementById("settingsBtn");

if (themeBtn) {
  themeBtn.textContent = s.theme === "dark" ? "🌙" : "☀️";
  themeBtn.addEventListener("click", () => {
    const cur = loadSettings();
    cur.theme = cur.theme === "dark" ? "light" : "dark";
    saveSettings(cur);
    themeBtn.textContent = cur.theme === "dark" ? "🌙" : "☀️";
  });
}

if (langBtn) {
  langBtn.textContent = s.lang.toUpperCase();
  langBtn.addEventListener("click", () => {
    const cur = loadSettings();
    cur.lang = cur.lang === "tr" ? "en" : "tr";
    saveSettings(cur);
    langBtn.textContent = cur.lang.toUpperCase();
  });
}

if (settingsBtn) {
  settingsBtn.addEventListener("click", () => (location.hash = "#/settings"));
}
