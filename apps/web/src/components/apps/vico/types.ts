/** Serialized stroke from atrament when `recordStrokes` is enabled */
export type RecordedStroke = {
  segments: Array<{
    point: { x: number; y: number };
    time: number;
    pressure: number;
  }>;
  mode: string;
  weight: number;
  smoothing: number;
  color: string;
  adaptiveStroke: boolean;
};

export type StrokeHistoryEntry = {
  type: "stroke";
  stroke: RecordedStroke;
};

export type FillHistoryEntry = {
  type: "fill";
  fillColor: string;
  x: number;
  y: number;
};

export type SketchHistoryEntry = StrokeHistoryEntry | FillHistoryEntry;
