import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Croppie from "croppie";
import "croppie/croppie.css";

export type VicoPublishCropPreviewHandle = {
  getCroppedWebpBlob: () => Promise<Blob>;
};

type Props = {
  previewUrl: string;
  /** Aspect ratio for viewport — extent of drawing on canvas (not full bitmap size). */
  cropAspectWidth: number;
  cropAspectHeight: number;
  onCropperReady: (ready: boolean) => void;
};

/** Max viewport inscribed in the boundary with the image aspect ratio. */
function viewportForCanvasAspect(
  boundaryW: number,
  boundaryH: number,
  canvasW: number,
  canvasH: number,
): { width: number; height: number } {
  const cw = Math.max(1, canvasW);
  const ch = Math.max(1, canvasH);
  const aspect = cw / ch;
  const pad = 16;
  const maxW = Math.max(40, boundaryW - pad);
  const maxH = Math.max(40, boundaryH - pad);
  let w = maxW;
  let h = w / aspect;
  if (h > maxH) {
    h = maxH;
    w = h * aspect;
  }
  return {
    width: Math.floor(w),
    height: Math.floor(h),
  };
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

/** Output pixel size from source crop (full-res export). */
function fullResolutionResultSize(c: Croppie): { width: number; height: number } {
  const { points } = c.get();
  const [x1, y1, x2, y2] = points;
  const w = Math.max(1, Math.round(x2 - x1));
  const h = Math.max(1, Math.round(y2 - y1));
  return { width: w, height: h };
}

/** Min zoom / slider floor: full image contained in the viewport (min(vp/img), not boundary-based). */
function applyDrawingExtentZoomFloor(instance: Croppie): void {
  const img = instance.elements.img;
  const vp = instance.elements.viewport.getBoundingClientRect();
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih || vp.width <= 0 || vp.height <= 0) return;

  const fitZoom = Math.min(vp.width / iw, vp.height / ih);
  const zoomer = instance.elements.zoomer;
  const fixedMin = fitZoom.toFixed(4);
  let maxZ = parseFloat(zoomer.max);
  if (!Number.isFinite(maxZ) || fitZoom >= maxZ) {
    maxZ = fitZoom + 1;
    zoomer.max = maxZ.toFixed(4);
  }
  zoomer.min = fixedMin;
  instance.setZoom(fitZoom);
}

const VicoPublishPreview = forwardRef<VicoPublishCropPreviewHandle, Props>(
  function VicoPublishPreview(
    { previewUrl, cropAspectWidth, cropAspectHeight, onCropperReady },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const croppieMountRef = useRef<HTMLDivElement>(null);
    const croppieRef = useRef<Croppie | null>(null);
    const [boundaryPx, setBoundaryPx] = useState<{
      width: number;
      height: number;
    } | null>(null);

    useLayoutEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const bw = Math.floor(rect.width);
      const bh = Math.min(320, Math.floor(window.innerHeight * 0.42));
      if (bw > 0 && bh > 0) {
        setBoundaryPx({ width: bw, height: bh });
      }
    }, [previewUrl]);

    useEffect(() => {
      const mountEl = croppieMountRef.current;
      if (!mountEl || !boundaryPx || !previewUrl) {
        return;
      }

      croppieRef.current?.destroy();
      croppieRef.current = null;

      const vp = viewportForCanvasAspect(
        boundaryPx.width,
        boundaryPx.height,
        cropAspectWidth,
        cropAspectHeight,
      );

      const instance = new Croppie(mountEl, {
        viewport: {
          width: vp.width,
          height: vp.height,
        },
        boundary: {
          width: boundaryPx.width,
          height: boundaryPx.height,
        },
        showZoomer: true,
        enableOrientation: true,
        mouseWheelZoom: "ctrl",
        enableZoom: true,
        enforceBoundary: true,
        maxZoom: 4,
      });

      croppieRef.current = instance;

      let cancelled = false;
      void instance.bind({ url: previewUrl }).then(async () => {
        if (cancelled) return;
        await nextFrame();
        if (cancelled) return;
        applyDrawingExtentZoomFloor(instance);
        if (!cancelled) {
          onCropperReady(true);
        }
      });

      return () => {
        cancelled = true;
        instance.destroy();
        if (croppieRef.current === instance) {
          croppieRef.current = null;
        }
        onCropperReady(false);
      };
    }, [
      boundaryPx,
      previewUrl,
      cropAspectWidth,
      cropAspectHeight,
      onCropperReady,
    ]);

    useImperativeHandle(ref, () => ({
      getCroppedWebpBlob: () => {
        const c = croppieRef.current;
        if (!c) {
          return Promise.reject(new Error("Cropper not ready"));
        }
        const size = fullResolutionResultSize(c);
        return c.result({
          type: "blob",
          format: "webp",
          quality: 0.92,
          size,
        }) as Promise<Blob>;
      },
    }));

    return (
      <div
        ref={containerRef}
        className="mb-4 w-full [&_.croppie-container]:mx-auto [&_.cr-slider-wrap]:mt-3 [&_.cr-slider-wrap]:px-1"
      >
        <div
          ref={croppieMountRef}
          className="w-full"
          aria-label="Crop preview"
        />
      </div>
    );
  },
);

export default VicoPublishPreview;
