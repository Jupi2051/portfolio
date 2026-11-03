import { motion, useReducedMotion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

function WallpapersRocketHeader({ count }: { count: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.header
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2"
    >
      <div className="flex flex-col gap-1.5">
        <h1 className="font-serif text-[40px] leading-11 tracking-[-0.01em] text-moon-bright italic @2xl/appwindow:text-5xl @2xl/appwindow:leading-12.5">
          Pick a sky.
        </h1>
        <p className="text-sm leading-5 text-haze">
          Click a wallpaper and it lands on your desktop straight away.
        </p>
      </div>
      <span className="pb-1 text-xs leading-4 font-semibold tracking-[0.14em] text-holo uppercase">
        {count} {count === 1 ? "wallpaper" : "wallpapers"}
      </span>
    </motion.header>
  )
}

export default WallpapersRocketHeader
