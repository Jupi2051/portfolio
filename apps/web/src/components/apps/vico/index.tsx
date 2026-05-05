import { useMemo, useRef, useState } from "react";
import cn from "classnames";
import VicoBrushCursor from "./vico-brush-cursor";
import VicoToolbar from "./vico-toolbar";
import { useAtramentSketch } from "./use-atrament-sketch";

function hexToRgbCss(hex: string): string {
  const h = hex.replace("#", "").trim();
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "205, 214, 244";
}

function Vico() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brushPointer, setBrushPointer] = useState<{ x: number; y: number } | null>(
    null,
  );

  const sketch = useAtramentSketch(containerRef, canvasRef);

  const brushRingRgb = useMemo(() => hexToRgbCss(sketch.color), [sketch.color]);
  const showBrushFootprint =
    brushPointer != null &&
    (sketch.mode === sketch.MODE_DRAW || sketch.mode === sketch.MODE_ERASE);

  return (
    <div className="flex h-full min-h-[280px] flex-col bg-ctp-base text-ctp-text">
      <VicoToolbar
        mode={sketch.mode}
        setMode={sketch.setMode}
        color={sketch.color}
        setColor={sketch.setColor}
        brushWeight={sketch.brushWeight}
        setBrushWeight={sketch.setBrushWeight}
        brushWeightMin={sketch.VICO_BRUSH_WEIGHT_MIN}
        brushWeightMax={sketch.VICO_BRUSH_WEIGHT_MAX}
        undo={sketch.undo}
        redo={sketch.redo}
        clearAll={sketch.clearAll}
        canUndo={sketch.canUndo}
        canRedo={sketch.canRedo}
        MODE_DRAW={sketch.MODE_DRAW}
        MODE_ERASE={sketch.MODE_ERASE}
        MODE_FILL={sketch.MODE_FILL}
      />
      <div
        ref={containerRef}
        className="relative min-h-0 flex-1 bg-ctp-mantle"
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setBrushPointer({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onPointerLeave={() => setBrushPointer(null)}
      >
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 block h-full w-full touch-none",
            sketch.mode === sketch.MODE_FILL ? "cursor-crosshair" : "cursor-none",
          )}
        />
        <VicoBrushCursor
          x={brushPointer?.x ?? 0}
          y={brushPointer?.y ?? 0}
          visible={showBrushFootprint}
          diameterPx={sketch.brushWeight}
          accentRgb={brushRingRgb}
        />
      </div>
    </div>
  );
}

export default Vico;
