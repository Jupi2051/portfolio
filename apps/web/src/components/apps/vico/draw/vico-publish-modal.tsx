import { useCallback, useEffect, useRef, useState } from "react"
import cn from "classnames"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpIcon, SparkleIcon } from "@/components/ui/icons"
import { enterTransition, exitTransition } from "@/lib/motion"
import { useEscapeKey } from "../shared/use-escape-key"
import { useVicoSketchUploadMutation } from "./use-vico-sketch-upload"
import VicoPublishPreview, {
  type VicoPublishCropPreviewHandle,
} from "./vico-publish-preview"
import VicoPublishFormFields from "./vico-publish-form-fields"

export type VicoPublishCapture = {
  /** Cropped WebP of the drawn region only (or full canvas if no ink detected). */
  blob: Blob
  previewUrl: string
  /** Matches blob pixel dimensions — drives Croppie viewport aspect. */
  cropAspectWidth: number
  cropAspectHeight: number
}

type Props = {
  open: boolean
  capture: VicoPublishCapture | null
  defaultTitle?: string
  defaultAuthor?: string
  onClose: () => void
  onUploadSuccess: () => void
}

export default function VicoPublishModal({
  open,
  capture,
  defaultTitle = "",
  defaultAuthor = "",
  onClose,
  onUploadSuccess,
}: Props) {
  const [title, setTitle] = useState(defaultTitle)
  const [author, setAuthor] = useState(defaultAuthor)
  const [cropperReady, setCropperReady] = useState(false)
  const [cropError, setCropError] = useState<string | null>(null)
  const cropPreviewRef = useRef<VicoPublishCropPreviewHandle>(null)

  const { mutate, reset, isPending, error } = useVicoSketchUploadMutation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    setTitle(defaultTitle)
    setAuthor(defaultAuthor)
    setCropperReady(false)
    setCropError(null)
    reset()
  }, [open, defaultTitle, defaultAuthor, reset])

  const errorMessage = cropError ?? error?.message ?? null

  const handleSubmit = useCallback(() => {
    if (!capture?.blob || !cropPreviewRef.current) {
      return
    }
    setCropError(null)
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
              onUploadSuccess()
              onClose()
            },
          },
        )
      },
      (err: unknown) => {
        setCropError(
          err instanceof Error
            ? err.message
            : "Could not export cropped image.",
        )
      },
    )
  }, [capture, title, author, mutate, onUploadSuccess, onClose])

  useEscapeKey(open && !isPending, onClose)

  const canSubmit =
    !isPending && cropperReady && !!title.trim() && !!author.trim()
  const hidden = { opacity: 0, y: reduceMotion ? 0 : 8, scale: 0.97 }

  return (
    <AnimatePresence>
      {open && capture ? (
        <motion.div
          key="vico-publish"
          className="absolute inset-0 z-50"
          exit={{ opacity: 1, transition: exitTransition }}
        >
          <motion.div
            className="absolute inset-0 bg-[rgba(10,9,22,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: enterTransition }}
            exit={{ opacity: 0, transition: exitTransition }}
          />
          <div className="absolute inset-0 overflow-y-auto overscroll-contain">
            <div
              className="flex min-h-full items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget && !isPending) onClose()
              }}
            >
              <motion.form
                role="dialog"
                aria-modal="true"
                aria-labelledby="vico-publish-title"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (canSubmit) handleSubmit()
                }}
                className={cn(
                  "relative flex w-full max-w-170 flex-col overflow-hidden rounded-3xl border border-white/12 bg-[rgba(20,19,36,0.96)] shadow-[0_30px_80px_rgba(6,5,16,0.6)]",
                  "@2xl/appwindow:flex-row",
                )}
                initial={hidden}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: enterTransition,
                }}
                exit={{ ...hidden, transition: exitTransition }}
              >
                <div className="flex flex-col gap-3 border-b border-white/8 bg-ink-deep p-5.5 @2xl/appwindow:w-80 @2xl/appwindow:shrink-0 @2xl/appwindow:border-r @2xl/appwindow:border-b-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] leading-3.5 font-semibold tracking-[0.14em] text-haze uppercase">
                      Crop
                    </span>
                    <span className="text-xs leading-4 text-haze-dim">
                      Drag to frame · slide to zoom
                    </span>
                  </div>
                  <VicoPublishPreview
                    ref={cropPreviewRef}
                    previewUrl={capture.previewUrl}
                    cropAspectWidth={capture.cropAspectWidth}
                    cropAspectHeight={capture.cropAspectHeight}
                    onCropperReady={setCropperReady}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4.5 px-7 pt-6.5 pb-6">
                  <h2
                    id="vico-publish-title"
                    className="font-serif text-[32px] leading-9 text-moon-bright italic"
                  >
                    Publish your sketch
                  </h2>
                  <VicoPublishFormFields
                    title={title}
                    author={author}
                    onTitleChange={setTitle}
                    onAuthorChange={setAuthor}
                    disabled={isPending}
                    errorMessage={errorMessage}
                  />
                  <p className="flex items-start gap-2.25 rounded-xl border border-spark/20 bg-spark/8 px-3 py-2.75 text-[13px] leading-4.5 text-[#e9ddba]">
                    <SparkleIcon className="mt-0.5 size-3.5 shrink-0 text-spark" />
                    Sketches show up in the gallery once Jupi gives them a quick
                    look.
                  </p>
                  <div className="mt-auto flex gap-2 pt-1">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={onClose}
                      className="h-10.5 shrink-0 cursor-pointer rounded-xl border border-white/12 px-4 text-sm leading-4.5 font-medium text-lilac transition-[background-color] duration-150 ease-out-strong hover:bg-white/6 disabled:opacity-50"
                    >
                      Keep drawing
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={cn(
                        "flex h-10.5 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-holo text-sm leading-4.5 font-semibold text-ink-deep",
                        "transition-[background-color,scale,opacity] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.97]",
                        "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-holo disabled:active:scale-100",
                      )}
                    >
                      {isPending ? (
                        <span
                          className="size-3.75 animate-spin rounded-full border-2 border-ink-deep border-t-transparent"
                          aria-hidden
                        />
                      ) : (
                        <ArrowUpIcon className="size-3.75" />
                      )}
                      {isPending ? "Publishing…" : "Publish"}
                    </button>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
