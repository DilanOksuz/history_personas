import {
  loadSettings,
  saveSettings,
  deleteAllSessions,
} from "../services/storage.js";

export function render(root) {
  const s = loadSettings();

  root.innerHTML = `
    <section class="settings">
      <h1>Settings</h1>

      <h3>Appearance</h3>
      <div class="btnrow">
        <button data-theme="light" class="opt ${
          s.theme === "light" ? "active" : ""
        }">Light</button>
        <button data-theme="dark"  class="opt ${
          s.theme === "dark" ? "active" : ""
        }">Dark</button>
        <button data-theme="system" class="opt ${
          s.theme === "system" ? "active" : ""
        }">Auto</button>
      </div>

      <h3>Language</h3>
      <div class="btnrow">
        <button data-lang="tr" class="opt ${
          s.lang === "tr" ? "active" : ""
        }">TR</button>
        <button data-lang="en" class="opt ${
          s.lang === "en" ? "active" : ""
        }">EN</button>
      </div>

      <h3>Chat History</h3>
      <div class="btnrow">
        <label class="switch">
          <input id="saveHistory" type="checkbox" ${
            s.saveHistory ? "checked" : ""
          }/>
          <span>Save Chat History</span>
        </label>
        <button id="clear">Clear Chat History</button>
      </div>
    </section>
  `;

  root.querySelectorAll("[data-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cur = loadSettings();
      cur.theme = btn.dataset.theme;
      saveSettings(cur);
      document
        .querySelectorAll("[data-theme]")
        .forEach((x) => x.classList.toggle("active", x === btn));
    });
  });

  root.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cur = loadSettings();
      cur.lang = btn.dataset.lang;
      saveSettings(cur);
      document
        .querySelectorAll("[data-lang]")
        .forEach((x) => x.classList.toggle("active", x === btn));
    });
  });

  root.querySelector("#saveHistory").addEventListener("change", (e) => {
    const cur = loadSettings();
    cur.saveHistory = e.target.checked;
    saveSettings(cur);
  });

  root.querySelector("#clear").addEventListener("click", () => {
    deleteAllSessions();
    alert("All chat history cleared.");
  });
}
