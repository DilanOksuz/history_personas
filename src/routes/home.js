// src/routes/home.js
import personas from "../data/personas.js";
import { setSelectedPersona } from "../services/storage.js";
import { asset } from "../services/paths.js"; // ← yol çözücü (dün eklediğimiz)

export function render(root) {
  // iskeleti bas
  root.innerHTML = `
    <section class="landing-hero">
      <h1>Konuşmak istediğin tarihi kişilik kim?</h1>
      <p class="text-muted">
        Yapay zeka, tarihin en büyük zihinlerini canlandırıyor. Birini seç ve konuşmaya başla.
      </p>
      <div class="search-row">
        <input id="q" class="input" placeholder="Search historical figures..." />
        <button id="qgo" class="btn btn--primary">Devam Et</button>
      </div>
    </section>

    <ul class="persona-grid" id="grid"></ul>
  `;

  const grid = root.querySelector("#grid");
  const q = root.querySelector("#q");
  const qgo = root.querySelector("#qgo");

  // güvenlik: import başarısızsa kullanıcıya bildir
  if (!Array.isArray(personas)) {
    grid.innerHTML = `
      <li class="persona-card" style="grid-column: 1 / -1; text-align:center;">
        <div style="opacity:.8">Kişilik listesi yüklenemedi.</div>
      </li>`;
    console.error("home.js → personas beklenen formatta değil:", personas);
    return;
  }

  // ilk liste
  renderList(personas);

  // filtre
  function applyFilter() {
    const t = (q.value || "").toLowerCase();
    const filtered = personas.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        (p.tags || []).join(" ").toLowerCase().includes(t)
    );
    renderList(filtered);
  }
  q.addEventListener("input", applyFilter);
  qgo.addEventListener("click", applyFilter);

  // tıklama (delegation)
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".persona-card");
    if (!card) return;
    const p = personas.find((x) => x.id === card.dataset.id);
    if (!p) return;
    setSelectedPersona(p);
    location.hash = "#/chat";
  });

  // -----------------
  // yardımcılar
  // -----------------
  function renderList(items) {
    if (!items.length) {
      grid.innerHTML = `
        <li class="persona-card" style="grid-column: 1 / -1; text-align:center;">
          <div style="opacity:.8">Eşleşen kişi bulunamadı.</div>
        </li>`;
      return;
    }
    grid.innerHTML = items.map(card).join("");
  }

  function card(p) {
    // avatar yolu: data/personas.js → "assets/personas/einstein.png"
    // burada asset(...) ile normalize ediyoruz
    const imgSrc = asset(p.avatar);
    return `
      <li class="persona-card" data-id="${p.id}" title="${p.name}">
        <img class="persona-avatar" src="${imgSrc}" alt="${p.name}" loading="lazy" />
        <div class="persona-name">${p.name}</div>
        <div class="persona-sub">${p.years}</div>
      </li>`;
  }
}
