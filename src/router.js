import { render as renderHome } from "./routes/home.js";
import { render as renderChat } from "./routes/chat.js";
import { render as renderSettings } from "./routes/settings.js";
import { render as render404 } from "./routes/not_found.js";

// route -> render fonksiyonu
const routes = {
  "/": renderHome,
  "/landing": renderHome,
  "/chat": renderChat,
  "/settings": renderSettings,
  // diğerleri bilinmiyorsa 404
};

export function route() {
  const root = document.getElementById("app");
  if (!root) return;

  const hash = location.hash || "#/";
  const path = hash.replace(/^#/, "");
  const handler = routes[path] || render404;

  try {
    handler(root);
    setActiveNav(path);
  } catch (err) {
    root.innerHTML = `
      <section class="error">
        <h1>Bir şeyler ters gitti</h1>
        <p style="color:#c44">TypeError: ${err?.message || err}</p>
        <p><a href="#/">Anasayfa</a></p>
      </section>
    `;
    console.error(err);
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
