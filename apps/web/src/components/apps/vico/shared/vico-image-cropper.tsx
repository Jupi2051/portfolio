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

export type SourceCropRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type VicoImageCropperHandle = {
  getCroppedWebpBlob: () => Promise<Blob>;
  /** Pixel rectangle in source image space (for server-side sharp.extract). */
  getSourceCropRect: () => SourceCropRect;
};

type Props = {
  /** Object URL, data URL, or same-origin image URL. */
  imageUrl: string;
  aspectWidth: number;
  aspectHeight: number;
  onCropperReady: (ready: boolean) => void;
  /** Max CSS height for the Croppie boundary (preview column vs modal). */
  boundaryMaxHeightPx?: number;
  className?: string;
};

function viewportForAspect(
  boundaryW: number,
  boundaryH: number,
  aw: number,
  ah: number,
): { width: number; height: number } {
  const cw = Math.max(1, aw);
  const ch = Math.max(1, ah);
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

function fullResolutionResultSize(c: Croppie): { width: number; height: number } {
  const { points } = c.get();
  const [x1, y1, x2, y2] = points;
  const w = Math.max(1, Math.round(x2 - x1));
  const h = Math.max(1, Math.round(y2 - y1));
  return { width: w, height: h };
}

export function croppiePointsToSourceCropRect(points: number[]): SourceCropRect {
  const [x1, y1, x2, y2] = points;
  const left = Math.round(Math.min(x1, x2));
  const top = Math.round(Math.min(y1, y2));
  const width = Math.max(1, Math.round(Math.abs(x2 - x1)));
  const height = Math.max(1, Math.round(Math.abs(y2 - y1)));
  return { left, top, width, height };
}

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

const VicoImageCropper = forwardRef<VicoImageCropperHandle, Props>(
  function VicoImageCropper(
    {
      imageUrl,
      aspectWidth,
      aspectHeight,
      onCropperReady,
      boundaryMaxHeightPx = 320,
      className,
    },
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
      const bh = Math.min(boundaryMaxHeightPx, Math.floor(window.innerHeight * 0.42));
      if (bw > 0 && bh > 0) {
        setBoundaryPx({ width: bw, height: bh });
      }
    }, [imageUrl, boundaryMaxHeightPx]);

    useEffect(() => {
      const mountEl = croppieMountRef.current;
      if (!mountEl || !boundaryPx || !imageUrl) {
        return;
      }

      croppieRef.current?.destroy();
      croppieRef.current = null;

      const vp = viewportForAspect(
        boundaryPx.width,
        boundaryPx.height,
        aspectWidth,
        aspectHeight,
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
      void instance.bind({ url: imageUrl }).then(async () => {
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
      imageUrl,
      aspectWidth,
      aspectHeight,
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
      getSourceCropRect: () => {
        const c = croppieRef.current;
        if (!c) {
          throw new Error("Cropper not ready");
        }
        const { points } = c.get();
        return croppiePointsToSourceCropRect(points);
      },
    }));

    return (
      <div
        ref={containerRef}
        className={
          className ??
          "w-full [&_.croppie-container]:mx-auto [&_.cr-slider-wrap]:mt-3 [&_.cr-slider-wrap]:px-1"
        }
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

export default VicoImageCropper;
