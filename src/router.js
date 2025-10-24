// History API Router — Geçersiz URL'leri /404'e NORMALİZE eder.

const routes = {
  "/": () => import("./routes/home.js"),
  "/home": () => import("./routes/home.js"),
  "/chat": () => import("./routes/chat.js"),
  "/settings": () => import("./routes/settings.js"),
  "/404": () => import("./routes/not_found.js"),
};

function getPath() {
  let p = location.pathname;
  if (!p.startsWith("/")) p = "/" + p;
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

async function renderPath(path) {
  let exists = Object.prototype.hasOwnProperty.call(routes, path);

  // Geçersiz rota ise URL'yi de /404 yap
  if (!exists) {
    if (location.pathname !== "/404") {
      history.replaceState({}, "", "/404"); // adres çubuğu normalleşsin
    }
    path = "/404";
    exists = true;
  }

  try {
    const mod = await routes[path]();
    const renderFn = mod.render || mod.default; // iki export tipini de destekle
    if (typeof renderFn !== "function")
      throw new Error(`'${path}' modülünde render() yok`);

    const view = await renderFn();
    document.getElementById("app").replaceChildren(view);

    document.title = `History Personas AI — ${
      path === "/" ? "Anasayfa" : path.slice(1)
    }`;
    document.dispatchEvent(
      new CustomEvent("route:changed", { detail: { path } })
    );
  } catch (err) {
    console.error("[router error]", err);
    // Son emniyet: minimal hata görünümü
    document.getElementById("app").innerHTML = `
      <section style="padding:16px">
        <h2>Bir şeyler ters gitti</h2>
        <pre style="white-space:pre-wrap;color:#b00">${String(err)}</pre>
        <p><a href="/" data-link>Anasayfa</a></p>
      </section>`;
  }
}

// Dışarıdan gezinme
export function navigate(to) {
  if (location.pathname !== to) history.pushState({}, "", to);
  renderPath(to);
}

// Geri/ileri
window.addEventListener("popstate", () => renderPath(getPath()));

// İlk çağrı
export function router() {
  renderPath(getPath());
}

// Aktif link vurgusu
export function highlightActive() {
  const p = getPath();
  document.querySelectorAll("header a[data-link]").forEach((a) => {
    const u = new URL(a.href, location.origin);
    a.classList.toggle(
      "active",
      u.pathname === p || (p === "/" && u.pathname === "/")
    );
  });
}
document.addEventListener("route:changed", highlightActive);
