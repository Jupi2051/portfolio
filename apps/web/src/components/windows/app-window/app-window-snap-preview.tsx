import { motion } from "framer-motion"
import { getMaximizeSnapPreviewRect } from "@/lib/app-window-snap"

function AppWindowSnapPreview() {
  const preview = getMaximizeSnapPreviewRect()

  return (
    <motion.div
      className="absolute pointer-events-none rounded-t-md border-2 border-ctp-sky-400/90 bg-ctp-sky-400/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      style={{
        left: preview.x,
        top: preview.y,
        width: preview.width,
        height: preview.height,
      }}
    />
  )
}

export default AppWindowSnapPreview
