import type { Variants } from "framer-motion"

export const galleryContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

export const galleryItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
}

export const currentWallpaperVariants: Variants = {
  initial: { opacity: 0, scale: 1.03 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
}
