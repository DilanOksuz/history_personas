// src/main.js
import { initRouter, route } from "./router.js";

// açılışta bir kere çiz ve listener’ı kur
window.addEventListener("DOMContentLoaded", () => {
  route();
  initRouter();
});
