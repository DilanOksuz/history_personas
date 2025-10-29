// public altında mıyız? (Live Server'da /public ile açınca true olur)
const UNDER_PUBLIC = location.pathname.startsWith("/public/");

// public altında isek /public önekini ekle, değilsek ekleme
export function asset(path) {
  const base = UNDER_PUBLIC ? "/public" : "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
