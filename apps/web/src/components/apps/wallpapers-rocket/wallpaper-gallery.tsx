import { LayoutGroup } from "framer-motion"
import WallpaperPrint, {
  type WallpaperPrintItem,
} from "@/components/apps/wallpapers-rocket/wallpaper-print"
import type { WallpaperKey } from "@/hooks/use-background"

type WallpaperGalleryProps = {
  wallpapers: WallpaperPrintItem[]
  activeKey: WallpaperKey
  onSelect: (key: WallpaperKey) => void
}

function WallpaperGallery({
  wallpapers,
  activeKey,
  onSelect,
}: WallpaperGalleryProps) {
  return (
    <LayoutGroup>
      <section className="grid grid-cols-1 gap-x-10 gap-y-8 pt-1.5 @2xl/appwindow:grid-cols-2">
        {wallpapers.map((item, index) => (
          <WallpaperPrint
            key={item.key}
            item={item}
            index={index}
            isActive={activeKey === item.key}
            onSelect={onSelect}
          />
        ))}
      </section>
    </LayoutGroup>
  )
}

export default WallpaperGallery
