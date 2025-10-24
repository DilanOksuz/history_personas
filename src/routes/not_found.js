// Hem named export hem default veriyoruz; router her ikisini de destekliyor
export async function render() {
  const el = document.createElement("section");
  el.innerHTML = `
    <h2>404 — Sayfa bulunamadı</h2>
    <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
    <p><a href="/" data-link>Anasayfa</a></p>
  `;
  return el;
}
export default render;
