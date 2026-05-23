import type { Variants } from "framer-motion"

export const currentWallpaperVariants: Variants = {
  initial: { opacity: 0, scale: 1.03 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
}
