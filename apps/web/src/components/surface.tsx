import Desktop from "@/components/windows/desktop"
import Dock from "@/components/windows/dock"
import Launcher from "@/components/windows/launcher"
import Wallpaper from "@/components/windows/wallpaper"
import useBackground from "@/hooks/use-background"

function Surface() {
  const { currentWallpaperImageUrl } = useBackground()

  return (
    // Row heights mirror DOCK_RESERVE_PX in lib/app-window-placement.ts
    <div className="relative isolate grid h-dvh grid-cols-1 grid-rows-[1fr_68px] overflow-hidden bg-ink-deep sm:grid-rows-[1fr_92px]">
      <Wallpaper url={currentWallpaperImageUrl} />
      <Desktop className="z-10" />
      <Launcher className="z-20" />
      <Dock className="z-30" />
    </div>
  )
}

export default Surface
