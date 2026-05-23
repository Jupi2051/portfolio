import { useCallback, useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"

const Wallpapers = {
  default: "default.webp",
  "space-chloe": "chloe.webp",
} as const

type WallpaperKey = keyof typeof Wallpapers

const isWallpaperKey = (value: string): value is WallpaperKey =>
  value in Wallpapers

const backgroundBaseURL = "/Imgs/wallpapers/"

const useBackground = () => {
  const [wallpaper, setStoredWallpaper] = useLocalStorage<WallpaperKey>(
    "wallpaper",
    "default",
  )

  const setWallpaper = useCallback(
    (wallpaper: WallpaperKey) => {
      setStoredWallpaper(wallpaper)
    },
    [setStoredWallpaper],
  )

  const getWallpaperImageUrl = useCallback(
    (wallpaper: WallpaperKey) => `${backgroundBaseURL}${Wallpapers[wallpaper]}`,
    [],
  )

  useEffect(() => {
    if (!isWallpaperKey(wallpaper)) {
      setWallpaper("default")
    }
  }, [wallpaper, setWallpaper])

  return {
    wallpaper,
    setWallpaper,
    getWallpaperImageUrl,
    currentWallpaperImageUrl: getWallpaperImageUrl(wallpaper),
  }
}

export default useBackground
