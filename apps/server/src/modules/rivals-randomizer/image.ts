import axios from "axios"
import sharp from "sharp"

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

/** Average color of an image as `#rrggbb`, for UI accents. */
export async function computeAverageColorHex(buffer: Buffer): Promise<string> {
  const { channels } = await sharp(buffer).stats()
  const toHex = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0")

  return `#${toHex(channels[0].mean)}${toHex(channels[1].mean)}${toHex(channels[2].mean)}`
}
