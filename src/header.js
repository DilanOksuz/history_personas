// === THEME ===
const themeBtn = document.getElementById("btn-theme");
const root = document.documentElement;
function getSystem() {
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(pref) {
  const m = pref === "system" ? getSystem() : pref;
  root.dataset.theme = m;
  localStorage.setItem("theme", pref);
  themeBtn.textContent = m === "dark" ? "🌙" : "☀️";
}
(function initTheme() {
  applyTheme(localStorage.getItem("theme") || "dark");
})();
themeBtn?.addEventListener("click", () =>
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark")
);

// === LANGUAGE ===
const langBtn = document.getElementById("btn-lang");
const langText = document.getElementById("lang-current");
function setCookie(n, v, days = 365) {
  document.cookie = `${n}=${v}; Max-Age=${days * 86400}; Path=/; SameSite=Lax`;
}
function getCookie(n) {
  return document.cookie
    .split("; ")
    .find((x) => x.startsWith(n + "="))
    ?.split("=")[1];
}
function applyLang(l) {
  document.documentElement.lang = l;
  langText.textContent = l.toUpperCase();
  setCookie("lang", l); /* i18n.changeLanguage(l) */
}
(function initLang() {
  applyLang(getCookie("lang") || "en");
})();
langBtn?.addEventListener("click", () =>
  applyLang((document.documentElement.lang || "en") === "en" ? "tr" : "en")
);

// === DROPDOWNS (ayarlar + profil) ===
document.querySelectorAll("[data-dropdown]").forEach((dd) => {
  const trigger = dd.querySelector("[data-dropdown-trigger]");
  const menu = dd.querySelector(".menu");
  if (!trigger || !menu) return;
  const open = () => {
    menu.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    document.addEventListener("click", onDoc, { once: true });
    document.addEventListener("keydown", onEsc);
  };
  const close = () => {
    menu.setAttribute("aria-hidden", "true");
    trigger.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onEsc);
  };
  const onDoc = (e) => {
    if (!dd.contains(e.target)) close();
  };
  const onEsc = (e) => {
    if (e.key === "Escape") close();
  };
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    trigger.getAttribute("aria-expanded") === "true" ? close() : open();
  });
});

// === SETTINGS menu actions ===
document.getElementById("clear-history")?.addEventListener("click", () => {
  Object.keys(localStorage).forEach((k) => {
    if (k.startsWith("session:")) localStorage.removeItem(k);
  });
  alert("All chats cleared.");
});
document
  .getElementById("logout")
  ?.addEventListener("click", () => alert("Logged out (demo)"));

// === NAV ACTIVE (hash router ile) ===
function highlightNav() {
  const cur = location.hash || "#/landing";
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === cur);
  });
}
window.addEventListener("hashchange", highlightNav);
highlightNav();
