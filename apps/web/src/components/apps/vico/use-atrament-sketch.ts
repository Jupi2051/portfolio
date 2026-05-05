import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  type RefObject,
} from "react";
import Atrament, {
  MODE_DISABLED,
  MODE_DRAW,
  MODE_ERASE,
  MODE_FILL,
} from "atrament";
import fill from "atrament/fill";
import type { SketchHistoryEntry } from "./types";
import { cloneRecordedStroke, replayFill, replayStroke } from "./replay";

export type SketchToolMode =
  | typeof MODE_DRAW
  | typeof MODE_ERASE
  | typeof MODE_FILL;

/** Range passed to `sketch.weight` (stroke width in CSS px; preview circle uses this as diameter). */
export const VICO_BRUSH_WEIGHT_MIN = 2;
export const VICO_BRUSH_WEIGHT_MAX = 120;

const BRUSH_WHEEL_STEP = 2;

function syncCanvasToContainer(
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
): boolean {
  const rect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width === w && canvas.height === h) return false;
  canvas.width = w;
  canvas.height = h;
  return true;
}

/**
 * Changing canvas width/height resets the 2D context (lineCap reverts to "butt").
 * Atrament only sets round caps in its constructor, so we must restore them after resize.
 */
function reapplyAtramentContextDefaults(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

export function useAtramentSketch(
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
) {
  const sketchRef = useRef<Atrament | null>(null);
  const committedRef = useRef<SketchHistoryEntry[]>([]);
  const redoRef = useRef<SketchHistoryEntry[]>([]);
  const replayingRef = useRef(false);
  const replayFnRef = useRef<() => Promise<void>>(async () => {});
  const modeRef = useRef<SketchToolMode>(MODE_DRAW);

  const [, bump] = useReducer((n: number) => n + 1, 0);

  const [mode, setModeState] = useState<SketchToolMode>(MODE_DRAW);
  const [color, setColorState] = useState("#cba6f7");
  const [brushWeight, setBrushWeightState] = useState(8);
  const brushWeightRef = useRef(brushWeight);
  brushWeightRef.current = brushWeight;

  modeRef.current = mode;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const didResize = syncCanvasToContainer(canvas, container);
    if (didResize) reapplyAtramentContextDefaults(canvas);

    const sketch = new Atrament(canvas, { fill });
    sketch.recordStrokes = true;
    sketch.color = color;
    sketch.mode = modeRef.current;
    sketch.weight = brushWeightRef.current;
    sketchRef.current = sketch;

    const pushUndoSnapshot = (entry: SketchHistoryEntry) => {
      if (replayingRef.current) return;
      committedRef.current.push(entry);
      redoRef.current = [];
      bump();
    };

    const onStrokeRecorded = (detail: { stroke: Parameters<typeof cloneRecordedStroke>[0] }) => {
      if (replayingRef.current) return;
      pushUndoSnapshot({ type: "stroke", stroke: cloneRecordedStroke(detail.stroke) });
    };

    const onFillStart = (detail: { x: number; y: number }) => {
      if (replayingRef.current) return;
      pushUndoSnapshot({
        type: "fill",
        fillColor: sketch.color,
        x: detail.x,
        y: detail.y,
      });
    };

    sketch.addEventListener("strokerecorded", onStrokeRecorded as EventListener);
    sketch.addEventListener("fillstart", onFillStart as EventListener);

    async function replay(): Promise<void> {
      const s = sketchRef.current;
      const c = canvasRef.current;
      if (!s || !c) return;

      replayingRef.current = true;
      const restoreMode = modeRef.current;
      s.recordStrokes = false;
      s.mode = MODE_DISABLED;
      s.clear();

      const ctx = c.getContext("2d");
      const globalAlpha = ctx?.globalAlpha ?? 1;

      try {
        for (const entry of committedRef.current) {
          if (entry.type === "stroke") {
            replayStroke(s, entry.stroke);
          } else {
            await replayFill(c, {
              fillColor: entry.fillColor,
              x: entry.x,
              y: entry.y,
              globalAlpha,
            });
          }
        }
      } finally {
        s.recordStrokes = true;
        s.mode = restoreMode;
        replayingRef.current = false;
        bump();
      }
    }

    replayFnRef.current = replay;

    void replay();

    const ro = new ResizeObserver(() => {
      if (syncCanvasToContainer(canvas, container)) {
        reapplyAtramentContextDefaults(canvas);
      }
      void replayFnRef.current();
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      sketch.removeEventListener("strokerecorded", onStrokeRecorded as EventListener);
      sketch.removeEventListener("fillstart", onFillStart as EventListener);
      sketch.destroy();
      sketchRef.current = null;
    };
  }, [canvasRef, containerRef]);

  useEffect(() => {
    sketchRef.current && (sketchRef.current.color = color);
  }, [color]);

  useEffect(() => {
    const s = sketchRef.current;
    if (!s) return;
    s.weight = brushWeight;
  }, [brushWeight]);

  useEffect(() => {
    const s = sketchRef.current;
    if (!s || replayingRef.current) return;
    s.mode = mode;
  }, [mode]);

  const setMode = useCallback((next: SketchToolMode) => {
    setModeState(next);
  }, []);

  const setColor = useCallback((next: string) => {
    setColorState(next);
  }, []);

  const setBrushWeight = useCallback((value: number | ((prev: number) => number)) => {
    setBrushWeightState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      return Math.min(
        VICO_BRUSH_WEIGHT_MAX,
        Math.max(VICO_BRUSH_WEIGHT_MIN, Math.round(next)),
      );
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -BRUSH_WHEEL_STEP : BRUSH_WHEEL_STEP;
      setBrushWeight((w) => w + delta);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [containerRef, setBrushWeight]);

  const undo = useCallback(() => {
    if (committedRef.current.length === 0) return;
    const last = committedRef.current.pop()!;
    redoRef.current.push(last);
    void replayFnRef.current();
    bump();
  }, []);

  const redo = useCallback(() => {
    if (redoRef.current.length === 0) return;
    const next = redoRef.current.pop()!;
    committedRef.current.push(next);
    void replayFnRef.current();
    bump();
  }, []);

  const clearAll = useCallback(() => {
    committedRef.current = [];
    redoRef.current = [];
    void replayFnRef.current();
    bump();
  }, []);

  const canUndo = committedRef.current.length > 0;
  const canRedo = redoRef.current.length > 0;

  return {
    undo,
    redo,
    clearAll,
    canUndo,
    canRedo,
    mode,
    setMode,
    color,
    setColor,
    brushWeight,
    setBrushWeight,
    VICO_BRUSH_WEIGHT_MIN,
    VICO_BRUSH_WEIGHT_MAX,
    MODE_DRAW,
    MODE_ERASE,
    MODE_FILL,
  };
}
