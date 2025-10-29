export function render(root) {
  const path = location.hash.replace(/^#/, "");
  root.innerHTML = `
    <section class="error">
      <h1>404 — Sayfa bulunamadı</h1>
      <p><code>${path}</code> mevcut değil.</p>
      <p><a href="#/">Anasayfa</a></p>
    </section>
  `;
}
