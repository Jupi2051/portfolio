import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrop } from "@fortawesome/free-solid-svg-icons";
import VicoImageCropper, {
  type VicoImageCropperHandle,
} from "@/components/apps/vico/shared/vico-image-cropper";
import { useTRPC } from "@/lib/trpc/trpc";

type Props = {
  open: boolean;
  imageId: string;
  title: string;
  imageUrl: string;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
};

export default function VicoSketchCropModal({
  open,
  imageId,
  title,
  imageUrl,
  onClose,
  onSaved,
}: Props) {
  const trpc = useTRPC();
  const cropperRef = useRef<VicoImageCropperHandle>(null);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [dimsError, setDimsError] = useState<string | null>(null);
  const [cropperReady, setCropperReady] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const cropMutation = useMutation(trpc.vico.cropSketchImage.mutationOptions());

  useEffect(() => {
    if (!open) {
      setDims(null);
      setDimsError(null);
      setCropperReady(false);
      setLocalError(null);
      return;
    }

    setDims(null);
    setDimsError(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setDims({ width: img.naturalWidth, height: img.naturalHeight });
      } else {
        setDimsError("Invalid image size.");
      }
    };
    img.onerror = () => {
      setDimsError("Could not load image for cropping.");
    };
    img.src = imageUrl;
  }, [open, imageUrl]);

  const handleSave = useCallback(() => {
    if (!cropperRef.current) return;
    setLocalError(null);
    try {
      const crop = cropperRef.current.getSourceCropRect();
      cropMutation.mutate(
        { imageId, crop },
        {
          onSuccess: () => {
            void (async () => {
              await Promise.resolve(onSaved());
              onClose();
            })();
          },
          onError: (err: unknown) => {
            const message = err instanceof Error ? err.message : "Crop failed";
            setLocalError(message);
          },
        },
      );
    } catch {
      setLocalError("Cropper is not ready.");
    }
  }, [imageId, cropMutation, onSaved, onClose]);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden overscroll-contain bg-ctp-crust/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vico-crop-modal-title"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            "flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-ctp-surface1 bg-ctp-mantle shadow-xl ring-1 ring-black/20",
            "max-h-[min(90vh,720px,calc(100dvh-2rem))] min-h-0",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="shrink-0 border-b border-ctp-surface1 px-4 py-3">
            <h2
              id="vico-crop-modal-title"
              className="font-capirola text-lg font-medium text-ctp-text"
            >
              Crop image
            </h2>
            <p className="mt-0.5 line-clamp-2 text-xs text-ctp-subtext0">
              {title}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {dimsError ? (
              <p className="rounded-lg border border-ctp-red/40 bg-ctp-red/10 px-3 py-2 text-sm text-ctp-red">
                {dimsError}
              </p>
            ) : !dims ? (
              <p className="text-sm text-ctp-subtext0">Loading image…</p>
            ) : (
              <VicoImageCropper
                ref={cropperRef}
                imageUrl={imageUrl}
                aspectWidth={dims.width}
                aspectHeight={dims.height}
                onCropperReady={setCropperReady}
                boundaryMaxHeightPx={360}
              />
            )}

            {localError ? (
              <p className="mt-3 rounded-lg border border-ctp-red/40 bg-ctp-red/10 px-3 py-2 text-sm text-ctp-red">
                {localError}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-ctp-surface1 bg-ctp-base/50 px-4 py-3">
            <button
              type="button"
              disabled={cropMutation.isPending}
              className="rounded-lg border border-ctp-surface1 bg-ctp-mantle px-4 py-2 text-sm font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text disabled:opacity-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={
                cropMutation.isPending ||
                !cropperReady ||
                !dims ||
                !!dimsError
              }
              className="inline-flex items-center gap-2 rounded-lg border border-ctp-teal/50 bg-ctp-teal/20 px-4 py-2 text-sm font-medium text-ctp-teal transition hover:bg-ctp-teal/30 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faCrop} className="text-sm" />
              {cropMutation.isPending ? "Saving…" : "Save crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
