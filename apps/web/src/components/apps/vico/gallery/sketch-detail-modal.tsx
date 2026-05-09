import cn from "classnames"
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
  useEscapeKey(!!sketch, onClose)

  if (!sketch || !imageUrl) return null

  const created = new Date(sketch.createdAt)

  return (
    <div
      className="absolute inset-0 z-60 flex items-center justify-center bg-ctp-crust/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vico-detail-title"
      onClick={onClose}
    >
      <div
        className={cn(
          "flex max-h-[min(92vh,900px)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-ctp-surface1 bg-ctp-mantle shadow-xl ring-1 ring-black/25",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-ctp-surface1 px-4 py-3">
          <h2
            id="vico-detail-title"
            className="font-capirola text-lg font-semibold text-ctp-text"
          >
            {sketch.title}
          </h2>
          <p className="mt-1 text-sm text-ctp-subtext1">
            by <span className="text-ctp-lavender">{sketch.author}</span>
            <span className="mx-2 text-ctp-overlay0">·</span>
            <time dateTime={sketch.createdAt}>
              {created.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-ctp-crust p-3">
          <img
            src={imageUrl}
            alt=""
            className="mx-auto max-h-[min(70vh,640px)] w-full rounded-lg object-contain shadow-inner"
          />
        </div>
        <div className="border-t border-ctp-surface1 bg-ctp-base/60 px-4 py-3">
          <button
            type="button"
            className="w-full cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-mantle px-4 py-2 text-sm font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
