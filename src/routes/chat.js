import {
  getSelectedPersona,
  loadSession,
  saveSession,
  upsertSessionIndex,
} from "../services/storage.js";

function guardrails({ text, persona }) {
  const year = (text.match(/\b(1[0-9]{3}|20[0-9]{2})\b/) || [])[0];
  if (year && parseInt(year, 10) > persona.cutoff_year) {
    return {
      blocked: true,
      reason: `Bu konu ${persona.cutoff_year} sonrasına ait.`,
    };
  }
  return { blocked: false };
}

function bubble(who, text) {
  return `<div class="msg ${who}">
    <div class="msg-bubble">${text}</div>
  </div>`;
}

export function render(root) {
  const persona = getSelectedPersona();
  if (!persona) {
    location.hash = "#/";
    return;
  }

  const sessionId = "s_" + persona.id;
  let state = loadSession(sessionId) || {
    id: sessionId,
    personaId: persona.id,
    messages: [],
  };

  root.innerHTML = `
    <section class="chat">
      <aside class="chat-side">
        <div class="persona-panel">
          <img class="persona-avatar-lg" src="${persona.avatar}" alt="${
    persona.name
  }">
          <h2>${persona.name}</h2>
          <div class="sub">${persona.years}</div>
          <div class="badge">Knowledge limited to ${persona.cutoff_year}</div>
        </div>
        <nav class="side-actions">
          <button id="new">New Chat</button>
          <button id="change">Change Persona</button>
          <button id="open-settings">Settings</button>
        </nav>
      </aside>

      <section class="chat-main">
        <header class="chat-header">
          <div class="title">${persona.name}</div>
          <div class="sub">${persona.years}</div>
        </header>

        <div id="messages" class="messages">
          ${state.messages.map((m) => bubble(m.role, m.text)).join("")}
        </div>

        <footer class="composer">
          <textarea id="input" rows="1" placeholder="Message ${
            persona.name
          }..."></textarea>
          <button id="send">Send ▶</button>
        </footer>
      </section>
    </section>
  `;

  const $msgs = root.querySelector("#messages");
  const $input = root.querySelector("#input");
  const $send = root.querySelector("#send");

  function push(role, text) {
    state.messages.push({ role, text, ts: Date.now() });
    $msgs.insertAdjacentHTML("beforeend", bubble(role, text));
    $msgs.scrollTop = $msgs.scrollHeight;
  }
  function persist() {
    saveSession(sessionId, state);
    upsertSessionIndex({
      id: sessionId,
      personaId: persona.id,
      lastMsg: state.messages.at(-1)?.text || "",
      createdAt: state.messages[0]?.ts || Date.now(),
    });
  }

  function send() {
    const text = ($input.value || "").trim();
    if (!text) return;

    const check = guardrails({ text, persona });
    push("user", text);
    $input.value = "";

    if (check.blocked) {
      push("ai", `Üzgünüm, ${persona.cutoff_year} sonrasına dair konuşamam.`);
      persist();
      return;
    }

    // Şimdilik demo
    push("ai", `${persona.name} is thinking… (LLM burada eklenecek)`);
    persist();
  }

  $send.addEventListener("click", send);
  $input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  root.querySelector("#new").addEventListener("click", () => {
    state = { id: sessionId, personaId: persona.id, messages: [] };
    $msgs.innerHTML = "";
    persist();
  });
  root
    .querySelector("#change")
    .addEventListener("click", () => (location.hash = "#/"));
  root
    .querySelector("#open-settings")
    .addEventListener("click", () => (location.hash = "#/settings"));
}
