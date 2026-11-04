import { useEffect, useRef, type RefObject } from "react"
import { parseColorToRgba, rgbaToCss } from "../shared/vico-color"

type Props = {
  /** Element whose pointer movement the footprint follows. */
  containerRef: RefObject<HTMLElement | null>
  enabled: boolean
  /** Matches atrament stroke width (circle diameter in CSS px). */
  diameterPx: number
  /** Full CSS color (may include alpha). */
  accentColor: string
}

/**
 * Brush footprint overlay. Follows the pointer by writing `transform`
 * straight to the element — no React state, so the studio doesn't
 * re-render on every pointer move.
 */
export default function VicoBrushCursor({
  containerRef,
  enabled,
  diameterPx,
  accentColor,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const el = ref.current
    if (!container || !el || !enabled) return

    const onMove = (e: PointerEvent) => {
      // Touch has no hover — a footprint stuck under the finger is just noise.
      // Over the toolbar/popover the footprint would just sit behind it.
      if (e.pointerType === "touch" || !(e.target instanceof HTMLCanvasElement)) {
        el.style.opacity = "0"
        return
      }
      const rect = container.getBoundingClientRect()
      el.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0) translate(-50%, -50%)`
      el.style.opacity = "1"
    }
    const onLeave = () => {
      el.style.opacity = "0"
    }

    container.addEventListener("pointermove", onMove, { passive: true })
    container.addEventListener("pointerleave", onLeave)
    return () => {
      container.removeEventListener("pointermove", onMove)
      container.removeEventListener("pointerleave", onLeave)
      el.style.opacity = "0"
    }
  }, [containerRef, enabled])

  if (!enabled || diameterPx <= 0) return null

  const base = parseColorToRgba(accentColor)

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-10 rounded-full border-[1.5px] border-solid opacity-0 shadow-[0_0_0_1px_rgba(14,13,26,0.8)]"
      style={{
        width: diameterPx,
        height: diameterPx,
        borderColor: rgbaToCss({ ...base, a: Math.max(base.a, 0.6) }),
        backgroundColor: rgbaToCss({ ...base, a: base.a * 0.15 }),
      }}
    />
  )
}
