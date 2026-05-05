import { useCallback, useRef, useState } from "react";
import cn from "classnames";
import VicoBrushCursor from "./vico-brush-cursor";
import VicoToolbar from "./vico-toolbar";
import { useAtramentSketch } from "./use-atrament-sketch";

function isTextLikeInput(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "TEXTAREA") return true;
  if (tag !== "INPUT") return el.isContentEditable;
  const type = (el as HTMLInputElement).type;
  return (
    type === "text" ||
    type === "search" ||
    type === "url" ||
    type === "email" ||
    type === "password" ||
    type === "tel" ||
    type === "number"
  );
}

function Vico() {
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brushPointer, setBrushPointer] = useState<{ x: number; y: number } | null>(
    null,
  );

  const sketch = useAtramentSketch(containerRef, canvasRef);

  const showBrushFootprint =
    brushPointer != null &&
    (sketch.mode === sketch.MODE_DRAW || sketch.mode === sketch.MODE_ERASE);

  const onKeyDownCapture = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!rootRef.current?.contains(e.target as Node)) return;
      if (isTextLikeInput(e.target)) return;

      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      const key = e.key.toLowerCase();

      if (key === "z") {
        e.preventDefault();
        if (e.shiftKey) sketch.redo();
        else sketch.undo();
        return;
      }

      if (key === "y" && !e.shiftKey && e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        sketch.redo();
      }
    },
    [sketch.redo, sketch.undo],
  );

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className="flex h-full min-h-[280px] flex-col bg-ctp-base text-ctp-text outline-none focus-visible:ring-2 focus-visible:ring-ctp-lavender/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base"
      onPointerDownCapture={(ev) => {
        if (isTextLikeInput(ev.target)) return;
        rootRef.current?.focus({ preventScroll: true });
      }}
      onKeyDownCapture={onKeyDownCapture}
    >
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
          accentColor={sketch.color}
        />
      </div>
    </div>
  )
}

export default Vico;
