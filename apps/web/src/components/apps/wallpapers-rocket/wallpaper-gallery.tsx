import WallpaperCard, {
  type WallpaperCardItem,
} from "@/components/apps/wallpapers-rocket/wallpaper-card"
import { galleryContainerVariants } from "@/components/apps/wallpapers-rocket/animations"
import type { WallpaperKey } from "@/hooks/use-background"
import { motion } from "framer-motion"

type WallpaperGalleryProps = {
  wallpapers: WallpaperCardItem[]
  activeKey: WallpaperKey
  onSelect: (key: WallpaperKey) => void
}

function WallpaperGallery({
  wallpapers,
  activeKey,
  onSelect,
}: WallpaperGalleryProps) {
  return (
    <section className="w-full space-y-4 pb-2 text-left">
      <h2 className="text-sm font-semibold text-ctp-text">All wallpapers</h2>
      <motion.div
        variants={galleryContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-start gap-4"
      >
        {wallpapers.map((item) => (
          <WallpaperCard
            key={item.key}
            item={item}
            isActive={activeKey === item.key}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default WallpaperGallery
