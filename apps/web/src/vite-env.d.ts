/// <reference types="vite/client" />
declare module "*.ttf";

/** Minimal typings for atrament (package ships JS only). */
declare module "atrament" {
  export const MODE_DISABLED: "disabled"
  export const MODE_DRAW: "draw"
  export const MODE_ERASE: "erase"
  export const MODE_FILL: "fill"

  export type AtramentMode =
    | typeof MODE_DISABLED
    | typeof MODE_DRAW
    | typeof MODE_ERASE
    | typeof MODE_FILL

  export type AtramentOptions = {
    fill?: () => Worker
    width?: number
    height?: number
    color?: string
    weight?: number
    smoothing?: number
    adaptiveStroke?: boolean
    mode?: AtramentMode
    secondaryMouseButton?: boolean
    ignoreModifiers?: boolean
    pressureLow?: number
    pressureHigh?: number
    pressureSmoothing?: number
  }

  export default class Atrament {
    constructor(canvas: HTMLCanvasElement | string, options?: AtramentOptions)

    mode: AtramentMode
    recordStrokes: boolean
    smoothing: number
    color: string
    adaptiveStroke: boolean
    weight: number
    strokeTimestamp?: number

    beginStroke(x: number, y: number): void
    endStroke(x: number, y: number): void
    draw(
      x: number,
      y: number,
      prevX: number,
      prevY: number,
      pressure?: number,
    ): { x: number; y: number }

    clear(): void
    destroy(): void

    addEventListener(type: string, listener: EventListener): void
    removeEventListener(type: string, listener: EventListener): void
  }
}

declare module "atrament/fill" {
  /** Returns a Worker running atrament's flood-fill implementation */
  function createFillWorker(options?: WorkerOptions): Worker;
  export default createFillWorker;
}