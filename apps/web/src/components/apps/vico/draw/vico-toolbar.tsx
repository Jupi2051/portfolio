import { useRef, useState, type CSSProperties, type ReactNode } from "react"
import cn from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"
import {
  EraserIcon,
  FillIcon,
  PencilIcon,
  RedoIcon,
  TrashIcon,
  UndoIcon,
} from "@/components/ui/icons"
import { enterTransition, exitTransition } from "@/lib/motion"
import type { SketchToolMode } from "../shared/use-atrament-sketch"
import {
  hex6AndAlphaToRgba,
  matchesOpaquePreset,
  parseColorToRgba,
  rgbaToCss,
  rgbaToHex6,
} from "../shared/vico-color"

/** moon · holo · melon · spark · mint · aqua */
export const VICO_PRESET_COLORS = [
  "#f1efff",
  "#8c8eff",
  "#ff5d7e",
  "#ffd98a",
  "#9be3b4",
  "#8fd8e8",
]

const RAINBOW =
  "conic-gradient(from 0deg, #ff5d7e 0%, #ffd98a 16.67%, #9be3b4 33.33%, #8fd8e8 50%, #8c8eff 66.67%, #c9a7ff 83.33%, #ff5d7e 100%)"

const TRANSPARENCY_GRID: CSSProperties = {
  backgroundColor: "#2a2843",
  backgroundImage: `
    linear-gradient(45deg, #36344f 25%, transparent 25%),
    linear-gradient(-45deg, #36344f 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #36344f 75%),
    linear-gradient(-45deg, transparent 75%, #36344f 75%)
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

const iconButton = cn(
  "flex size-9.5 shrink-0 cursor-pointer items-center justify-center rounded-[11px] border border-transparent text-lilac outline-none",
  "transition-[background-color,border-color,color,scale] duration-150 ease-out-strong hover:bg-white/6 active:scale-[0.94]",
  "focus-visible:border-holo-soft/60",
  "disabled:cursor-default disabled:text-[#6f6c94] disabled:hover:bg-transparent disabled:active:scale-100",
)

const Divider = ({ wideOnly = false }: { wideOnly?: boolean }) => (
  <div
    className={cn(
      "mx-1 h-6.5 w-px shrink-0 bg-white/12",
      // In the narrow two-row layout these would dangle at row edges.
      wideOnly && "hidden @xl/appwindow:block",
    )}
    aria-hidden
  />
)

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
  const isCustomColor = !VICO_PRESET_COLORS.some((c) =>
    matchesOpaquePreset(color, c),
  )

  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(pickerRef as React.RefObject<HTMLElement>, () =>
    setPickerOpen(false),
  )

  const tool = (m: SketchToolMode, label: string, icon: ReactNode) => (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={mode === m}
      onClick={() => setMode(m)}
      className={cn(
        iconButton,
        mode === m &&
          "border-holo-soft/45! bg-holo/20! text-[#c9c9ff]!",
      )}
    >
      {icon}
    </button>
  )

  // Dot preview grows with the brush, capped to its 18px slot.
  const dotSize = Math.round(
    4 + ((brushWeight - brushWeightMin) / (brushWeightMax - brushWeightMin)) * 14,
  )

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-4.5 left-1/2 z-20 w-max max-w-[calc(100%-24px)] -translate-x-1/2"
    >
      <AnimatePresence>
        {pickerOpen ? (
          <motion.div
            className="absolute right-12 bottom-full mb-2.5 flex w-56 origin-bottom-right flex-col gap-3 rounded-2xl border border-white/12 bg-ink/95 p-3.5 shadow-[0_20px_50px_rgba(6,5,16,0.55)]"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: enterTransition }}
            exit={{ opacity: 0, y: 6, scale: 0.97, transition: exitTransition }}
          >
            <div className="flex items-center gap-3">
              <label
                className="relative size-10 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/16"
                style={TRANSPARENCY_GRID}
              >
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                <input
                  type="color"
                  value={rgbaToHex6(rgba)}
                  onChange={(e) =>
                    setColor(hex6AndAlphaToRgba(e.target.value, rgba.a))
                  }
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                  aria-label="Pick a custom color"
                />
              </label>
              <div className="flex min-w-0 flex-col">
                <span className="text-[13px] leading-4 font-medium text-moon">
                  Custom color
                </span>
                <span className="font-mono text-[11px] leading-4 text-haze uppercase">
                  {rgbaToHex6(rgba)}
                </span>
              </div>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="flex justify-between text-xs leading-4 text-haze">
                Opacity
                <span className="font-mono text-[11px] text-lilac">
                  {Math.round(rgba.a * 100)}%
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(rgba.a * 100)}
                onChange={(e) =>
                  setColor(rgbaToCss({ ...rgba, a: Number(e.target.value) / 100 }))
                }
                className="h-1 w-full cursor-pointer accent-holo"
                aria-label="Brush opacity"
              />
            </label>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        role="toolbar"
        aria-label="Drawing tools"
        className={cn(
          // Narrow windows: two rows (history · tools · clear / brush · colors).
          "flex flex-wrap items-center justify-center gap-1 rounded-[20px] border border-white/12 bg-ink/72 px-2 py-1.5",
          "@xl/appwindow:h-15 @xl/appwindow:flex-nowrap @xl/appwindow:py-0",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_50px_rgba(6,5,16,0.55)] backdrop-blur-[24px]",
          "pointer-coarse:bg-ink/95 pointer-coarse:backdrop-blur-none",
        )}
      >
        <button
          type="button"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
          disabled={!canUndo}
          onClick={undo}
          className={iconButton}
        >
          <UndoIcon className="size-4.25" />
        </button>
        <button
          type="button"
          title="Redo (Ctrl+Shift+Z)"
          aria-label="Redo"
          disabled={!canRedo}
          onClick={redo}
          className={iconButton}
        >
          <RedoIcon className="size-4.25" />
        </button>

        <Divider />

        {tool(MODE_DRAW, "Draw", <PencilIcon className="size-4.25" strokeWidth={1.9} />)}
        {tool(MODE_ERASE, "Erase", <EraserIcon className="size-4.25" />)}
        {tool(MODE_FILL, "Fill", <FillIcon className="size-4.25" />)}

        <Divider wideOnly />

        <div className="order-1 h-0 basis-full @xl/appwindow:hidden" aria-hidden />

        <label
          className="order-2 flex shrink-0 items-center gap-2.5 px-1.5 @xl/appwindow:order-none"
          title="Brush size — scroll on the canvas to resize"
        >
          <span className="flex size-4.5 shrink-0 items-center justify-center" aria-hidden>
            <span
              className="rounded-full"
              style={{ width: dotSize, height: dotSize, backgroundColor: color }}
            />
          </span>
          <input
            type="range"
            aria-label="Brush size"
            min={brushWeightMin}
            max={brushWeightMax}
            step={1}
            value={brushWeight}
            onChange={(e) => setBrushWeight(Number(e.target.value))}
            className="h-1 w-18 shrink-0 cursor-pointer accent-holo @xl/appwindow:w-24"
          />
          <span className="w-9 shrink-0 text-right font-mono text-[11px] leading-3.5 text-haze tabular-nums">
            {brushWeight}px
          </span>
        </label>

        <Divider wideOnly />

        <div className="order-2 flex shrink-0 items-center gap-1.5 px-1 @xl/appwindow:order-none">
          {VICO_PRESET_COLORS.map((c) => {
            const active = matchesOpaquePreset(color, c)
            return (
              <button
                key={c}
                type="button"
                aria-label={`Color ${c}`}
                aria-pressed={active}
                onClick={() => setColor(c)}
                className={cn(
                  "size-5.5 shrink-0 cursor-pointer rounded-full outline-none transition-[scale] duration-150 ease-out-strong hover:scale-110 active:scale-95",
                  active && "border-2 border-ink",
                )}
                style={{
                  backgroundColor: c,
                  boxShadow: active ? `0 0 0 2px ${c}` : undefined,
                }}
              />
            )
          })}
          <button
            type="button"
            aria-label="Custom color"
            aria-expanded={pickerOpen}
            aria-pressed={isCustomColor}
            onClick={() => setPickerOpen((open) => !open)}
            className={cn(
              "relative flex size-5.5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-origin-border outline-none transition-[scale] duration-150 ease-out-strong hover:scale-110 active:scale-95",
              isCustomColor && "shadow-[0_0_0_2px_#ffffff80]",
            )}
            style={{ backgroundImage: RAINBOW }}
          >
            {isCustomColor ? (
              <span
                className="size-2.5 rounded-full border border-ink"
                style={{ backgroundColor: color }}
                aria-hidden
              />
            ) : null}
          </button>
        </div>

        <Divider />

        <button
          type="button"
          title="Clear canvas"
          aria-label="Clear canvas"
          onClick={clearAll}
          className={cn(iconButton, "text-[#ff8fa6] hover:bg-melon/12")}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
