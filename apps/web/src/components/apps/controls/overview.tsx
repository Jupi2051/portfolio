import type { ReactNode } from "react"
import { formatDistanceToNow, format } from "date-fns"
import { motion, useReducedMotion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import { getVicoSketchWebpUrl } from "@/components/apps/vico/gallery/public-image-url"
import {
  ArrowRightIcon,
  CheckIcon,
  ExternalArrowIcon,
} from "@/components/ui/icons"
import { EASE_OUT } from "@/lib/motion"
import type { NavigateToPanel } from "./aritcle-controls/controls-panel-types"

const greeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Morning"
  if (hour < 18) return "Afternoon"
  return "Evening"
}

function StatCard({
  icon,
  value,
  label,
  detail,
  onClick,
  index,
}: {
  icon: string
  value: ReactNode
  label: string
  detail: ReactNode
  onClick: () => void
  index: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group flex min-w-0 flex-1 cursor-pointer flex-col gap-4.5 rounded-2xl border border-white/8 bg-white/3 p-4.5 text-left outline-none transition-[background-color,border-color] duration-150 ease-out-strong hover:border-white/14 hover:bg-white/5 focus-visible:border-holo-soft/60"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.08 + index * 0.05 }}
    >
      <span className="flex items-center justify-between">
        <img src={icon} alt="" className="size-7 object-contain" />
        <ExternalArrowIcon className="size-4 text-haze-dim transition-[color,translate] duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-holo-soft" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[40px] leading-11 font-light tracking-[-0.03em] text-moon-bright tabular-nums">
          {value}
        </span>
        <span className="text-sm leading-4.5 font-medium text-lilac">{label}</span>
        <span className="text-xs leading-4 text-haze-dim">{detail}</span>
      </span>
    </motion.button>
  )
}

export default function ControlsOverview({
  onNavigate,
}: {
  onNavigate: NavigateToPanel
}) {
  const trpc = useTRPC()
  const { data, isLoading, isError } = useQuery(
    trpc.controls.overview.queryOptions(),
  )
  const pending = data?.vico.pendingCount ?? 0

  return (
    <div className="flex h-full flex-col gap-7 overflow-y-auto bg-[radial-gradient(circle_at_15%_0%,rgba(140,142,255,0.12)_0%,rgba(23,22,42,0)_50%)] px-6 py-9 @2xl/appwindow:px-10">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-serif text-[46px] leading-12.5 tracking-[-0.01em] text-moon-bright">
          {greeting()}, Jupi.
        </h1>
        <p className="text-sm leading-5 text-haze">
          Here's what's waiting on the desk.
        </p>
      </div>

      {isError ? (
        <p className="rounded-2xl bg-melon/10 p-4 text-sm text-[#ffb3c2]">
          Couldn't load the overview — check that the server is running.
        </p>
      ) : isLoading || !data ? (
        <div className="flex flex-col gap-3.5">
          <div className="h-21 animate-pulse rounded-2xl bg-white/4" />
          <div className="flex gap-3.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-40 flex-1 animate-pulse rounded-2xl bg-white/4" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {pending > 0 ? (
            <motion.div
              className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-melon/30 bg-melon/8 py-4.5 pr-4.5 pl-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex shrink-0 -space-x-3.5">
                  {data.vico.previewImageIds.map((imageId) => (
                    <img
                      key={imageId}
                      src={getVicoSketchWebpUrl(imageId)}
                      alt=""
                      className="size-12 rounded-xl border-2 border-panel bg-ink-deep object-contain"
                    />
                  ))}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[15px] leading-5 font-semibold text-moon-bright">
                    {pending} {pending === 1 ? "sketch is" : "sketches are"} waiting
                    for review
                  </span>
                  {data.vico.newestAuthor && data.vico.newestAt && (
                    <span className="truncate text-[13px] leading-4.5 text-[#d9b3c2]">
                      Newest from {data.vico.newestAuthor},{" "}
                      {formatDistanceToNow(new Date(data.vico.newestAt), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("vico")}
                className="flex h-9.5 cursor-pointer items-center gap-1.5 rounded-[10px] bg-melon px-3.5 text-[13px] font-semibold text-white transition-[background-color,scale] duration-150 ease-out-strong hover:bg-[#ff7391] active:scale-[0.97]"
              >
                Review now
                <ArrowRightIcon className="size-3.5" />
              </button>
            </motion.div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-mint/15">
                <CheckIcon className="size-3.5 text-mint" />
              </span>
              <span className="text-sm text-lilac">
                Nothing waiting — the Vico gallery is all caught up.
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-3.5">
            <StatCard
              index={0}
              icon="/Imgs/DesktopApps/Notepad.webp"
              value={data.articles.count}
              label="Articles"
              detail={
                data.articles.lastPublishedAt
                  ? `Last published ${format(new Date(data.articles.lastPublishedAt), "MMM d")}`
                  : "Nothing published yet"
              }
              onClick={() => onNavigate("articles")}
            />
            <StatCard
              index={1}
              icon="/Imgs/DesktopApps/Rivals.webp"
              value={data.rivals.total}
              label="Rivals players"
              detail={`${data.rivals.active} in the pool`}
              onClick={() => onNavigate("rivals-randomizer")}
            />
            <StatCard
              index={2}
              icon="/Imgs/DesktopApps/ValorantRandomizer.webp"
              value={data.valorant.total}
              label="Valorant players"
              detail={`${data.valorant.active} in the pool`}
              onClick={() => onNavigate("valorant-randomizer")}
            />
          </div>
        </>
      )}
    </div>
  )
}
