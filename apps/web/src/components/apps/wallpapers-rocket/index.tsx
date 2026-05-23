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
    <div className="h-full w-full overflow-y-auto bg-linear-to-br from-ctp-base via-ctp-mantle to-ctp-crust">
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
  )
}

export default WallpapersRocket
