import { motion } from "framer-motion"

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

const toMotionFrame = (rect: WindowRect, borderRadius: number) => ({
  left: rect.x,
  top: rect.y,
  width: rect.width,
  height: rect.height,
  borderRadius,
})

const AppWindowSnapPreview = ({ windowRect, targetRect }: Props) => {
  const windowFrame = toMotionFrame(windowRect, 6)
  const snapFrame = targetRect ? toMotionFrame(targetRect, 0) : windowFrame
  const active = targetRect !== null

  return (
    <motion.div
      className="absolute pointer-events-none border-2 border-ctp-sky-400/90 bg-ctp-sky-400/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
      initial={{
        ...windowFrame,
        opacity: 0,
      }}
      animate={
        active ? { ...snapFrame, opacity: 1 } : { ...windowFrame, opacity: 0 }
      }
      exit={{
        ...windowFrame,
        opacity: 0,
      }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    />
  )
}

export default AppWindowSnapPreview
