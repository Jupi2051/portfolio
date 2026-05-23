import CurrentWallpaperPreview from "@/components/apps/wallpapers-rocket/current-wallpaper-preview"
import WallpaperGallery from "@/components/apps/wallpapers-rocket/wallpaper-gallery"
import WallpapersRocketHeader from "@/components/apps/wallpapers-rocket/wallpapers-rocket-header"
import useBackground, { type WallpaperKey } from "@/hooks/use-background"

function WallpapersRocket() {
  const {
    wallpaper,
    setWallpaper,
    wallpaperList,
    currentWallpaperImageUrl,
    currentWallpaperTitle,
    currentWallpaperArtist,
  } = useBackground()

  const handleSelect = (key: WallpaperKey) => {
    if (key !== wallpaper) setWallpaper(key)
  }

  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden bg-linear-to-br from-ctp-base via-ctp-mantle to-ctp-crust">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex w-full flex-col items-start gap-8 p-6">
          <WallpapersRocketHeader />
          <CurrentWallpaperPreview
            wallpaperKey={wallpaper}
            imageUrl={currentWallpaperImageUrl}
            title={currentWallpaperTitle}
            artist={currentWallpaperArtist}
          />
          <WallpaperGallery
            wallpapers={wallpaperList}
            activeKey={wallpaper}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </div>
  )
}

export default WallpapersRocket
