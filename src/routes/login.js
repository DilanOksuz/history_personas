export const render = (root) => {
  root.innerHTML = `
    <main class="auth-container">
      <section class="auth-card" aria-labelledby="signin-title">
        <h1 id="signin-title" class="auth-title">Giriş Yap</h1>

        <form id="signinForm" class="auth-form" novalidate>
          <div class="form-group">
            <label for="email">E-posta</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18v12H3z" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.6"/>
                </svg>
              </span>
              <input id="email" name="email" type="email" placeholder="E-posta"
                     autocomplete="email" required inputmode="email"/>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Şifre</label>
            <div class="input-with-icon">
              <span class="icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor" stroke-width="1.6"/>
                </svg>
              </span>
              <input id="password" name="password" type="password"
                     placeholder="Şifre" autocomplete="current-password"
                     required minlength="6"/>
            </div>
          </div>

          <button type="submit" class="btn-primary" id="loginBtn">Giriş Yap</button>
          <div class="auth-links">
            <a href="#" class="link-muted">Şifreni mi unuttun?</a>
            <hr class="divider" />
            <p class="small">Hesabın yok mu? <a href="#/signup" class="link-strong">Kaydol</a></p>
          </div>

          <p id="loginError" style="color:#d33;margin-top:8px;display:none"></p>
        </form>
      </section>
    </main>
  `;

  const form = document.getElementById("signinForm");
  const emailI = document.getElementById("email");
  const passI = document.getElementById("password");
  const errEl = document.getElementById("loginError");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    errEl.style.display = "none";
    errEl.textContent = "";

    const email = (emailI.value || "").trim().toLowerCase();
    const pass = (passI.value || "").trim();
    if (!email || !pass) return showErr("E-posta ve şifre gerekli.");

    // >>> FARK: Önce 'users', yoksa 'kullanicilar'
    let users = [];
    try {
      const raw =
        localStorage.getItem("users") ??
        localStorage.getItem("kullanicilar") ??
        "[]";
      users = JSON.parse(raw);
    } catch {
      users = [];
    }

    const user = users.find((u) => (u.email || "").toLowerCase() === email);

    if (!user || user.password !== pass) {
      return showErr("E-posta veya şifre hatalı.");
    }

    // Başarılı giriş
    localStorage.setItem("currentUserEmail", user.email);
    window.dispatchEvent(new CustomEvent("auth:update")); // header güncellemesi
    window.location.hash = "#/"; // anasayfaya
  });

  function showErr(msg) {
    errEl.textContent = msg;
    errEl.style.display = "block";
  }
};
