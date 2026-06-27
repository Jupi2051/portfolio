import { getDesktopViewport, type WindowRect } from "@/lib/app-window-placement"

export const TOP_MAXIMIZE_SNAP_ZONE_PX = 0

export function getTopMaximizeSnapZoneHeight(): number {
  return TOP_MAXIMIZE_SNAP_ZONE_PX
}

export function isCursorInMaximizeSnapZone(cursorY: number): boolean {
  return cursorY <= TOP_MAXIMIZE_SNAP_ZONE_PX
}

export function getMaximizeSnapPreviewRect(): WindowRect {
  const viewport = getDesktopViewport()

  return {
    x: 0,
    y: 0,
    width: viewport.width,
    height: viewport.height,
  }
}
