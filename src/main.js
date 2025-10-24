import { router, navigate, highlightActive } from "./router.js";

// İlk render
document.addEventListener("DOMContentLoaded", () => {
  router();
  highlightActive();
});

// SPA linklerini yakala (<a data-link href="/...">)
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a) return;
  const url = new URL(a.href, location.origin);
  if (url.origin !== location.origin) return; // dış linkleri bırak
  e.preventDefault();
  navigate(url.pathname); // pushState + render
});
