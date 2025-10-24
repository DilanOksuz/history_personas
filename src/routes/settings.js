export async function render() {
  const el = document.createElement("section");
  el.innerHTML = `
    <h2>Ayarlar</h2>
    <ul>
      <li>Tema: Light / Dark</li>
      <li>Dil: TR / EN</li>
    </ul>
  `;
  return el;
}
export default render;
