import type { UseQueryResult } from "@tanstack/react-query"
import { AnimatePresence } from "framer-motion"
import { CheckIcon, CropIcon, TrashIcon } from "@/components/ui/icons"
import { primaryButtonClassName } from "../controls-panel-header"
import VicoSketchCard, {
  dangerIconButtonClassName,
  iconButtonClassName,
} from "./vico-sketch-card"
import type { SketchWithImage } from "./sketch-types"

type Props = {
  /** Passed to sketch image URLs so cached WebPs reload after server-side crop. */
  sketchImageCacheBust: number
  pendingQuery: UseQueryResult<
    {
      id: string
      title: string
      author: string
      createdAt: string
      imageId: string | null
    }[],
    unknown
  >
  pending: (SketchWithImage & { createdAt?: string })[]
  onApprove: (id: string) => void
  onDelete: (id: string) => void
  onOpenCrop: (sketch: SketchWithImage) => void
  isBusy: boolean
}

export default function VicoPendingSketchesColumn({
  sketchImageCacheBust,
  pendingQuery,
  pending,
  onApprove,
  onDelete,
  onOpenCrop,
  isBusy,
}: Props) {
  if (pendingQuery.isLoading) {
    return (
      <ul className="grid grid-cols-1 gap-4 @xl/appwindow:grid-cols-2 @4xl/appwindow:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <li key={i} className="h-72 animate-pulse rounded-2xl bg-white/4" />
        ))}
      </ul>
    )
  }

  if (pendingQuery.isError) {
    return (
      <p className="rounded-xl bg-melon/10 px-4 py-3 text-sm text-[#ffb3c2]">
        Couldn't load pending sketches — are you still signed in?
      </p>
    )
  }

  if (pending.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-dashed border-white/12 px-6 py-12 text-center">
        <span className="font-serif text-3xl text-moon-bright italic">
          All caught up.
        </span>
        <span className="text-sm text-haze">
          New sketches from the Vico app will show up here for review.
        </span>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 @xl/appwindow:grid-cols-2 @4xl/appwindow:grid-cols-3">
      <AnimatePresence initial={false} mode="popLayout">
        {pending.map((sketch) => (
          <VicoSketchCard
            key={sketch.id}
            sketch={sketch}
            cacheBust={sketchImageCacheBust}
            actions={
              <>
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => onApprove(sketch.id)}
                  className={`${primaryButtonClassName} h-8.5 flex-1 rounded-[9px]`}
                >
                  <CheckIcon className="size-3.25" />
                  Approve
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  title="Crop image"
                  aria-label="Crop image"
                  onClick={() => onOpenCrop(sketch)}
                  className={iconButtonClassName}
                >
                  <CropIcon className="size-3.75" />
                </button>
                <button
                  type="button"
                  disabled={isBusy}
                  title="Delete sketch"
                  aria-label="Delete sketch"
                  onClick={() => onDelete(sketch.id)}
                  className={dangerIconButtonClassName}
                >
                  <TrashIcon className="size-3.75" />
                </button>
              </>
            }
          />
        ))}
      </AnimatePresence>
    </ul>
  )
}
