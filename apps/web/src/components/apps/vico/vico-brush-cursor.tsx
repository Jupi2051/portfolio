type Props = {
  x: number;
  y: number;
  visible: boolean;
  /** Matches atrament stroke width (circle diameter in CSS px). */
  diameterPx: number;
  accentRgb?: string;
};

/** Brush footprint overlay (pointer-events none). */
export default function VicoBrushCursor({
  x,
  y,
  visible,
  diameterPx,
  accentRgb = "205, 214, 244",
}: Props) {
  if (!visible || diameterPx <= 0) return null;

  const r = diameterPx / 2;
  return (
    <div
      className="pointer-events-none absolute z-10 rounded-full border-2 border-solid shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
      style={{
        left: x - r,
        top: y - r,
        width: diameterPx,
        height: diameterPx,
        borderColor: `rgba(${accentRgb}, 0.92)`,
        backgroundColor: `rgba(${accentRgb}, 0.06)`,
      }}
      aria-hidden
    />
  );
}
