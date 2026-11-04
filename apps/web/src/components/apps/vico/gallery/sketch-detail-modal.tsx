import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { CloseIcon } from "@/components/ui/icons"
import { enterTransition, exitTransition } from "@/lib/motion"
import { useEscapeKey } from "../shared/use-escape-key"

export type VicoSketchDetail = {
  id: string
  title: string
  author: string
  createdAt: string
  imageId: string
}

type Props = {
  sketch: VicoSketchDetail | null
  imageUrl: string | null
  onClose: () => void
}

export default function VicoSketchDetailModal({
  sketch,
  imageUrl,
  onClose,
}: Props) {
  const reduceMotion = useReducedMotion()
  useEscapeKey(!!sketch, onClose)

  const hidden = { opacity: 0, y: reduceMotion ? 0 : 8, scale: 0.97 }

  return (
    <AnimatePresence>
      {sketch && imageUrl ? (
        <motion.div
          key={sketch.id}
          className="absolute inset-0 z-60 flex items-center justify-center p-4"
          exit={{ opacity: 1, transition: exitTransition }}
        >
          <motion.div
            className="absolute inset-0 bg-[rgba(10,9,22,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: enterTransition }}
            exit={{ opacity: 0, transition: exitTransition }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vico-detail-title"
            className="relative flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-white/12 bg-[rgba(20,19,36,0.96)] shadow-[0_30px_80px_rgba(6,5,16,0.6)]"
            initial={hidden}
            animate={{ opacity: 1, y: 0, scale: 1, transition: enterTransition }}
            exit={{ ...hidden, transition: exitTransition }}
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-5.5 pb-4">
              <div className="flex min-w-0 flex-col gap-1">
                <h2
                  id="vico-detail-title"
                  className="font-serif text-[30px] leading-8.5 text-moon-bright italic wrap-anywhere"
                >
                  {sketch.title}
                </h2>
                <p className="text-sm leading-5 text-haze">
                  by <span className="font-medium text-holo-soft">{sketch.author}</span>
                  <span className="mx-1.5">·</span>
                  <time dateTime={sketch.createdAt}>
                    {new Date(sketch.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-white/10 text-lilac transition-[background-color] duration-150 ease-out-strong hover:bg-white/6"
              >
                <CloseIcon className="size-3.5" />
              </button>
            </div>
            <div className="mx-6 mb-6 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-ink-deep bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[16px_16px]">
              <img
                src={imageUrl}
                alt={sketch.title}
                className="max-h-[min(60vh,560px)] w-full object-contain p-5"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
