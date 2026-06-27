import { getDesktopViewport, type WindowRect } from "@/lib/app-window-placement"

export const TOP_SNAP_ZONE_PX = 50
export const BOTTOM_SNAP_ZONE_PX = 50
export const SIDE_SNAP_ZONE_PX = 50

export type WindowSnapLayout =
  | "maximize"
  | "left-half"
  | "right-half"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export const resolveCursorSnapLayout = (
  cursorX: number,
  cursorY: number,
  viewport = getDesktopViewport(),
): WindowSnapLayout | null => {
  const { width, height } = viewport

  const inTop = cursorY <= TOP_SNAP_ZONE_PX
  const inBottom = cursorY >= height - BOTTOM_SNAP_ZONE_PX
  const inLeft = cursorX <= SIDE_SNAP_ZONE_PX
  const inRight = cursorX >= width - SIDE_SNAP_ZONE_PX

  if (inTop && inLeft) return "top-left"
  if (inTop && inRight) return "top-right"
  if (inBottom && inLeft) return "bottom-left"
  if (inBottom && inRight) return "bottom-right"
  if (inTop) return "maximize"
  if (inLeft) return "left-half"
  if (inRight) return "right-half"

  return null
}

export const getSnapLayoutRect = (layout: WindowSnapLayout): WindowRect => {
  const viewport = getDesktopViewport()
  const halfWidth = Math.floor(viewport.width / 2)
  const halfHeight = Math.floor(viewport.height / 2)

  switch (layout) {
    case "maximize":
      return {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      }
    case "left-half":
      return {
        x: 0,
        y: 0,
        width: halfWidth,
        height: viewport.height,
      }
    case "right-half":
      return {
        x: halfWidth,
        y: 0,
        width: viewport.width - halfWidth,
        height: viewport.height,
      }
    case "top-left":
      return {
        x: 0,
        y: 0,
        width: halfWidth,
        height: halfHeight,
      }
    case "top-right":
      return {
        x: halfWidth,
        y: 0,
        width: viewport.width - halfWidth,
        height: halfHeight,
      }
    case "bottom-left":
      return {
        x: 0,
        y: halfHeight,
        width: halfWidth,
        height: viewport.height - halfHeight,
      }
    case "bottom-right":
      return {
        x: halfWidth,
        y: halfHeight,
        width: viewport.width - halfWidth,
        height: viewport.height - halfHeight,
      }
  }
}
