import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { useMutation } from "@tanstack/react-query";
import { CropIcon } from "@/components/ui/icons";
import { primaryButtonClassName, secondaryButtonClassName } from "../controls-panel-header";
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
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden overscroll-contain bg-[rgba(10,9,22,0.55)] backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vico-crop-modal-title"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            "flex w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/12 bg-[rgba(20,19,36,0.94)] shadow-[0_30px_80px_rgba(6,5,16,0.6)] backdrop-blur-2xl",
            "max-h-[min(90vh,720px,calc(100dvh-2rem))] min-h-0",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="shrink-0 px-6 pt-5.5 pb-3">
            <h2
              id="vico-crop-modal-title"
              className="font-serif text-[28px] leading-8 text-moon-bright italic"
            >
              Crop image
            </h2>
            <p className="mt-1 line-clamp-2 text-[13px] text-haze">
              {title}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-2">
            {dimsError ? (
              <p className="rounded-xl bg-melon/10 px-3.5 py-2.5 text-[13px] text-[#ffb3c2]">
                {dimsError}
              </p>
            ) : !dims ? (
              <p className="text-sm text-haze-dim">Loading image…</p>
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
              <p className="mt-3 rounded-xl bg-melon/10 px-3.5 py-2.5 text-[13px] text-[#ffb3c2]">
                {localError}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-wrap justify-end gap-2 px-6 pt-3 pb-5.5">
            <button
              type="button"
              disabled={cropMutation.isPending}
              className={secondaryButtonClassName}
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
              className={primaryButtonClassName}
              onClick={handleSave}
            >
              <CropIcon className="size-3.5" />
              {cropMutation.isPending ? "Saving…" : "Save crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
