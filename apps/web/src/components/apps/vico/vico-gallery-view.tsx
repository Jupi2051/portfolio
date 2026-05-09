import { useState } from "react"
import cn from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { useTRPC } from "@/lib/trpc/trpc"
import { useQuery } from "@tanstack/react-query"
import { getVicoSketchWebpUrl } from "./vico-public-image-url"
import VicoSketchDetailModal, {
  type VicoSketchDetail,
} from "./vico-sketch-detail-modal"

type Props = {
  onGoDraw: () => void
}

export default function VicoGalleryView({ onGoDraw }: Props) {
  const trpc = useTRPC()
  const listQuery = useQuery(trpc.vico.list.queryOptions())
  const [selected, setSelected] = useState<VicoSketchDetail | null>(null)

  const sketchesWithImages =
    listQuery.data?.filter((s): s is typeof s & { imageId: string } =>
      Boolean(s.imageId),
    ) ?? []

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-ctp-base text-ctp-text">
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {listQuery.isLoading ? (
          <div className="flex h-40 items-center justify-center text-sm text-ctp-subtext0">
            Loading sketches…
          </div>
        ) : listQuery.isError ? (
          <p className="rounded-lg border border-ctp-red/40 bg-ctp-red/10 px-3 py-2 text-sm text-ctp-red">
            Could not load the gallery. Try again later.
          </p>
        ) : sketchesWithImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ctp-surface1 bg-ctp-mantle/50 px-6 py-16 text-center">
            <p className="max-w-sm text-sm text-ctp-subtext1">
              No approved sketches yet. Be the first to draw and publish one.
            </p>
            <button
              type="button"
              onClick={onGoDraw}
              className="cursor-pointer rounded-lg border border-ctp-lavender/50 bg-ctp-lavender/15 px-4 py-2 text-sm font-medium text-ctp-lavender transition hover:bg-ctp-lavender/25"
            >
              Start drawing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {sketchesWithImages.map((sketch) => {
              const url = getVicoSketchWebpUrl(sketch.imageId)
              const detail: VicoSketchDetail = {
                id: sketch.id,
                title: sketch.title,
                author: sketch.author,
                createdAt: sketch.createdAt,
                imageId: sketch.imageId,
              }
              return (
                <button
                  key={sketch.id}
                  type="button"
                  className={cn(
                    "group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-ctp-surface1 bg-ctp-crust text-left shadow-sm outline-none transition",
                    "focus-visible:ring-2 focus-visible:ring-ctp-lavender/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base",
                  )}
                  onClick={() => setSelected(detail)}
                >
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-black/0 transition duration-200 group-hover:bg-black/55"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 bg-linear-to-t from-black/85 via-black/35 to-transparent px-3 pb-3 pt-10">
                    <span className="line-clamp-2 font-capirola text-xs font-semibold text-ctp-text drop-shadow-md">
                      {sketch.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11px] text-ctp-subtext0 drop-shadow-md">
                      {sketch.author}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-ctp-surface1 bg-ctp-mantle px-4 py-3">
        <div className="flex flex-col items-center gap-3">
          <p className="w-full text-center text-sm text-ctp-subtext1">
            Draw something and share it with the world :D
          </p>
          <button
            type="button"
            onClick={onGoDraw}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-ctp-lavender bg-ctp-lavender px-4 py-2.5 text-sm font-semibold text-ctp-crust shadow-md transition",
              "hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-lavender/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-mantle",
            )}
          >
            <FontAwesomeIcon icon={faPen} className="text-base" />
            Draw your own
          </button>
        </div>
      </div>

      <VicoSketchDetailModal
        sketch={selected}
        imageUrl={selected ? getVicoSketchWebpUrl(selected.imageId) : null}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
