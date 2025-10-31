// src/routes/signup.js
export const render = (root) => {
  root.innerHTML = `
    <main class="auth-container">
      <section class="auth-card" aria-labelledby="signup-title">
        <h1 id="signup-title" class="auth-title">Kaydol</h1>

        <form id="signupForm" class="auth-form" novalidate>
          <!-- Ad -->
          <div class="form-group">
            <label for="firstName">Ad</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M4 20c2.2-3.2 5-4.8 8-4.8S17.8 16.8 20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </span>
              <input id="firstName" name="firstName" type="text" placeholder="Ad"
                     autocomplete="given-name" required />
            </div>
          </div>

          <!-- Soyad -->
          <div class="form-group">
            <label for="lastName">Soyad</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M4 20c2.2-3.2 5-4.8 8-4.8S17.8 16.8 20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </span>
              <input id="lastName" name="lastName" type="text" placeholder="Soyad"
                     autocomplete="family-name" required />
            </div>
          </div>

          <!-- E-posta -->
          <div class="form-group">
            <label for="email">E-posta</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.6"/>
                </svg>
              </span>
              <input id="email" name="email" type="email" placeholder="E-posta"
                     autocomplete="email" inputmode="email" required />
            </div>
          </div>

          <!-- Şifre -->
          <div class="form-group">
            <label for="password">Şifre</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor" stroke-width="1.6"/>
                </svg>
              </span>
              <input id="password" name="password" type="password" placeholder="Şifre"
                     autocomplete="new-password" minlength="6" required />
            </div>
          </div>

          <!-- Şifre (Tekrar) -->
          <div class="form-group">
            <label for="password2">Şifre (Tekrar)</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor" stroke-width="1.6"/>
                </svg>
              </span>
              <input id="password2" name="password2" type="password"
                     placeholder="Şifreyi tekrar gir" autocomplete="new-password"
                     minlength="6" required />
            </div>
          </div>

          <!-- Profil Fotoğrafı (opsiyonel) -->
          <div class="form-group">
            <label for="avatar">Profil Fotoğrafı (opsiyonel)</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M7 14l3-3 3 3 3-3 3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                  <circle cx="8" cy="9" r="1.2" fill="currentColor" />
                </svg>
              </span>
              <input id="avatar" name="avatar" type="file" accept="image/*" />
            </div>
            <div class="avatar-preview" aria-live="polite" hidden>
              <img id="avatarPreviewImg" alt="Önizleme" />
            </div>
          </div>

          <button type="submit" class="btn-primary">Kaydol</button>

          <div class="auth-links">
            <hr class="divider" />
            <p class="small">
              Zaten hesabın var mı?
              <a href="#/login" class="link-strong">Giriş Yap</a>
            </p>
          </div>
        </form>
      </section>
    </main>
  `;

  // ---- DOM refs ----
  const form = document.getElementById("signupForm");
  const fn = document.getElementById("firstName");
  const ln = document.getElementById("lastName");
  const email = document.getElementById("email");
  const pass = document.getElementById("password");
  const pass2 = document.getElementById("password2");
  const fileInput = document.getElementById("avatar");
  const previewWrap = document.querySelector(".avatar-preview");
  const previewImg = document.getElementById("avatarPreviewImg");

  let avatarDataUrl = ""; // seçili resim ya da üretilecek initials PNG

  // --- Dosya seçildiğinde önizle + temp storage
  fileInput.addEventListener("change", () => {
    const f = fileInput.files?.[0];
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => {
      avatarDataUrl = reader.result;
      previewImg.src = avatarDataUrl;
      previewWrap.hidden = false;

      // seçilen fotoğrafı geçici olarak sakla (ör. topbar'da ihtiyaç olabilir)
      try {
        localStorage.setItem("signup_temp_avatar", avatarDataUrl);
      } catch {}
    };
    reader.readAsDataURL(f);
  });

  // --- İsim/soyisim girildikçe (foto seçilmemişse) initials avatar önizle
  const ensureInitialsPreview = () => {
    if (avatarDataUrl) return; // foto seçilmişse dokunma
    const initials = buildInitials(fn.value, ln.value);
    if (!initials) {
      previewWrap.hidden = true;
      previewImg.removeAttribute("src");
      return;
    }
    avatarDataUrl = makeInitialsAvatar(fn.value, ln.value, 160);
    previewImg.src = avatarDataUrl;
    previewWrap.hidden = false;
  };
  fn.addEventListener("input", ensureInitialsPreview);
  ln.addEventListener("input", ensureInitialsPreview);

  // --- Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!isValidEmail(email.value)) {
      alert("Lütfen geçerli bir e-posta girin (ör. ad@alan.tld).");
      email.focus();
      return;
    }
    if (pass.value.length < 6) {
      alert("Şifre en az 6 karakter olmalı.");
      pass.focus();
      return;
    }
    if (pass.value !== pass2.value) {
      alert("Şifreler eşleşmiyor.");
      pass2.focus();
      return;
    }

    // fotoğraf yoksa initials üret
    if (!avatarDataUrl) {
      avatarDataUrl = makeInitialsAvatar(fn.value, ln.value, 160);
    }

    const user = {
      firstName: fn.value.trim(),
      lastName: ln.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: pass.value, // prod'da hash'leyin
      avatar: avatarDataUrl, // data:image/png;...
      avatarKind: fileInput.files?.length ? "uploaded" : "initials",
      initials: buildInitials(fn.value, ln.value),
      createdAt: Date.now(),
    };

    try {
      const all = JSON.parse(localStorage.getItem("users") || "[]");
      if (all.some((u) => u.email === user.email)) {
        alert("Bu e-posta ile zaten bir hesap var.");
        return;
      }
      all.push(user);
      localStorage.setItem("users", JSON.stringify(all));
      localStorage.removeItem("signup_temp_avatar");

      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      window.location.hash = "#/login";
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  });
};

/* ---------------- Helpers ---------------- */

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v);
}

/**
 * Ad + Soyad'dan iki harf üretir.
 * - Soyad yoksa adın ikinci harfi/kelimesi kullanılır.
 * - TR büyük harf kuralları korunur.
 */
function buildInitials(first, last) {
  const f = (first || "").trim();
  const l = (last || "").trim();

  const f1 = f.split(/\s+/)[0] || "";
  const l1 = l.split(/\s+/)[0] || "";

  let a = "";
  if (f1) a += f1[0];
  if (l1) a += l1[0];

  if (!l1) {
    const f2 = f.split(/\s+/)[1];
    if (f2 && f2[0]) {
      a = (f1[0] || "") + f2[0];
    } else if (f1.length >= 2) {
      a = f1[0] + f1[1];
    }
  }

  return a.toLocaleUpperCase("tr-TR");
}

function makeInitialsAvatar(first, last, size = 160) {
  const initials = buildInitials(first, last) || "?";
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");

  // isimden deterministik arka plan
  const hue = hashToHue((first + last).toLowerCase());
  ctx.fillStyle = `hsl(${hue}, 45%, 35%)`;
  ctx.fillRect(0, 0, size, size);

  // dairesel maske
  ctx.globalCompositeOperation = "destination-in";
  roundedRect(ctx, 0, 0, size, size, size / 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  // harf
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.floor(
    size * 0.45
  )}px system-ui, -apple-system, Segoe UI, Roboto`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials.toLocaleUpperCase("tr-TR"), size / 2, size / 2);

  return canvas.toDataURL("image/png");
}

function hashToHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}

function roundedRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
