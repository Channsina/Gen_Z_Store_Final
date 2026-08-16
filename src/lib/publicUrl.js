
export function publicUrl(path) {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL; // e.g. "/Gen_Z_Store_Final/"
  return base + path.replace(/^\/+/, "");
}