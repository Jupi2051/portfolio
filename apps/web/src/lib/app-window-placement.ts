import type { openApplicationMetaData } from "@/components/windows/desktop"

export type WindowDimensions = {
  width: number
  height: number
}

export type WindowPoint = {
  x: number
  y: number
}

export type WindowRect = WindowPoint & WindowDimensions

const WINDOW_MARGIN = 16
const CASCADE_OFFSET = 32

/** Preset sizes as fractions of the desktop viewport (width × height). */
const WINDOW_SIZE_RATIO_PRESETS: Array<{
  widthRatio: number
  heightRatio: number
}> = [
  { widthRatio: 0.42, heightRatio: 0.38 },
  { widthRatio: 0.3, heightRatio: 0.45 },
  { widthRatio: 0.38, heightRatio: 0.52 },
  { widthRatio: 0.65, heightRatio: 0.58 },
  { widthRatio: 0.62, heightRatio: 0.62 },
]

const windowBoundsRegistry = new Map<number, WindowRect>()

export function registerAppWindowBounds(appId: number, bounds: WindowRect) {
  windowBoundsRegistry.set(appId, bounds)
}

export function unregisterAppWindowBounds(appId: number) {
  windowBoundsRegistry.delete(appId)
}

function getOtherAppWindowBounds(excludeAppId: number): WindowRect[] {
  return [...windowBoundsRegistry.entries()]
    .filter(([id]) => id !== excludeAppId)
    .map(([, bounds]) => bounds)
}

export function getDesktopViewport(): WindowDimensions {
  const taskbarRatio = window.matchMedia("(min-width: 40rem)").matches
    ? 0.07
    : 0.01

  return {
    width: window.innerWidth,
    height: Math.floor(window.innerHeight * (1 - taskbarRatio)),
  }
}

function clampDimensionsToViewport(
  size: WindowDimensions,
  viewport: WindowDimensions,
): WindowDimensions {
  const maxWidth = Math.max(280, viewport.width - WINDOW_MARGIN * 2)
  const maxHeight = Math.max(220, viewport.height - WINDOW_MARGIN * 2)

  return {
    width: Math.min(size.width, maxWidth),
    height: Math.min(size.height, maxHeight),
  }
}

function sizeFromViewportRatios(
  viewport: WindowDimensions,
  ratios: { widthRatio: number; heightRatio: number },
): WindowDimensions {
  const minWidth = Math.max(320, Math.round(viewport.width * 0.4))
  const minHeight = Math.max(240, Math.round(viewport.height * 0.35))

  return clampDimensionsToViewport(
    {
      width: Math.max(minWidth, Math.round(viewport.width * ratios.widthRatio)),
      height: Math.max(
        minHeight,
        Math.round(viewport.height * ratios.heightRatio),
      ),
    },
    viewport,
  )
}

export function pickRandomFittingWindowSize(
  viewport: WindowDimensions,
): WindowDimensions {
  const preset =
    WINDOW_SIZE_RATIO_PRESETS[
      Math.floor(Math.random() * WINDOW_SIZE_RATIO_PRESETS.length)
    ]

  return sizeFromViewportRatios(viewport, preset)
}

function clampPositionToViewport(
  position: WindowPoint,
  size: WindowDimensions,
  viewport: WindowDimensions,
): WindowPoint {
  const maxX = Math.max(
    WINDOW_MARGIN,
    viewport.width - size.width - WINDOW_MARGIN,
  )
  const maxY = Math.max(
    WINDOW_MARGIN,
    viewport.height - size.height - WINDOW_MARGIN,
  )

  return {
    x: Math.min(Math.max(WINDOW_MARGIN, position.x), maxX),
    y: Math.min(Math.max(WINDOW_MARGIN, position.y), maxY),
  }
}

function overlapArea(a: WindowRect, b: WindowRect): number {
  const overlapWidth = Math.max(
    0,
    Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x),
  )
  const overlapHeight = Math.max(
    0,
    Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y),
  )

  return overlapWidth * overlapHeight
}

function generateCandidatePositions(
  size: WindowDimensions,
  viewport: WindowDimensions,
): WindowPoint[] {
  const maxX = Math.max(
    WINDOW_MARGIN,
    viewport.width - size.width - WINDOW_MARGIN,
  )
  const maxY = Math.max(
    WINDOW_MARGIN,
    viewport.height - size.height - WINDOW_MARGIN,
  )
  const candidates: WindowPoint[] = []

  const gridCols = 5
  const gridRows = 4

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const xSpan = maxX - WINDOW_MARGIN
      const ySpan = maxY - WINDOW_MARGIN
      const normalizedX = col / (gridCols - 1)
      const normalizedY = row / (gridRows - 1)

      candidates.push({
        x: WINDOW_MARGIN + normalizedX * xSpan,
        y: WINDOW_MARGIN + normalizedY * ySpan,
      })
    }
  }

  for (let i = 0; i < 8; i++) {
    candidates.push({
      x: WINDOW_MARGIN + i * CASCADE_OFFSET,
      y: WINDOW_MARGIN + i * CASCADE_OFFSET,
    })
  }

  return candidates.map((position) =>
    clampPositionToViewport(position, size, viewport),
  )
}

function scoreWindowPosition(
  candidate: WindowRect,
  others: WindowRect[],
): number {
  let score = 0

  for (const other of others) {
    const overlap = overlapArea(candidate, other)

    if (overlap > 0) {
      score -= overlap * 12
      continue
    }

    const candidateCenterX = candidate.x + candidate.width / 2
    const candidateCenterY = candidate.y + candidate.height / 2
    const otherCenterX = other.x + other.width / 2
    const otherCenterY = other.y + other.height / 2

    score += Math.min(
      400,
      Math.hypot(
        candidateCenterX - otherCenterX,
        candidateCenterY - otherCenterY,
      ),
    )
  }

  if (others.length === 0) {
    score +=
      50 - Math.hypot(candidate.x - WINDOW_MARGIN, candidate.y - WINDOW_MARGIN)
  }

  return score
}

export function findOptimalWindowPosition(
  size: WindowDimensions,
  viewport: WindowDimensions,
  excludeAppId: number,
): WindowPoint {
  const others = getOtherAppWindowBounds(excludeAppId)
  const candidates = generateCandidatePositions(size, viewport)

  if (others.length === 0) {
    const cascadeIndex = windowBoundsRegistry.size
    return clampPositionToViewport(
      {
        x: WINDOW_MARGIN + (cascadeIndex % 6) * CASCADE_OFFSET,
        y: WINDOW_MARGIN + (cascadeIndex % 6) * CASCADE_OFFSET,
      },
      size,
      viewport,
    )
  }

  let bestPosition = candidates[0]
  let bestScore = Number.NEGATIVE_INFINITY

  for (const position of candidates) {
    const candidateRect: WindowRect = { ...position, ...size }
    const score = scoreWindowPosition(candidateRect, others)

    if (score > bestScore) {
      bestScore = score
      bestPosition = position
    }
  }

  const topCandidates = candidates.filter((position) => {
    const score = scoreWindowPosition({ ...position, ...size }, others)
    return score >= bestScore - 1
  })

  return (
    topCandidates[Math.floor(Math.random() * topCandidates.length)] ??
    bestPosition
  )
}

export function getAnchoredWindowLocation(
  position: NonNullable<openApplicationMetaData["windowLocation"]>,
  size: WindowDimensions,
  viewport: WindowDimensions = getDesktopViewport(),
): WindowPoint {
  const { width, height } = size
  const centerX = viewport.width / 2 - width / 2
  const centerY = viewport.height / 2 - height / 2

  switch (position) {
    case "center":
      return clampPositionToViewport({ x: centerX, y: centerY }, size, viewport)
    case "top-left":
      return clampPositionToViewport({ x: 0, y: 0 }, size, viewport)
    case "top-right":
      return clampPositionToViewport(
        { x: viewport.width - width, y: 0 },
        size,
        viewport,
      )
    case "bottom-left":
      return clampPositionToViewport(
        { x: 0, y: viewport.height - height },
        size,
        viewport,
      )
    case "bottom-right":
      return clampPositionToViewport(
        { x: viewport.width - width, y: viewport.height - height },
        size,
        viewport,
      )
    case "top-center":
      return clampPositionToViewport({ x: centerX, y: 0 }, size, viewport)
    case "bottom-center":
      return clampPositionToViewport(
        { x: centerX, y: viewport.height - height },
        size,
        viewport,
      )
    case "left-center":
      return clampPositionToViewport({ x: 0, y: centerY }, size, viewport)
    case "right-center":
      return clampPositionToViewport(
        { x: viewport.width - width, y: centerY },
        size,
        viewport,
      )
  }
}

export type InitialWindowPlacement = {
  size: WindowDimensions
  position: WindowPoint
}

export function resolveInitialWindowPlacement(
  appId: number,
  metaData?: openApplicationMetaData,
): InitialWindowPlacement {
  const viewport = getDesktopViewport()

  const size = metaData?.windowSize
    ? clampDimensionsToViewport(
        {
          width: metaData.windowSize.width ?? 500,
          height: metaData.windowSize.height ?? 500,
        },
        viewport,
      )
    : pickRandomFittingWindowSize(viewport)

  const position = metaData?.windowLocation
    ? getAnchoredWindowLocation(metaData.windowLocation, size, viewport)
    : findOptimalWindowPosition(size, viewport, appId)

  return { size, position }
}

export function toWindowRect(
  position: WindowPoint,
  size: { width?: number; height?: number },
): WindowRect {
  return {
    x: position.x,
    y: position.y,
    width: size.width ?? 0,
    height: size.height ?? 0,
  }
}
