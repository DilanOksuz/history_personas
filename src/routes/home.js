import personas from "../data/personas.js";
import { setSelectedPersona } from "../services/storage.js";

export function render(root) {
  root.innerHTML = `
    <section class="landing-hero">
      <h1>Konuşmak istediğin tarihi kişilik kim?</h1>
      <p>Yapay zeka, tarihin en büyük zihinlerini canlandırıyor. Birini seç ve konuşmaya başla.</p>
      <div class="search-row">
        <input id="q" placeholder="Search historical figures..." />
        <button id="qgo">Devam Et</button>
      </div>
    </section>

    <section class="persona-grid" id="grid">
      ${personas.map(card).join("")}
    </section>
  `;

  const grid = root.querySelector("#grid");
  const q = root.querySelector("#q");
  const qgo = root.querySelector("#qgo");

  function applyFilter() {
    const t = (q.value || "").toLowerCase();
    grid.innerHTML = personas
      .filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.tags.join(" ").toLowerCase().includes(t)
      )
      .map(card)
      .join("");
  }
  q.addEventListener("input", applyFilter);
  qgo.addEventListener("click", applyFilter);

  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".persona-card");
    if (!btn) return;
    const p = personas.find((x) => x.id === btn.dataset.id);
    if (!p) return;
    setSelectedPersona(p);
    location.hash = "#/chat";
  });
}

function card(p) {
  return `
  <button class="persona-card" data-id="${p.id}">
    <img class="persona-avatar" src="${p.avatar}" alt="${p.name}" />
    <div class="persona-name">${p.name}</div>
    <div class="persona-sub">${p.years}</div>
  </button>`;
}
