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
  canvasWidth: number;
  canvasHeight: number;
  onCropperReady: (ready: boolean) => void;
};

/** Viewport size inside the boundary that preserves canvas aspect ratio (fits within max box). */
function viewportForCanvasAspect(
  boundaryW: number,
  boundaryH: number,
  canvasW: number,
  canvasH: number,
): { width: number; height: number } {
  const cw = Math.max(1, canvasW);
  const ch = Math.max(1, canvasH);
  const aspect = cw / ch;
  const maxW = Math.min(300, boundaryW - 16);
  const maxH = Math.min(240, boundaryH - 16);
  let w = maxW;
  let h = w / aspect;
  if (h > maxH) {
    h = maxH;
    w = h * aspect;
  }
  return {
    width: Math.max(40, Math.floor(w)),
    height: Math.max(40, Math.floor(h)),
  };
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

/** Export dimensions = crop size in source pixels so Croppie scales up from preview to full-res. */
function fullResolutionResultSize(c: Croppie): { width: number; height: number } {
  const { points } = c.get();
  const [x1, y1, x2, y2] = points;
  const w = Math.max(1, Math.round(x2 - x1));
  const h = Math.max(1, Math.round(y2 - y1));
  return { width: w, height: h };
}

const VicoPublishPreview = forwardRef<VicoPublishCropPreviewHandle, Props>(
  function VicoPublishPreview(
    { previewUrl, canvasWidth, canvasHeight, onCropperReady },
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
        canvasWidth,
        canvasHeight,
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
        enforceBoundary: false,
        minZoom: 0.01,
        maxZoom: 4,
      });

      croppieRef.current = instance;

      let cancelled = false;
      void instance.bind({ url: previewUrl }).then(async () => {
        if (cancelled) return;
        await nextFrame();
        if (cancelled) return;
        const minZ = parseFloat(instance.elements.zoomer.min);
        if (!Number.isNaN(minZ) && minZ > 0) {
          instance.setZoom(minZ);
        }
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
      canvasWidth,
      canvasHeight,
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
