/** Prefix a path with the Vite base URL (e.g. `/bmac-website/` on GitHub Pages). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}
