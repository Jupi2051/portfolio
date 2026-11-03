import { motion } from "framer-motion"
import cn from "classnames"
import WallpaperArtistCredit from "@/components/apps/wallpapers-rocket/wallpaper-artist-credit"
import type { WallpaperArtist, WallpaperKey } from "@/hooks/use-background"
import { CheckIcon } from "@/components/ui/icons"
import { EASE_IN_OUT } from "@/lib/motion"

export type WallpaperPrintItem = {
  key: WallpaperKey
  title: string
  artist: WallpaperArtist
  imageUrl: string
}

type WallpaperPrintProps = {
  item: WallpaperPrintItem
  index: number
  isActive: boolean
  onSelect: (key: WallpaperKey) => void
}

/**
 * A wallpaper shown as a white-framed print, tilted like it's pinned to a
 * wall. Hovering straightens and lifts it; the "On your desktop" tag slides
 * between prints via a shared layoutId.
 */
function WallpaperPrint({ item, index, isActive, onSelect }: WallpaperPrintProps) {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        aria-pressed={isActive}
        aria-label={`Set wallpaper to ${item.title}`}
        onClick={() => onSelect(item.key)}
        className={cn(
          "group relative flex rounded-[18px] p-2 outline-none",
          "transition-[rotate,translate,scale,box-shadow] duration-200 ease-out-strong",
          "hover:-translate-y-1 hover:rotate-0 active:scale-[0.98] active:duration-100 motion-reduce:rotate-0",
          index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]",
          isActive
            ? "cursor-default bg-paper shadow-[0_24px_50px_rgba(6,5,16,0.55),0_0_0_4px_rgba(140,142,255,0.35)]"
            : "cursor-pointer bg-[#e4e1fa] shadow-[0_16px_36px_rgba(6,5,16,0.45)] focus-visible:shadow-[0_16px_36px_rgba(6,5,16,0.45),0_0_0_4px_rgba(140,142,255,0.35)]",
        )}
      >
        <img
          src={item.imageUrl}
          alt=""
          draggable={false}
          className="aspect-374/210 w-full rounded-[11px] object-cover"
        />
        {isActive && (
          <motion.span
            layoutId="wallpaper-desktop-tag"
            transition={{ duration: 0.3, ease: EASE_IN_OUT }}
            className="absolute -top-3 left-4.5 flex h-6.5 items-center gap-1.5 rounded-full bg-holo pr-2.75 pl-2.25 shadow-[0_6px_14px_rgba(6,5,16,0.35)]"
          >
            <CheckIcon className="size-3 text-white" />
            <span className="text-xs leading-4 font-semibold text-white">
              On your desktop
            </span>
          </motion.span>
        )}
      </button>

      <div className="flex flex-col gap-0.5 px-1.5">
        <span
          className={cn(
            "font-serif text-[28px] leading-8",
            isActive ? "text-moon-bright" : "text-lilac",
          )}
        >
          {item.title}
        </span>
        <WallpaperArtistCredit
          artist={item.artist}
          className={cn(
            "text-[13px] leading-4.5",
            isActive ? "text-haze" : "text-[#9a97be]",
          )}
        />
      </div>
    </div>
  )
}

export default WallpaperPrint
