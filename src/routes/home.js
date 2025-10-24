export async function render() {
  const el = document.createElement("section");
  el.innerHTML = `
    <h2>Anasayfa</h2>
    <p>Tarihî kişiliklerle yapay zekâ sohbetine hoş geldin.</p>
    <p><a href="/chat" data-link>Chat'e geç →</a></p>
  `;
  return el;
}
export default render;
