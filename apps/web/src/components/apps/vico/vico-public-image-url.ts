const API_BASE = import.meta.env.VITE_API_URL ?? "";

export function getVicoSketchWebpUrl(imageId: string): string {
  return `${API_BASE}/vico-sketch-images/${encodeURIComponent(imageId)}.webp`;
}
