import axios from "axios"
import sharp from "sharp"
import { Vibrant } from "node-vibrant/node"

/**
 * Prisma's generated `Bytes` type pins `Uint8Array<ArrayBuffer>`, which the
 * DOM lib's `Uint8Array` constructor overloads don't actually guarantee back.
 * Everything here is a freshly allocated (never shared) buffer, so this cast
 * just bridges that lib-typing gap.
 */
export type PrismaBytes = Uint8Array<ArrayBuffer>

export async function downloadImageBuffer(url: string): Promise<Buffer> {
  const response = await axios.get<ArrayBuffer>(url, {
    responseType: "arraybuffer",
  })
  return Buffer.from(response.data)
}

/**
 * Converts a Discord CDN image to webp. Animated sources (Discord only serves
 * those as gif) are re-encoded as animated webp so the motion survives.
 */
export async function convertToWebp(
  sourceBuffer: Buffer,
  isAnimated: boolean,
): Promise<PrismaBytes> {
  const webp = isAnimated
    ? await sharp(sourceBuffer, { animated: true })
        .webp({ quality: 85, effort: 4 })
        .toBuffer()
    : await sharp(sourceBuffer).webp({ quality: 90 }).toBuffer()

  const bytes = new Uint8Array(webp.length)
  bytes.set(webp)
  return bytes as PrismaBytes
}

export async function downloadAndConvertToWebp(
  url: string,
  isAnimated: boolean,
): Promise<PrismaBytes> {
  const sourceBuffer = await downloadImageBuffer(url)
  return convertToWebp(sourceBuffer, isAnimated)
}

/**
 * A representative accent color for an image, as `#rrggbb`. Uses node-vibrant's
 * palette (color quantization + saturation/population scoring) rather than a
 * flat pixel average, so a plain background is much less likely to wash out a
 * saturated foreground subject the way a straight mean would.
 */
export async function computeAccentColorHex(buffer: Buffer): Promise<string | null> {
  // node-vibrant's Node backend decodes via Jimp, whose bundled decoders don't
  // include webp (or several other formats) — normalize to PNG first so it
  // doesn't matter what format the source actually is. `sharp` takes the first
  // frame of an animated source by default, which is what we want here anyway.
  const pngBuffer = await sharp(buffer).png().toBuffer()

  // node-vibrant's alpha/white filter doesn't know or care about thin, fully-
  // opaque outline/rim-light strokes artists add along a character's silhouette
  // — a small but highly saturated stroke can still win a swatch slot over the
  // costume's own (larger, less saturated) fill color at the default colorCount
  // of 64. Capping it much lower forces MMCQ to work with far fewer, broader
  // clusters, so a handful of outline pixels get absorbed into a neighboring
  // color mass instead of surviving as their own distinct swatch. Verified
  // against real prestige art: at 64 a character's small brown belt/pouch won
  // over her actual (much larger) green costume; at 16 the costume wins.
  const palette = await Vibrant.from(pngBuffer).maxColorCount(16).getPalette()
  const swatch =
    palette.Vibrant ??
    palette.LightVibrant ??
    palette.DarkVibrant ??
    palette.Muted ??
    palette.LightMuted ??
    palette.DarkMuted ??
    null

  return swatch?.hex ?? null
}
