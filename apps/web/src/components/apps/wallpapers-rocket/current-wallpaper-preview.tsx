import WallpaperArtistCredit from "@/components/apps/wallpapers-rocket/wallpaper-artist-credit"
import { currentWallpaperVariants } from "@/components/apps/wallpapers-rocket/animations"
import type { WallpaperArtist } from "@/hooks/use-background"
import { motion } from "framer-motion"

type CurrentWallpaperPreviewProps = {
  wallpaperKey: string
  imageUrl: string
  title: string
  artist: WallpaperArtist
}

function CurrentWallpaperPreview({
  wallpaperKey,
  imageUrl,
  title,
  artist,
}: CurrentWallpaperPreviewProps) {
  return (
    <section className="w-full space-y-3 text-left">
      <p className="text-xs font-semibold uppercase tracking-wider text-ctp-subtext0">
        Current wallpaper
      </p>
      <motion.div
        key={wallpaperKey}
        variants={currentWallpaperVariants}
        initial="initial"
        animate="animate"
        className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-ctp-mauve/30 shadow-xl ring-1 ring-ctp-mauve/20"
      >
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ctp-crust/95 via-ctp-crust/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-xl font-bold text-ctp-text">{title}</h2>
          <div className="mt-1">
            <WallpaperArtistCredit artist={artist} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default CurrentWallpaperPreview
