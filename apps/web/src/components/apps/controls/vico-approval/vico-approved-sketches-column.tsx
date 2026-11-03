import type { UseQueryResult } from "@tanstack/react-query"
import { AnimatePresence } from "framer-motion"
import { CropIcon } from "@/components/ui/icons"
import { secondaryButtonClassName } from "../controls-panel-header"
import VicoSketchCard, { iconButtonClassName } from "./vico-sketch-card"
import type { SketchWithImage } from "./sketch-types"

type Props = {
  /** Passed to sketch image URLs so cached WebPs reload after server-side crop. */
  sketchImageCacheBust: number
  approvedQuery: UseQueryResult<
    {
      id: string
      title: string
      author: string
      createdAt: string
      imageId: string | null
    }[],
    unknown
  >
  approved: (SketchWithImage & { createdAt?: string })[]
  onRevokeApproval: (id: string) => void
  onOpenCrop: (sketch: SketchWithImage) => void
  isMutating: boolean
}

export default function VicoApprovedSketchesColumn({
  sketchImageCacheBust,
  approvedQuery,
  approved,
  onRevokeApproval,
  onOpenCrop,
  isMutating,
}: Props) {
  if (approvedQuery.isLoading) {
    return (
      <ul className="grid grid-cols-2 gap-4 @xl/appwindow:grid-cols-3 @4xl/appwindow:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="h-56 animate-pulse rounded-2xl bg-white/4" />
        ))}
      </ul>
    )
  }

  if (approvedQuery.isError) {
    return (
      <p className="rounded-xl bg-melon/10 px-4 py-3 text-sm text-[#ffb3c2]">
        Couldn't load the gallery.
      </p>
    )
  }

  if (approved.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/12 px-6 py-12 text-center text-sm text-haze">
        Nothing in the public gallery yet.
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-4 @xl/appwindow:grid-cols-3 @4xl/appwindow:grid-cols-4">
      <AnimatePresence initial={false} mode="popLayout">
        {approved.map((sketch) => (
          <VicoSketchCard
            key={sketch.id}
            sketch={sketch}
            cacheBust={sketchImageCacheBust}
            actions={
              <>
                <button
                  type="button"
                  disabled={isMutating}
                  onClick={() => onRevokeApproval(sketch.id)}
                  className={`${secondaryButtonClassName} flex-1 justify-center`}
                >
                  Hide from gallery
                </button>
                <button
                  type="button"
                  disabled={isMutating}
                  title="Crop image"
                  aria-label="Crop image"
                  onClick={() => onOpenCrop(sketch)}
                  className={iconButtonClassName}
                >
                  <CropIcon className="size-3.75" />
                </button>
              </>
            }
          />
        ))}
      </AnimatePresence>
    </ul>
  )
}
