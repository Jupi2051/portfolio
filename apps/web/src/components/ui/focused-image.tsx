import { useRef, useState, type RefObject } from "react"
import { useResizeObserver } from "usehooks-ts"
import cn from "classnames"

type Props = {
  src: string
  /** Subject position in the artwork, 0–1 on each axis. */
  focus: { x: number; y: number }
  className?: string
}

/**
 * Where the focal point should sit along one axis, as an object-position %.
 * `object-position: 60%` only lines the image's 60% up with the box's 60%;
 * this works out the offset that actually centres the subject, clamped so
 * the image never pulls away from an edge.
 */
const axisPosition = (focus: number, box: number, rendered: number) => {
  const overflow = rendered - box
  if (overflow <= 0.5) return 50
  const offset = Math.min(Math.max(focus * rendered - box / 2, 0), overflow)
  return (offset / overflow) * 100
}

/** An `object-cover` image whose crop keeps the subject centred at any size. */
export default function FocusedImage({ src, focus, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { width = 0, height = 0 } = useResizeObserver({
    ref: ref as RefObject<HTMLDivElement>,
  })
  const [aspect, setAspect] = useState(16 / 9)

  // object-cover scales the image up until both axes are covered.
  const scale = Math.max(width / aspect, height)
  const renderedWidth = scale * aspect
  const renderedHeight = scale

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <img
        src={src}
        alt=""
        draggable={false}
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget
          if (naturalWidth && naturalHeight) setAspect(naturalWidth / naturalHeight)
        }}
        className="size-full object-cover"
        style={{
          objectPosition: `${axisPosition(focus.x, width, renderedWidth)}% ${axisPosition(focus.y, height, renderedHeight)}%`,
        }}
      />
    </div>
  )
}
