import { useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { useEscapeKey } from "../shared/use-escape-key";
import { useVicoSketchUploadMutation } from "./use-vico-sketch-upload";
import VicoPublishPreview, {
  type VicoPublishCropPreviewHandle,
} from "./vico-publish-preview";
import VicoPublishFormFields from "./vico-publish-form-fields";

export type VicoPublishCapture = {
  /** Cropped WebP of the drawn region only (or full canvas if no ink detected). */
  blob: Blob;
  previewUrl: string;
  /** Matches blob pixel dimensions — drives Croppie viewport aspect. */
  cropAspectWidth: number;
  cropAspectHeight: number;
};

type Props = {
  open: boolean;
  capture: VicoPublishCapture | null;
  defaultTitle?: string;
  defaultAuthor?: string;
  onClose: () => void;
  onUploadSuccess: () => void;
};

export default function VicoPublishModal({
  open,
  capture,
  defaultTitle = "",
  defaultAuthor = "",
  onClose,
  onUploadSuccess,
}: Props) {
  const [title, setTitle] = useState(defaultTitle);
  const [author, setAuthor] = useState(defaultAuthor);
  const [cropperReady, setCropperReady] = useState(false);
  const [cropError, setCropError] = useState<string | null>(null);
  const cropPreviewRef = useRef<VicoPublishCropPreviewHandle>(null);

  const { mutate, reset, isPending, error } = useVicoSketchUploadMutation();

  useEffect(() => {
    if (!open) return;
    setTitle(defaultTitle);
    setAuthor(defaultAuthor);
    setCropperReady(false);
    setCropError(null);
    reset();
  }, [open, defaultTitle, defaultAuthor, reset]);

  const errorMessage = cropError ?? error?.message ?? null;

  const handleSubmit = useCallback(() => {
    if (!capture?.blob || !cropPreviewRef.current) {
      return;
    }
    setCropError(null);
    void cropPreviewRef.current.getCroppedWebpBlob().then(
      (blob) => {
        mutate(
          {
            blob,
            title: title.trim(),
            author: author.trim(),
          },
          {
            onSuccess: () => {
              onUploadSuccess();
              onClose();
            },
          },
        );
      },
      (err: unknown) => {
        setCropError(
          err instanceof Error ? err.message : "Could not export cropped image.",
        );
      },
    );
  }, [capture, title, author, mutate, onUploadSuccess, onClose]);

  useEscapeKey(open && !isPending, onClose);

  if (!open || !capture) return null;

  return (
    <div
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden overscroll-contain bg-ctp-crust/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vico-publish-title"
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
              id="vico-publish-title"
              className="font-capirola text-lg font-medium text-ctp-text"
            >
              Publish sketch
            </h2>
            <p className="mt-0.5 text-xs text-ctp-subtext0">
              Add a title and author, then upload your canvas capture.
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <VicoPublishPreview
              ref={cropPreviewRef}
              previewUrl={capture.previewUrl}
              cropAspectWidth={capture.cropAspectWidth}
              cropAspectHeight={capture.cropAspectHeight}
              onCropperReady={setCropperReady}
            />
            <VicoPublishFormFields
              title={title}
              author={author}
              onTitleChange={setTitle}
              onAuthorChange={setAuthor}
              disabled={isPending}
              errorMessage={errorMessage}
            />
          </div>

          <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-ctp-surface1 bg-ctp-base/50 px-4 py-3">
            <button
              type="button"
              disabled={isPending}
              className="rounded-lg border border-ctp-surface1 bg-ctp-mantle px-4 py-2 text-sm font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text disabled:opacity-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={
                isPending ||
                !cropperReady ||
                !title.trim() ||
                !author.trim()
              }
              className="rounded-lg border border-ctp-lavender/50 bg-ctp-lavender/20 px-4 py-2 text-sm font-medium text-ctp-lavender transition hover:bg-ctp-lavender/30 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSubmit}
            >
              {isPending ? "Uploading…" : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
