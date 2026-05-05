import type { CSSProperties } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEraser,
  faFillDrip,
  faPaintBrush,
  faRedo,
  faTrash,
  faUndo,
} from "@fortawesome/free-solid-svg-icons"
import cn from "classnames"
import type { SketchToolMode } from "./use-atrament-sketch"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  hex6AndAlphaToRgba,
  matchesOpaquePreset,
  parseColorToRgba,
  rgbaToCss,
  rgbaToHex6,
} from "./vico-color"

const PRESET_COLORS = [
  "#cba6f7",
  "#89b4fa",
  "#a6e3a1",
  "#f9e2af",
  "#fab387",
  "#f38ba8",
  "#181825",
]

const TRANSPARENCY_GRID: CSSProperties = {
  backgroundColor: "#313244",
  backgroundImage: `
    linear-gradient(45deg, #45475a 25%, transparent 25%),
    linear-gradient(-45deg, #45475a 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #45475a 75%),
    linear-gradient(-45deg, transparent 75%, #45475a 75%)
  `,
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
}

type Props = {
  mode: SketchToolMode
  setMode: (m: SketchToolMode) => void
  color: string
  setColor: (c: string) => void
  brushWeight: number
  setBrushWeight: (value: number | ((prev: number) => number)) => void
  brushWeightMin: number
  brushWeightMax: number
  undo: () => void
  redo: () => void
  clearAll: () => void
  canUndo: boolean
  canRedo: boolean
  MODE_DRAW: SketchToolMode
  MODE_ERASE: SketchToolMode
  MODE_FILL: SketchToolMode
}

export default function VicoToolbar({
  mode,
  setMode,
  color,
  setColor,
  brushWeight,
  setBrushWeight,
  brushWeightMin,
  brushWeightMax,
  undo,
  redo,
  clearAll,
  canUndo,
  canRedo,
  MODE_DRAW,
  MODE_ERASE,
  MODE_FILL,
}: Props) {
  const rgba = parseColorToRgba(color)

  const toolBtn = (m: SketchToolMode, icon: IconDefinition, label: string) => (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={mode === m}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors",
        mode === m
          ? "border-ctp-lavender bg-ctp-surface0 text-ctp-lavender"
          : "border-ctp-surface1 bg-ctp-mantle text-ctp-subtext1 hover:bg-ctp-surface0",
      )}
      onClick={() => setMode(m)}
    >
      <FontAwesomeIcon icon={icon} className="text-base" />
    </button>
  )

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-ctp-surface1 bg-ctp-base px-3 py-2">
      <div className="flex items-center gap-1">
        <button
          type="button"
          title="Undo"
          aria-label="Undo"
          disabled={!canUndo}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md border border-ctp-surface1 bg-ctp-mantle text-ctp-subtext1 transition-colors",
            canUndo ? "hover:bg-ctp-surface0" : "opacity-40",
          )}
          onClick={undo}
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button
          type="button"
          title="Redo"
          aria-label="Redo"
          disabled={!canRedo}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md border border-ctp-surface1 bg-ctp-mantle text-ctp-subtext1 transition-colors",
            canRedo ? "hover:bg-ctp-surface0" : "opacity-40",
          )}
          onClick={redo}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <button
          type="button"
          title="Clear canvas"
          aria-label="Clear canvas"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-ctp-surface1 bg-ctp-mantle text-ctp-subtext1 hover:bg-ctp-surface0"
          onClick={clearAll}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div
        className="mx-1 hidden h-6 w-px bg-ctp-surface1 sm:block"
        aria-hidden
      />

      <div className="flex items-center gap-1">
        {toolBtn(MODE_DRAW, faPaintBrush, "Draw")}
        {toolBtn(MODE_ERASE, faEraser, "Erase")}
        {toolBtn(MODE_FILL, faFillDrip, "Fill")}
      </div>

      <div
        className="mx-1 hidden h-6 w-px bg-ctp-surface1 sm:block"
        aria-hidden
      />

      <label className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-[240px]">
        <span className="flex shrink-0 items-baseline gap-1 whitespace-nowrap text-xs text-ctp-subtext1">
          <span>Brush</span>
          <span className="inline-block w-15 text-end tabular-nums text-ctp-overlay2">
            {(brushWeight / 2).toFixed(brushWeight % 2 === 0 ? 0 : 1)}px
          </span>
        </span>
        <input
          type="range"
          title={`Brush radius (stroke width ÷ 2). Hold Shift and scroll on the canvas to resize.`}
          aria-label="Brush radius"
          className="h-1 min-w-0 flex-1 cursor-pointer accent-ctp-lavender"
          min={brushWeightMin}
          max={brushWeightMax}
          step={1}
          value={brushWeight}
          onChange={(e) => setBrushWeight(Number(e.target.value))}
        />
      </label>

      <div
        className="mx-1 hidden h-6 w-px bg-ctp-surface1 sm:block"
        aria-hidden
      />

      <div className="flex flex-wrap items-center gap-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            title={`Color ${c}`}
            aria-label={`Select color ${c}`}
            style={{ backgroundColor: c }}
            className={cn(
              "h-7 w-7 rounded-full border-2 shadow-inner transition-transform",
              matchesOpaquePreset(color, c)
                ? "border-ctp-lavender scale-110"
                : "border-ctp-surface2 hover:scale-105",
            )}
            onClick={() => setColor(c)}
          />
        ))}

        <div
          className="flex items-center gap-2 rounded-md border border-ctp-surface1 bg-ctp-mantle px-2 py-1"
          title="Custom color and opacity"
        >
          <label
            className="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-full ring-1 ring-inset ring-ctp-surface2"
            style={TRANSPARENCY_GRID}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              aria-hidden
            />
            <input
              type="color"
              value={rgbaToHex6(rgba)}
              onChange={(e) => {
                setColor(hex6AndAlphaToRgba(e.target.value, rgba.a))
              }}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Pick custom color (hue/saturation/value)"
            />
          </label>

          <label className="flex min-w-23 max-w-[120px] flex-1 flex-col gap-0.5">
            <span className="text-[0.65rem] font-medium uppercase tracking-wide text-ctp-subtext0">
              Alpha {Math.round(rgba.a * 100)}%
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(rgba.a * 100)}
              onChange={(e) => {
                setColor(
                  rgbaToCss({ ...rgba, a: Number(e.target.value) / 100 }),
                )
              }}
              className="h-1 w-full cursor-pointer accent-ctp-lavender"
              aria-label="Brush opacity"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
