import { motion } from "framer-motion"
import { getMaximizeSnapPreviewRect } from "@/lib/app-window-snap"

type WindowRect = {
  x: number
  y: number
  width: number
  height: number
}

type Props = {
  windowRect: WindowRect
  active: boolean
}

function AppWindowSnapPreview({ windowRect, active }: Props) {
  const target = getMaximizeSnapPreviewRect()
  const windowFrame = {
    left: windowRect.x,
    top: windowRect.y,
    width: windowRect.width,
    height: windowRect.height,
    borderRadius: 6,
  }
  const maximizeFrame = {
    left: target.x,
    top: target.y,
    width: target.width,
    height: target.height,
    borderRadius: 0,
  }

  return (
    <motion.div
      className="absolute pointer-events-none border-2 border-ctp-sky-400/90 bg-ctp-sky-400/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
      initial={{
        ...windowFrame,
        opacity: 0,
      }}
      animate={
        active
          ? { ...maximizeFrame, opacity: 1 }
          : { ...windowFrame, opacity: 0 }
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
