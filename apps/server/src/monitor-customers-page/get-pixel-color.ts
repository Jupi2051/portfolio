import sharp from 'sharp'

const getPixelColor = async (
  imageData: { data: Buffer; info: sharp.OutputInfo },
  x: number,
  y: number
) => {
  const { data, info } = imageData
  const { width, height, channels } = info

  if (x < 0 || x >= width || y < 0 || y >= height)
    throw new Error('Pixel out of bounds')

  const offset = (y * width + x) * channels

  const r = data[offset]
  const g = data[offset + 1]
  const b = data[offset + 2]

  return { r, g, b }
}

export default getPixelColor
