import cn from "classnames"

type AppTileIconProps = {
  src: string
  /** Square artwork (avatars, photos) fills the tile edge to edge. */
  fill?: boolean
  selected?: boolean
  className?: string
}

/**
 * The frosted 60px squircle every app icon sits in. Hover / press react to a
 * parent `group` so the whole cell (tile + label) is the hit target.
 */
function AppTileIcon({ src, fill, selected, className }: AppTileIconProps) {
  return (
    <div
      className={cn(
        "relative flex size-15 shrink-0 items-center justify-center overflow-hidden rounded-[18px] border",
        "shadow-[0_8px_24px_rgba(8,7,20,0.35)] transition-[translate,scale,box-shadow,border-color] duration-200 ease-out-strong",
        "group-hover:-translate-y-0.5 group-hover:border-holo-soft/45 group-hover:shadow-[0_12px_28px_rgba(8,7,20,0.45),0_0_18px_rgba(140,142,255,0.22)]",
        "group-active:scale-[0.96] group-active:duration-100",
        fill
          ? "border-white/16 bg-ink"
          : "border-white/12 bg-ink/55 backdrop-blur-[18px] pointer-coarse:bg-ink/88 pointer-coarse:backdrop-blur-none",
        selected &&
          "border-holo-soft/55! shadow-[0_8px_24px_rgba(8,7,20,0.35),0_0_0_4px_rgba(140,142,255,0.12)]!",
        className,
      )}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className={cn(
          "pointer-events-none select-none",
          fill ? "size-full object-cover" : "max-h-10.5 max-w-10.5",
        )}
      />
    </div>
  )
}

export default AppTileIcon
