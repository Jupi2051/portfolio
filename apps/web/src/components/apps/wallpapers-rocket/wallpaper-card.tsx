import WallpaperArtistCredit from "@/components/apps/wallpapers-rocket/wallpaper-artist-credit"
import { galleryItemVariants } from "@/components/apps/wallpapers-rocket/animations"
import type { WallpaperArtist, WallpaperKey } from "@/hooks/use-background"
import cn from "classnames"
import { motion } from "framer-motion"

export type WallpaperCardItem = {
  key: WallpaperKey
  title: string
  artist: WallpaperArtist
  imageUrl: string
}

type WallpaperCardProps = {
  item: WallpaperCardItem
  isActive: boolean
  onSelect: (key: WallpaperKey) => void
}

function WallpaperCard({ item, isActive, onSelect }: WallpaperCardProps) {
  return (
    <motion.button
      type="button"
      variants={galleryItemVariants}
      onClick={() => onSelect(item.key)}
      whileHover={isActive ? undefined : { scale: 1.02 }}
      whileTap={isActive ? undefined : { scale: 0.98 }}
      aria-pressed={isActive}
      aria-label={`Set wallpaper to ${item.title}`}
      className={cn(
        "group relative w-64 shrink-0 overflow-hidden rounded-xl border-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ctp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base",
        isActive
          ? "cursor-default border-ctp-mauve shadow-lg shadow-ctp-mauve/10"
          : "cursor-pointer border-ctp-surface1 hover:border-ctp-surface2",
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-ctp-surface0">
        <img
          src={item.imageUrl}
          alt=""
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            !isActive && "group-hover:scale-105",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 transition-colors",
            isActive
              ? "bg-ctp-mauve/10"
              : "bg-ctp-crust/0 group-hover:bg-ctp-crust/20",
          )}
        />
        {isActive && (
          <motion.span
            layoutId="wallpaper-active-badge"
            className="absolute right-2 top-2 rounded-full border border-ctp-mauve/40 bg-ctp-mantle/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ctp-mauve backdrop-blur-sm"
          >
            Selected
          </motion.span>
        )}
      </div>
      <div className="space-y-0.5 border-t border-ctp-surface1 bg-ctp-surface0/80 px-4 py-3 backdrop-blur-sm">
        <p className="font-medium text-ctp-text">{item.title}</p>
        <WallpaperArtistCredit
          artist={item.artist}
          className="text-xs text-ctp-subtext0"
        />
      </div>
    </motion.button>
  )
}

export default WallpaperCard
