import type Atrament from "atrament"
import { MODE_DRAW, MODE_ERASE, MODE_FILL } from "atrament"
import createFillWorker from "atrament/fill"
import type { RecordedStroke } from "./types"

type ToolMode = typeof MODE_DRAW | typeof MODE_ERASE | typeof MODE_FILL

function resolveWeightAtSegment(
  stroke: RecordedStroke,
  segmentIndex: number,
): number {
  const kfs = stroke.weightKeyframes
  if (!kfs?.length) return stroke.weight
  const sorted = [...kfs].sort((a, b) => a.segmentIndex - b.segmentIndex)
  let w = sorted[0].weight
  for (const k of sorted) {
    if (k.segmentIndex <= segmentIndex) w = k.weight
  }
  return w
}

export function cloneRecordedStroke(stroke: RecordedStroke): RecordedStroke {
  return {
    ...stroke,
    segments: stroke.segments.map((s) => ({
      ...s,
      point: { x: s.point.x, y: s.point.y },
    })),
    weightKeyframes: stroke.weightKeyframes?.map((k) => ({ ...k })),
  }
}

export function replayStroke(
  sketchpad: Atrament,
  stroke: RecordedStroke,
): void {
  const segments = stroke.segments.slice()
  if (segments.length === 0) return

  sketchpad.mode = stroke.mode as ToolMode
  sketchpad.smoothing = stroke.smoothing
  sketchpad.color = stroke.color
  sketchpad.adaptiveStroke = stroke.adaptiveStroke

  sketchpad.weight = resolveWeightAtSegment(stroke, 0)
  const first = segments.shift()!
  const firstPoint = first.point
  sketchpad.beginStroke(firstPoint.x, firstPoint.y)

  let prevPoint = firstPoint
  let segmentIndex = 1
  for (const segment of segments) {
    sketchpad.weight = resolveWeightAtSegment(stroke, segmentIndex)
    const { x, y } = sketchpad.draw(
      segment.point.x,
      segment.point.y,
      prevPoint.x,
      prevPoint.y,
      segment.pressure,
    )
    prevPoint = { x, y }
    segmentIndex += 1
  }

  sketchpad.endStroke(prevPoint.x, prevPoint.y)
}

/** Replay one flood fill using the same worker contract as atrament. */
export function replayFill(
  canvas: HTMLCanvasElement,
  opts: {
    fillColor: string
    x: number
    y: number
    globalAlpha: number
  },
): Promise<void> {
  const ctx = canvas.getContext("2d")
  if (!ctx) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const image = snapshot.data
    const sx = Math.floor(opts.x)
    const sy = Math.floor(opts.y)
    const startColor = Array.from(ctx.getImageData(sx, sy, 1, 1).data)

    const worker = createFillWorker()
    const onMessage = (
      ev: MessageEvent<{ type?: string; result?: Uint8ClampedArray }>,
    ) => {
      const { type, result } = ev.data ?? {}
      if (type !== "fill-result" || !result) return
      worker.removeEventListener("message", onMessage)
      try {
        const pixels = new Uint8ClampedArray(result)
        ctx.putImageData(
          new ImageData(pixels, canvas.width, canvas.height),
          0,
          0,
        )
        resolve()
      } catch (e) {
        reject(e)
      } finally {
        worker.terminate()
      }
    }

    worker.addEventListener("message", onMessage)
    worker.postMessage(
      {
        image,
        color: opts.fillColor,
        globalAlpha: opts.globalAlpha,
        width: canvas.width,
        height: canvas.height,
        startColor,
        startX: opts.x,
        startY: opts.y,
      },
      [image.buffer],
    )
  })
}
