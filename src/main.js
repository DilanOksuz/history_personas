import { route, initRouter } from "./router.js";

// ilk açılış
window.addEventListener("DOMContentLoaded", () => {
  initRouter();
  route(); // mevcut hash'e göre yükle
});
