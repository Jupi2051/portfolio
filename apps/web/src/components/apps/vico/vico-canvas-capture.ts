export function canvasToWebpBlob(
  canvas: HTMLCanvasElement,
  quality = 0.92,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not export canvas as WebP"));
      },
      "image/webp",
      quality,
    );
  });
}
