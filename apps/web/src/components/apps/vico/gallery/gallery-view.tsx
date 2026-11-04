import { useState } from "react"
import cn from "classnames"
import { useTRPC } from "@/lib/trpc/trpc"
import { useQuery } from "@tanstack/react-query"
import { PencilIcon } from "@/components/ui/icons"
import { getVicoSketchWebpUrl } from "./public-image-url"
import VicoSketchDetailModal, {
  type VicoSketchDetail,
} from "./sketch-detail-modal"

type Props = {
  onGoDraw: () => void
}

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" })

export default function VicoGalleryView({ onGoDraw }: Props) {
  const trpc = useTRPC()
  const listQuery = useQuery(trpc.vico.list.queryOptions())
  const [selected, setSelected] = useState<VicoSketchDetail | null>(null)

  const sketches =
    listQuery.data?.filter((s): s is typeof s & { imageId: string } =>
      Boolean(s.imageId),
    ) ?? []

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-panel text-moon">
      {/* Glow lives on the scroller (scrolling with it) so it fades out
          instead of ending in a hard line under the header. */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(ellipse_70%_100%_at_10%_0%,rgba(140,142,255,0.14)_0%,rgba(23,22,42,0)_100%)] bg-size-[100%_300px] bg-local bg-no-repeat">
        <header className="flex flex-wrap items-end justify-between gap-5 px-5 pt-7 pb-5 @xl/appwindow:px-8">
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-[44px] leading-11.5 tracking-[-0.01em] text-moon-bright italic">
              Vico
            </h1>
            <p className="text-sm leading-5 text-haze">
              Little drawings left by visitors
              {sketches.length > 0 ? (
                <>
                  {" · "}
                  <span className="font-semibold text-holo-soft">
                    {sketches.length} {sketches.length === 1 ? "sketch" : "sketches"}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          <DrawButton onClick={onGoDraw} />
        </header>

        <div className="px-5 pb-7 @xl/appwindow:px-8">
          {listQuery.isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-2xl border border-white/8 bg-ink-deep"
                />
              ))}
            </div>
          ) : listQuery.isError ? (
            <p
              role="alert"
              className="rounded-xl border border-melon/35 bg-melon/10 px-4 py-3 text-sm text-[#FF8FA6]"
            >
              Couldn't load the gallery. Try again in a bit.
            </p>
          ) : sketches.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
              <p className="font-serif text-[26px] leading-8 text-moon-bright italic">
                The walls are still bare
              </p>
              <p className="max-w-xs text-sm leading-5 text-haze">
                No sketches have been approved yet. Be the first to leave one.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
              {sketches.map((sketch) => (
                <li key={sketch.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setSelected({
                        id: sketch.id,
                        title: sketch.title,
                        author: sketch.author,
                        createdAt: sketch.createdAt,
                        imageId: sketch.imageId,
                      })
                    }
                    className={cn(
                      "group relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-ink-deep text-left outline-none",
                      "transition-[border-color,translate] duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-holo-soft/45",
                      "focus-visible:border-holo-soft/70 focus-visible:shadow-[0_0_0_4px_rgba(140,142,255,0.18)]",
                    )}
                  >
                    <img
                      src={getVicoSketchWebpUrl(sketch.imageId)}
                      alt={sketch.title}
                      loading="lazy"
                      draggable={false}
                      className="size-full object-contain p-4"
                    />
                    {/* Caption rises in on hover; always shown on touch. */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-[linear-gradient(0deg,rgba(10,9,22,0.92)_0%,rgba(10,9,22,0.55)_45%,rgba(10,9,22,0)_100%)] px-3.5 pt-12 pb-3",
                        "translate-y-1 opacity-0 transition-[opacity,translate] duration-200 ease-out-strong",
                        "group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
                        "pointer-coarse:translate-y-0 pointer-coarse:opacity-100",
                      )}
                    >
                      <span className="truncate text-sm leading-4.5 font-semibold text-moon-bright">
                        {sketch.title}
                      </span>
                      <span className="truncate text-xs leading-4 text-haze">
                        {sketch.author} · {shortDate(sketch.createdAt)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
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

function DrawButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10.5 cursor-pointer items-center gap-2 rounded-xl bg-holo pr-4 pl-3.5 text-sm leading-4.5 font-semibold text-ink-deep shadow-[0_10px_24px_rgba(140,142,255,0.25)] outline-none",
        "transition-[background-color,scale] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.97]",
        "focus-visible:shadow-[0_0_0_4px_rgba(140,142,255,0.3)]",
      )}
    >
      <PencilIcon className="size-4" />
      Draw your own
    </button>
  )
}
