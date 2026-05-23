import WallpaperArtistCredit from "@/components/apps/wallpapers-rocket/wallpaper-artist-credit"
import type { WallpaperArtist, WallpaperKey } from "@/hooks/use-background"
import cn from "classnames"

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
    <div
      role="button"
      tabIndex={isActive ? -1 : 0}
      aria-pressed={isActive}
      aria-label={`Set wallpaper to ${item.title}`}
      onClick={() => onSelect(item.key)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect(item.key)
        }
      }}
      className={cn(
        "group relative w-64 shrink-0 select-none overflow-hidden rounded-xl border-2 text-left transition-[border-color,box-shadow,transform] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ctp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base",
        isActive
          ? "cursor-default border-ctp-mauve shadow-lg shadow-ctp-mauve/10"
          : "cursor-pointer border-ctp-surface1 hover:border-ctp-surface2 hover:scale-[1.02] active:scale-[0.98]",
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-ctp-surface0">
        <img
          src={item.imageUrl}
          alt=""
          draggable={false}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            !isActive && "group-hover:scale-105",
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-colors",
            isActive
              ? "bg-ctp-mauve/10"
              : "bg-ctp-crust/0 group-hover:bg-ctp-crust/20",
          )}
        />
        {isActive && (
          <span className="pointer-events-none absolute right-2 top-2 rounded-full border border-ctp-mauve/40 bg-ctp-mantle/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ctp-mauve backdrop-blur-sm">
            Selected
          </span>
        )}
      </div>
      <div className="space-y-0.5 border-t border-ctp-surface1 bg-ctp-surface0/80 px-4 py-3 backdrop-blur-sm">
        <p className="font-medium text-ctp-text">{item.title}</p>
        <WallpaperArtistCredit
          artist={item.artist}
          className="text-xs text-ctp-subtext0"
        />
      </div>
    </div>
  )
}

export default WallpaperCard
