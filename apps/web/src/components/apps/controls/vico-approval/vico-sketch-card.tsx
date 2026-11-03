import type { ReactNode } from "react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { getVicoSketchWebpUrl } from "@/components/apps/vico/gallery/public-image-url"
import { EASE_OUT } from "@/lib/motion"
import type { SketchWithImage } from "./sketch-types"

type Props = {
  sketch: SketchWithImage & { createdAt?: string }
  cacheBust: number
  actions: ReactNode
}

/** A sketch on a white "paper" well, with its title, author and actions. */
export default function VicoSketchCard({ sketch, cacheBust, actions }: Props) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: EASE_OUT } }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/3"
    >
      <div className="flex aspect-4/3 items-center justify-center bg-paper">
        <img
          src={getVicoSketchWebpUrl(sketch.imageId, cacheBust)}
          alt={sketch.title}
          className="size-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-3 p-3.5">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm leading-4.5 font-semibold text-moon">
            {sketch.title}
          </span>
          <span className="truncate text-xs leading-4 text-haze-dim">
            by {sketch.author}
            {sketch.createdAt &&
              ` · ${formatDistanceToNow(new Date(sketch.createdAt), { addSuffix: true })}`}
          </span>
        </div>
        <div className="flex gap-1.5">{actions}</div>
      </div>
    </motion.li>
  )
}

export const iconButtonClassName =
  "flex size-8.5 shrink-0 cursor-pointer items-center justify-center rounded-[9px] border border-white/10 text-lilac transition-[background-color,scale] duration-150 ease-out-strong hover:bg-white/6 active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-50"

export const dangerIconButtonClassName =
  "flex size-8.5 shrink-0 cursor-pointer items-center justify-center rounded-[9px] border border-melon/30 text-[#ff8fa6] transition-[background-color,color,scale] duration-150 ease-out-strong hover:bg-melon hover:text-white active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-50"
