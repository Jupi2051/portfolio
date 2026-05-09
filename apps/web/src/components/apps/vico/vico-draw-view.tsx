import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import useSystemNotification from "@/components/apps/notification/use-system-notification";
import SuccessNotification from "@/components/apps/controls/notification";
import VicoBrushCursor from "./vico-brush-cursor";
import VicoToolbar from "./vico-toolbar";
import VicoCaptureButton from "./vico-capture-button";
import VicoPublishModal, { type VicoPublishCapture } from "./vico-publish-modal";
import VicoLeaveStudioDialog from "./vico-leave-studio-dialog";
import { useAtramentSketch } from "./use-atrament-sketch";
import { useVicoCanvasWebpCapture } from "./use-vico-canvas-capture";
import { isTextLikeInput } from "./vico-is-text-like-input";

type Props = {
  parentProcessId: number;
  onGoGallery: () => void;
};

export default function VicoDrawView({
  parentProcessId,
  onGoGallery,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureRef = useRef<VicoPublishCapture | null>(null);

  const [brushPointer, setBrushPointer] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [publishOpen, setPublishOpen] = useState(false);
  const [capture, setCapture] = useState<VicoPublishCapture | null>(null);
  const [galleryLeaveConfirmOpen, setGalleryLeaveConfirmOpen] = useState(false);

  const { summonNotificationWindow } = useSystemNotification({
    content: <SuccessNotification />,
    parentProcess: parentProcessId,
    windowSize: { width: 450, height: 200 },
  });

  const canvasCapture = useVicoCanvasWebpCapture();

  const sketch = useAtramentSketch(containerRef, canvasRef);

  captureRef.current = capture;
  useEffect(() => {
    return () => {
      if (captureRef.current?.previewUrl) {
        URL.revokeObjectURL(captureRef.current.previewUrl);
      }
    };
  }, []);

  const showBrushFootprint =
    brushPointer != null &&
    (sketch.mode === sketch.MODE_DRAW || sketch.mode === sketch.MODE_ERASE);

  const closePublishModal = useCallback(() => {
    setPublishOpen(false);
    setCapture((prev) => {
      if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl);
      return null;
    });
  }, []);

  const onUploadSuccess = useCallback(() => {
    summonNotificationWindow({
      title: "Your sketch was uploaded successfully!",
    });
  }, [summonNotificationWindow]);

  const onCaptureClick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvasCapture.mutate(canvas, {
      onSuccess: (blob) => {
        setCapture((prev) => {
          if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl);
          return {
            blob,
            previewUrl: URL.createObjectURL(blob),
          };
        });
        setPublishOpen(true);
      },
      onError: () => {
        summonNotificationWindow({
          title: "Could not capture the canvas as WebP in this browser.",
        });
      },
    });
  }, [canvasCapture, summonNotificationWindow]);

  const onKeyDownCapture = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (galleryLeaveConfirmOpen) return;
      if (!rootRef.current?.contains(e.target as Node)) return;
      if (isTextLikeInput(e.target)) return;

      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      const key = e.key.toLowerCase();

      if (key === "z") {
        e.preventDefault();
        if (e.shiftKey) sketch.redo();
        else sketch.undo();
        return;
      }

      if (key === "y" && !e.shiftKey && e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        sketch.redo();
      }
    },
    [sketch.redo, sketch.undo, galleryLeaveConfirmOpen],
  );

  const onGalleryButtonClick = useCallback(() => {
    if (sketch.canUndo) {
      setGalleryLeaveConfirmOpen(true);
    } else {
      onGoGallery();
    }
  }, [sketch.canUndo, onGoGallery]);

  const onConfirmLeaveStudio = useCallback(() => {
    setGalleryLeaveConfirmOpen(false);
    onGoGallery();
  }, [onGoGallery]);

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className="relative flex h-full min-h-0 flex-col bg-ctp-base text-ctp-text outline-none focus-visible:ring-2 focus-visible:ring-ctp-lavender/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
      onPointerDownCapture={(ev) => {
        if (isTextLikeInput(ev.target)) return;
        rootRef.current?.focus({ preventScroll: true });
      }}
      onKeyDownCapture={onKeyDownCapture}
    >
      <VicoPublishModal
        open={publishOpen}
        capture={capture}
        onClose={closePublishModal}
        onUploadSuccess={onUploadSuccess}
      />
      <VicoLeaveStudioDialog
        open={galleryLeaveConfirmOpen}
        onStay={() => setGalleryLeaveConfirmOpen(false)}
        onLeave={onConfirmLeaveStudio}
      />

      <div className="flex shrink-0 items-center border-b border-ctp-surface1 bg-ctp-mantle px-3 py-2">
        <span className="font-capirola text-sm font-medium text-ctp-subtext1">
          Studio
        </span>
      </div>

      <VicoToolbar
        mode={sketch.mode}
        setMode={sketch.setMode}
        color={sketch.color}
        setColor={sketch.setColor}
        brushWeight={sketch.brushWeight}
        setBrushWeight={sketch.setBrushWeight}
        brushWeightMin={sketch.VICO_BRUSH_WEIGHT_MIN}
        brushWeightMax={sketch.VICO_BRUSH_WEIGHT_MAX}
        undo={sketch.undo}
        redo={sketch.redo}
        clearAll={sketch.clearAll}
        canUndo={sketch.canUndo}
        canRedo={sketch.canRedo}
        MODE_DRAW={sketch.MODE_DRAW}
        MODE_ERASE={sketch.MODE_ERASE}
        MODE_FILL={sketch.MODE_FILL}
      />
      <div
        ref={containerRef}
        className="relative min-h-0 flex-1 bg-ctp-mantle"
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setBrushPointer({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onPointerLeave={() => setBrushPointer(null)}
      >
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3">
          <button
            type="button"
            title="Open gallery"
            aria-label="Open gallery"
            onClick={onGalleryButtonClick}
            className={cn(
              "flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-ctp-surface1 bg-ctp-base text-ctp-lavender shadow-lg transition",
              "hover:border-ctp-lavender/40 hover:bg-ctp-surface0 hover:shadow-xl",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-lavender/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-mantle",
            )}
          >
            <FontAwesomeIcon icon={faImages} className="text-2xl" />
          </button>
          <VicoCaptureButton
            onClick={() => void onCaptureClick()}
            isCapturing={canvasCapture.isPending}
          />
        </div>
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 block h-full w-full touch-none",
            sketch.mode === sketch.MODE_FILL ? "cursor-crosshair" : "cursor-none",
          )}
        />
        <VicoBrushCursor
          x={brushPointer?.x ?? 0}
          y={brushPointer?.y ?? 0}
          visible={showBrushFootprint}
          diameterPx={sketch.brushWeight}
          accentColor={sketch.color}
        />
      </div>
    </div>
  );
}
