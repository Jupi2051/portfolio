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

export type CanvasDrawingBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Axis-aligned bounding box of pixels with alpha above the threshold (brush ink, fills).
 */
export function getCanvasDrawingBoundsRect(
  canvas: HTMLCanvasElement,
  alphaThreshold = 12,
): CanvasDrawingBounds | null {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const w = canvas.width;
  const h = canvas.height;
  if (w === 0 || h === 0) return null;

  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;

  try {
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const stride = w * 4;

    for (let y = 0; y < h; y++) {
      const row = y * stride;
      for (let x = 0; x < w; x++) {
        const a = data[row + x * 4 + 3];
        if (a > alphaThreshold) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
  } catch {
    return null;
  }

  if (maxX < 0) {
    return null;
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

function cropCanvasToWebpBlob(
  source: HTMLCanvasElement,
  bounds: CanvasDrawingBounds,
  quality: number,
): Promise<Blob> {
  const { x, y, width, height } = bounds;
  const out = document.createElement("canvas");
  out.width = width;
  out.height = height;
  const ctx = out.getContext("2d");
  if (!ctx) {
    return Promise.reject(new Error("Could not get 2d context for crop export"));
  }
  ctx.drawImage(source, x, y, width, height, 0, 0, width, height);
  return canvasToWebpBlob(out, quality);
}

export type VicoCanvasCaptureResult = {
  blob: Blob;
  cropAspectWidth: number;
  cropAspectHeight: number;
};

/**
 * WebP of only the drawn region (tight alpha bounds). Falls back to the full canvas if no ink is detected.
 */
export async function captureCanvasForPublish(
  canvas: HTMLCanvasElement,
  quality = 0.92,
): Promise<VicoCanvasCaptureResult> {
  const cw = canvas.width;
  const ch = canvas.height;
  const bounds = getCanvasDrawingBoundsRect(canvas);
  if (!bounds) {
    const blob = await canvasToWebpBlob(canvas, quality);
    return {
      blob,
      cropAspectWidth: cw,
      cropAspectHeight: ch,
    };
  }

  const blob = await cropCanvasToWebpBlob(canvas, bounds, quality);
  return {
    blob,
    cropAspectWidth: bounds.width,
    cropAspectHeight: bounds.height,
  };
}
