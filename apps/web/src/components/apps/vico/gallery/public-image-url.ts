const API_BASE = import.meta.env.VITE_API_URL ?? "";

/**
 * @param cacheBust optional — append `?v=` so browsers fetch a new bytes after the file changes (same path).
 */
export function getVicoSketchWebpUrl(
  imageId: string,
  cacheBust?: number | string,
): string {
  const base = `${API_BASE}/vico-sketch-images/${encodeURIComponent(imageId)}.webp`;
  if (cacheBust === undefined) return base;
  const v = encodeURIComponent(String(cacheBust));
  return `${base}?v=${v}`;
}
