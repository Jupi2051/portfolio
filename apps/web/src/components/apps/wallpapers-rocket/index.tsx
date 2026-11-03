import WallpaperGallery from "@/components/apps/wallpapers-rocket/wallpaper-gallery"
import WallpapersRocketHeader from "@/components/apps/wallpapers-rocket/wallpapers-rocket-header"
import { SparkleIcon } from "@/components/ui/icons"
import useBackground, { type WallpaperKey } from "@/hooks/use-background"

function WallpapersRocket() {
  const { wallpaper, setWallpaper, wallpaperList } = useBackground()

  const handleSelect = (key: WallpaperKey) => {
    if (key !== wallpaper) setWallpaper(key)
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-panel bg-[radial-gradient(circle_at_20%_0%,rgba(140,142,255,0.16)_0%,rgba(23,22,42,0)_55%)]">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex flex-col gap-7.5 px-6 pt-8 pb-8 @2xl/appwindow:px-10 @2xl/appwindow:pt-9">
          <WallpapersRocketHeader count={wallpaperList.length} />
          <WallpaperGallery
            wallpapers={wallpaperList}
            activeKey={wallpaper}
            onSelect={handleSelect}
          />
          <p className="flex items-center gap-2 text-[13px] leading-4.5 text-[#9a97be]">
            <SparkleIcon className="size-3.5 text-spark" />
            More art is on the way.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WallpapersRocket
