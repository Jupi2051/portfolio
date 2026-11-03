import { useCallback, useEffect, useMemo } from "react"
import { useLocalStorage } from "usehooks-ts"

const Wallpapers = {
  default: "default.webp",
  "space-chloe": "chloe.webp",
} as const

export type WallpaperKey = keyof typeof Wallpapers

export type WallpaperArtist = {
  name: string
  url?: string
  /** Shown as @{handle} on the link; falls back to a slug of `name` */
  handle?: string
}

/** Where the subject sits in the artwork (0–1), so tight crops stay on it. */
export type WallpaperFocus = { x: number; y: number }

const WallpaperMeta: Record<
  WallpaperKey,
  { title: string; artist: WallpaperArtist; focus: WallpaperFocus }
> = {
  default: {
    title: "Default",
    artist: { name: "Jennixdraws", url: "https://www.jennixdraws.com/" },
    focus: { x: 0.26, y: 0.4 },
  },
  "space-chloe": {
    title: "Space Chloe",
    artist: { name: "Jennixdraws", url: "https://www.jennixdraws.com/" },
    focus: { x: 0.6, y: 0.4 },
  },
}

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
    if (!isWallpaperKey(wallpaper)) setWallpaper("default")
  }, [wallpaper, setWallpaper])

  const wallpaperList = useMemo(
    () =>
      (Object.keys(Wallpapers) as WallpaperKey[]).map((key) => ({
        key,
        title: WallpaperMeta[key].title,
        artist: WallpaperMeta[key].artist,
        imageUrl: getWallpaperImageUrl(key),
      })),
    [getWallpaperImageUrl],
  )

  return {
    wallpaper,
    setWallpaper,
    getWallpaperImageUrl,
    currentWallpaperImageUrl: getWallpaperImageUrl(wallpaper),
    currentWallpaperTitle: WallpaperMeta[wallpaper].title,
    currentWallpaperArtist: WallpaperMeta[wallpaper].artist,
    currentWallpaperFocus: WallpaperMeta[wallpaper].focus,
    wallpaperList,
  }
}

export default useBackground
