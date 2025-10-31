// src/routes/home.js
import PERSONAS from "../data/personas.js";
import { setSelectedPersona } from "../services/storage.js";

/**
 * Landing + arama + kartlar + modal
 */
export function render(root) {
  root.innerHTML = `
    <section class="landing-hero">
      <h1>Konuşmak istediğin tarihi kişilik kim?</h1>
      <p class="subtitle">Yapay zeka, tarihin en büyük zihinlerini canlandırıyor. Birini seç ve konuşmaya başla.</p>

      <div class="search-row">
        <input id="q" placeholder="Search historical figures..." />
        <button id="qgo">Devam Et</button>
      </div>
    </section>

    <section class="persona-grid" id="grid">
      ${PERSONAS.map(card).join("")}
    </section>
  `;

  const grid = root.querySelector("#grid");
  const q = root.querySelector("#q");
  const qgo = root.querySelector("#qgo");

  // ---- Arama ----
  function applyFilter() {
    const t = (q.value || "").toLowerCase();
    grid.innerHTML = PERSONAS.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.tags.join(" ").toLowerCase().includes(t)
    )
      .map(card)
      .join("");
  }
  q.addEventListener("input", applyFilter);
  qgo.addEventListener("click", applyFilter);

  // ---- Kart → Modal ----
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".persona-card");
    if (!btn) return;
    const p = PERSONAS.find((x) => x.id === btn.dataset.id);
    if (p) openPersonaModal(p);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const btn = e.target.closest(".persona-card");
    if (!btn) return;
    e.preventDefault();
    const p = PERSONAS.find((x) => x.id === btn.dataset.id);
    if (p) openPersonaModal(p);
  });
}

function card(p) {
  return `
  <button class="persona-card" data-id="${p.id}" tabindex="0" aria-label="${p.name}">
    <img class="persona-avatar" src="${p.avatar}" alt="${p.name}" />
    <div class="persona-name">${p.name}</div>
    <div class="persona-sub">${p.years}</div>
  </button>`;
}

function openPersonaModal(p) {
  closePersonaModal(); // varsa kapat

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "persona-modal";

  overlay.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="personaTitle">
      <button class="modal-close" aria-label="Close">×</button>

      <div class="modal-body">
        <div class="modal-header">
          <img class="modal-avatar" src="${p.avatar}" alt="${p.name}" />
          <div class="modal-title">
            <h2 id="personaTitle">${p.name}</h2>
            <div class="modal-meta">${p.years} • ${p.domain ?? ""}</div>
          </div>
        </div>

        <div class="meta-grid">
          <div class="label">Bilgi Sınırı</div>
          <div class="value">En güncel yılı: <b>${p.cutoff_year}</b></div>

          <div class="label">Konuşma Tarzı</div>
          <div class="value">${p.style ?? "—"}</div>

          <div class="label">Özet</div>
          <div class="value">${p.summary ?? p.bio ?? "—"}</div>

          <div class="label">Kaynaklar</div>
          <div class="value modal-links">
            ${(p.links || [])
              .map(
                (l) =>
                  `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`
              )
              .join(" ")}
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn primary" id="startChat">Sohbete Başla</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden"; // arka plan scroll’u kilitle

  // Kapatma davranışı
  const close = () => closePersonaModal();
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector(".modal-close").addEventListener("click", close);

  const escHandler = (e) => e.key === "Escape" && close();
  document.addEventListener("keydown", escHandler, { once: true });

  overlay.querySelector("#startChat").addEventListener("click", () => {
    try {
      setSelectedPersona(p); // seçimi kalıcı yap
    } catch {}
    location.hash = "#/chat";
    close();
  });

  // odak
  overlay.querySelector("#startChat")?.focus();
}

function closePersonaModal() {
  const el = document.getElementById("persona-modal");
  if (el) {
    el.remove();
    document.body.style.overflow = ""; // scroll serbest
  }
}
