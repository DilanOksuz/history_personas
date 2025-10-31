// src/routes/settings.js
// Ayarlar + Profil Yönetimi (avatar değiştir/kaldır, isim/şifre, hesap sil)

export const render = (root) => {
  const prefs = loadPrefs();
  const { currentUser, users } = loadAuth();

  root.innerHTML = `
  <section class="settings container">

    <h1 class="page-title">Settings</h1>

    <!-- Apperance -->
    <div class="set-block">
      <div class="set-label">Appearance</div>
      <div class="pill-row" role="tablist" aria-label="Theme">
        <button class="pill ${isOn(
          prefs.theme,
          "light"
        )}" data-theme="light">Light</button>
        <button class="pill ${isOn(
          prefs.theme,
          "dark"
        )}"  data-theme="dark">Dark</button>
        <button class="pill ${isOn(
          prefs.theme,
          "system"
        )}" data-theme="system">Auto</button>
      </div>
    </div>

    <!-- Language -->
    <div class="set-block">
      <div class="set-label">Language</div>
      <div class="pill-row" role="tablist" aria-label="Language">
        <button class="pill ${isOn(
          prefs.lang,
          "tr"
        )}" data-lang="tr">TR</button>
        <button class="pill ${isOn(
          prefs.lang,
          "en"
        )}" data-lang="en">EN</button>
      </div>
    </div>

    <!-- Chat History -->
    <div class="set-block">
      <div class="set-label">Chat History</div>
      <div class="switch-line">
        <span>Save Chat History</span>
        <label class="switch">
          <input id="saveHistory" type="checkbox" ${
            prefs.saveHistory ? "checked" : ""
          } />
          <span class="track"></span>
        </label>
      </div>
      <button id="clearHistory" class="btn danger small">Clear Chat History</button>
    </div>

    <!-- Profile (giriş var ise) -->
    ${
      currentUser
        ? `
      <div class="set-block">
        <div class="set-label">Profile</div>

        <div class="profile-card">
          <div class="profile-left">
            <img id="avatarPreview" class="profile-avatar" alt="Avatar" src="${
              currentUser.avatar ||
              makeInitialsAvatar(
                currentUser.firstName,
                currentUser.lastName,
                128
              )
            }" />
            <input id="avatarFile" type="file" accept="image/*" hidden />
            <div class="avatar-actions">
              <button id="btnChangePhoto" class="btn subtle">Change photo</button>
              <button id="btnRemovePhoto" class="btn subtle">Remove photo</button>
            </div>
          </div>

          <div class="profile-right">
            <div class="grid-2">
              <div class="form-group">
                <label>First name</label>
                <input id="firstName" type="text" value="${esc(
                  currentUser.firstName
                )}" />
              </div>
              <div class="form-group">
                <label>Last name</label>
                <input id="lastName" type="text" value="${esc(
                  currentUser.lastName
                )}" />
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input id="email" type="email" value="${esc(
                currentUser.email
              )}" disabled />
            </div>

            <div class="grid-3">
              <div class="form-group">
                <label>Current password</label>
                <input id="oldPass" type="password" placeholder="••••••" />
              </div>
              <div class="form-group">
                <label>New password</label>
                <input id="newPass" type="password" placeholder="min 6 chars" />
              </div>
              <div class="form-group">
                <label>Confirm</label>
                <input id="newPass2" type="password" placeholder="repeat new password" />
              </div>
            </div>

            <div class="actions-row">
              <button id="btnSaveProfile" class="btn primary">Save changes</button>
              <button id="btnDeleteAccount" class="btn danger">Delete account</button>
            </div>
          </div>
        </div>
      </div>
    `
        : `
      <div class="set-block">
        <div class="set-label">Profile</div>
        <p class="muted">
          You are not signed in. <a class="link" href="#/login">Sign in</a> or <a class="link" href="#/signup">Create an account</a>.
        </p>
      </div>
    `
    }
  </section>
  `;

  /* ====== THEME ====== */
  root.querySelectorAll(".pill[data-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      prefs.theme = btn.dataset.theme;
      savePrefs(prefs);
      applyTheme(prefs.theme);
      setActive(root, ".pill[data-theme]", btn);
    });
  });

  /* ====== LANGUAGE ====== */
  root.querySelectorAll(".pill[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      prefs.lang = btn.dataset.lang;
      savePrefs(prefs);
      setActive(root, ".pill[data-lang]", btn);
      // (İstersen burada i18n yenilemesi tetikle)
    });
  });

  /* ====== CHAT HISTORY ====== */
  const saveHistory = root.querySelector("#saveHistory");
  saveHistory?.addEventListener("change", () => {
    prefs.saveHistory = !!saveHistory.checked;
    savePrefs(prefs);
  });
  root.querySelector("#clearHistory")?.addEventListener("click", () => {
    if (confirm("Clear all stored chats?")) {
      localStorage.removeItem("chats");
      toast("Chat history cleared.");
    }
  });

  /* ====== PROFILE (giriş varsa) ====== */
  if (currentUser) {
    const avatarFile = root.querySelector("#avatarFile");
    const btnChange = root.querySelector("#btnChangePhoto");
    const btnRemove = root.querySelector("#btnRemovePhoto");
    const avatarPreview = root.querySelector("#avatarPreview");

    const fn = root.querySelector("#firstName");
    const ln = root.querySelector("#lastName");
    const oldPass = root.querySelector("#oldPass");
    const newPass = root.querySelector("#newPass");
    const newPass2 = root.querySelector("#newPass2");

    btnChange.addEventListener("click", () => avatarFile.click());
    avatarFile.addEventListener("change", () => {
      const f = avatarFile.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        currentUser.avatar = reader.result;
        avatarPreview.src = currentUser.avatar;
      };
      reader.readAsDataURL(f);
    });

    btnRemove.addEventListener("click", () => {
      currentUser.avatar = "";
      avatarPreview.src = makeInitialsAvatar(fn.value, ln.value, 128);
    });

    // İsim değişince önizleme initial güncellensin (foto yoksa)
    const refreshInitial = () => {
      if (!currentUser.avatar) {
        avatarPreview.src = makeInitialsAvatar(fn.value, ln.value, 128);
      }
    };
    fn.addEventListener("input", refreshInitial);
    ln.addEventListener("input", refreshInitial);

    root.querySelector("#btnSaveProfile").addEventListener("click", () => {
      // isimler
      currentUser.firstName = (fn.value || "").trim();
      currentUser.lastName = (ln.value || "").trim();

      // şifre değişimi isteniyorsa kontrol
      const wantChange = newPass.value || newPass2.value || oldPass.value;
      if (wantChange) {
        if ((oldPass.value || "") !== (currentUser.password || "")) {
          alert("Current password is wrong.");
          return;
        }
        if (newPass.value.length < 6) {
          alert("New password must be ≥ 6 chars.");
          return;
        }
        if (newPass.value !== newPass2.value) {
          alert("New passwords do not match.");
          return;
        }
        currentUser.password = newPass.value;
      }

      // users dizisindeki kaydı güncelle
      const i = users.findIndex((u) => u.email === currentUser.email);
      if (i >= 0) {
        users[i] = currentUser;
        localStorage.setItem("kullanicilar", JSON.stringify(users));
      }
      // header avatar/isim güncellemesi için bir olay gönder
      window.dispatchEvent(new CustomEvent("auth:update"));
      toast("Profile saved.");
      oldPass.value = newPass.value = newPass2.value = "";
    });

    root.querySelector("#btnDeleteAccount").addEventListener("click", () => {
      if (!confirm("This will permanently delete your account. Continue?"))
        return;
      const i = users.findIndex((u) => u.email === currentUser.email);
      if (i >= 0) users.splice(i, 1);
      localStorage.setItem("kullanicilar", JSON.stringify(users));
      localStorage.removeItem("currentUserEmail");
      window.location.hash = "#/login";
      window.dispatchEvent(new CustomEvent("auth:update"));
    });
  }
};

/* ---------------- Helpers ---------------- */

function isOn(value, expected) {
  return value === expected ? "active" : "";
}
function setActive(root, sel, el) {
  root.querySelectorAll(sel).forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
}

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem("userPrefs") || "{}");
  } catch {
    return {};
  }
}
function savePrefs(p) {
  const prefs = {
    theme: p.theme || "system",
    lang: p.lang || "tr",
    saveHistory: !!p.saveHistory,
  };
  localStorage.setItem("userPrefs", JSON.stringify(prefs));
}
function applyTheme(theme) {
  const t = theme || "system";
  document.documentElement.setAttribute("data-theme", t);
}

function loadAuth() {
  const users = JSON.parse(localStorage.getItem("kullanicilar") || "[]");
  const email = localStorage.getItem("currentUserEmail") || "";
  const currentUser = users.find((u) => u.email === email) || null;
  return { currentUser, users };
}

function toast(msg) {
  try {
    console.info(msg);
  } catch {}
}

function esc(s) {
  return String(s || "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );
}

/* === Initials avatar (aynı algoritma signup’ta kullandığımız) === */
function buildInitials(first, last) {
  const a = (first || "").trim(),
    b = (last || "").trim();
  const i1 = a ? a[0].toUpperCase() : "",
    i2 = b ? b[0].toUpperCase() : "";
  return i1 + i2 || i1 || i2 || "?";
}
function makeInitialsAvatar(first, last, size = 128) {
  const initials = buildInitials(first, last);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const hue = hashToHue((first + last).toLowerCase());
  ctx.fillStyle = `hsl(${hue},45%,35%)`;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = "destination-in";
  rounded(ctx, 0, 0, size, size, size / 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.floor(
    size * 0.45
  )}px system-ui, -apple-system, Segoe UI, Roboto`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, size / 2, size / 2);
  return canvas.toDataURL("image/png");
}
function hashToHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}
function rounded(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
