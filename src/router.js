// src/router.js
import { render as renderHome } from "./routes/home.js";
import { render as renderChat } from "./routes/chat.js";
import { render as renderSettings } from "./routes/settings.js";
import { render as renderLogin } from "./routes/login.js";
import { render as renderSignup } from "./routes/signup.js";
import { render as render404 } from "./routes/not_found.js";

// hash tabanlı SPA routing tablosu
const routes = {
  "/": renderHome,
  "/landing": renderHome,
  "/chat": renderChat,
  "/settings": renderSettings,
  "/login": renderLogin,
  "/signup": renderSignup,
};

export function route() {
  const root = document.getElementById("app");
  if (!root) return;

  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#/, ""); // "#/login" -> "/login"

  const handler = routes[path] || render404;

  try {
    handler(root); // ekrana bas
    setActiveNav(path); // üst menü active
  } catch (err) {
    console.error(err);
    root.innerHTML = `
      <section class="error">
        <h1>Bir şeyler ters gitti</h1>
        <p style="color:#c44">Error: ${err?.message || err}</p>
        <p><a href="#/">Anasayfa</a></p>
      </section>
    `;
  }
}

export function initRouter() {
  window.addEventListener("hashchange", route);
}

// üst menü active durumu
function setActiveNav(path) {
  document.querySelectorAll("header .nav a[data-route]").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${path}`);
  });
}
