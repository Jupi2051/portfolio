export type Rgba = { r: number; g: number; b: number; a: number }

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function hexPair(s: string, i: number): number {
  return parseInt(s.slice(i, i + 2), 16)
}

/** Parse common CSS color forms into RGBA (hex, rgb, rgba). */
export function parseColorToRgba(css: string): Rgba {
  const s = css.trim()

  const rgbaFn = s.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?)\s*)?\)$/i,
  )
  if (rgbaFn) {
    const r = clamp255(Number(rgbaFn[1]))
    const g = clamp255(Number(rgbaFn[2]))
    const b = clamp255(Number(rgbaFn[3]))
    const aRaw = rgbaFn[4]
    let a = 1
    if (aRaw !== undefined) {
      a = aRaw.endsWith("%") ? Number(aRaw.slice(0, -1)) / 100 : Number(aRaw)
    }
    return { r, g, b, a: clamp01(Number.isFinite(a) ? a : 1) }
  }

  if (s.startsWith("#")) {
    const hex = s.slice(1)
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
        a: 1,
      }
    }
    if (hex.length === 6) {
      return {
        r: hexPair(hex, 0),
        g: hexPair(hex, 2),
        b: hexPair(hex, 4),
        a: 1,
      }
    }
  }

  return { r: 203, g: 166, b: 247, a: 1 }
}

export function rgbaToCss({ r, g, b, a }: Rgba): string {
  return `rgba(${clamp255(r)}, ${clamp255(g)}, ${clamp255(b)}, ${clamp01(a)})`
}

/** #rrggbb for `<input type="color">` (alpha is not supported by the control). */
export function rgbaToHex6({ r, g, b }: Rgba): string {
  const h = (n: number) => clamp255(n).toString(16).padStart(2, "0")
  return `#${h(r)}${h(g)}${h(b)}`
}

export function hex6AndAlphaToRgba(hex6: string, a: number): string {
  const base = parseColorToRgba(hex6)
  return rgbaToCss({ ...base, a: clamp01(a) })
}

/** True when current color matches a preset swatch at full opacity. */
export function matchesOpaquePreset(color: string, presetHex: string): boolean {
  const c = parseColorToRgba(color)
  const p = parseColorToRgba(presetHex)
  return (
    c.a >= 0.999 &&
    Math.abs(c.r - p.r) < 1.5 &&
    Math.abs(c.g - p.g) < 1.5 &&
    Math.abs(c.b - p.b) < 1.5
  )
}
