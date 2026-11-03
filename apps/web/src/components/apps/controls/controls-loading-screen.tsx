import { motion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

export default function ControlsLoadingScreen() {
  return (
    <motion.div
      className="flex h-full w-full items-center justify-center gap-2.5 bg-panel text-sm text-haze"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Delay so fast loads never flash a spinner.
      transition={{ duration: 0.2, delay: 0.15, ease: EASE_OUT }}
    >
      <span className="size-4 animate-spin rounded-full border-2 border-holo border-t-transparent" />
      Loading…
    </motion.div>
  )
}
