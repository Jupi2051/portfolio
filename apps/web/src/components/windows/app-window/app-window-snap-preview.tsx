import { motion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

type WindowRect = {
  x: number
  y: number
  width: number
  height: number
}

type Props = {
  windowRect: WindowRect
  targetRect: WindowRect | null
}

/** Gap between the preview and the edge of the snap zone. */
const SNAP_INSET = 6

const toMotionFrame = (rect: WindowRect, inset: number, borderRadius: number) => ({
  left: rect.x + inset,
  top: rect.y + inset,
  width: rect.width - inset * 2,
  height: rect.height - inset * 2,
  borderRadius,
})

/**
 * Periwinkle glass panel that grows out of the dragged window toward the
 * snap zone. It's the one place we tween layout props: the preview is a
 * single, short-lived element so the cost is negligible.
 */
const AppWindowSnapPreview = ({ windowRect, targetRect }: Props) => {
  const windowFrame = toMotionFrame(windowRect, 0, 16)
  const snapFrame = targetRect
    ? toMotionFrame(targetRect, SNAP_INSET, 14)
    : windowFrame
  const active = targetRect !== null

  return (
    <motion.div
      className="pointer-events-none absolute border-[1.5px] border-[rgba(170,172,255,0.85)] bg-holo/22 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-[6px]"
      initial={{ ...windowFrame, opacity: 0 }}
      animate={
        active ? { ...snapFrame, opacity: 1 } : { ...windowFrame, opacity: 0 }
      }
      exit={{ ...windowFrame, opacity: 0 }}
      transition={{ duration: 0.18, ease: EASE_OUT }}
    />
  )
}

export default AppWindowSnapPreview
