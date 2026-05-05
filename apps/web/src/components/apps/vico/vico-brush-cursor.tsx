import { parseColorToRgba, rgbaToCss } from "./vico-color"

type Props = {
  x: number
  y: number
  visible: boolean
  /** Matches atrament stroke width (circle diameter in CSS px). */
  diameterPx: number
  /** Full CSS color (may include alpha). */
  accentColor: string
}

/** Brush footprint overlay (pointer-events none). */
export default function VicoBrushCursor({
  x,
  y,
  visible,
  diameterPx,
  accentColor,
}: Props) {
  if (!visible || diameterPx <= 0) return null

  const base = parseColorToRgba(accentColor)
  const border = rgbaToCss(base)
  const fill = rgbaToCss({ ...base, a: base.a * 0.18 })

  const r = diameterPx / 2
  return (
    <div
      className="pointer-events-none absolute z-10 rounded-full border-2 border-solid shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
      style={{
        left: x - r,
        top: y - r,
        width: diameterPx,
        height: diameterPx,
        borderColor: border,
        backgroundColor: fill,
      }}
      aria-hidden
    />
  )
}
