export async function render() {
  const el = document.createElement("section");
  el.innerHTML = `
    <h2>Chat</h2>
    <div style="margin-top:12px;">
      <input id="msg" placeholder="Mesaj yaz..." style="padding:8px; width:60%;" />
      <button id="send">Gönder</button>
      <div id="log" style="margin-top:10px; font-size:14px;"></div>
    </div>
  `;
  const log = el.querySelector("#log");
  el.querySelector("#send").addEventListener("click", () => {
    const msg = el.querySelector("#msg").value.trim();
    if (!msg) return;
    log.insertAdjacentHTML("beforeend", `<div>👤 ${msg}</div>`);
    setTimeout(
      () => log.insertAdjacentHTML("beforeend", `<div>🤖 (demo yanıt)</div>`),
      400
    );
  });
  return el;
}
export default render;
