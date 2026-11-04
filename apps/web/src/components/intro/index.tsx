import { motion, useReducedMotion } from "framer-motion"
import Julogo from "@/components/apps/about-me/jupi-logo"
import OrbitLoader from "@/components/ui/orbit-loader"
import { EASE_OUT } from "@/lib/motion"

const Intro = ({ setLoaded }: { setLoaded: () => void }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="absolute inset-0 z-50 h-dvh w-screen cursor-pointer overflow-hidden bg-ink-deep text-white select-none"
      onClick={setLoaded}
      // One short, decisive fade so the desktop can take over right after.
      exit={{ opacity: 0, transition: { duration: 0.45, ease: EASE_OUT } }}
    >
      <motion.div
        className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(140,142,255,0.14)_0%,rgba(14,13,26,0)_55%)]"
        // Transform + opacity only: a full-screen animated blur here ran
        // while the desktop was loading behind it and dropped frames on phones.
        initial={{ scale: reduceMotion ? 1 : 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{
          scale: reduceMotion ? 1 : 1.15,
          opacity: 0,
          transition: { duration: 0.45, ease: EASE_OUT },
        }}
        transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT }}
      >
        <div className="relative">
          <Julogo
            className="absolute top-1/2 left-1/2 w-18 -translate-1/2"
            Size={210}
            skipEnterAnimation={true}
          />
          <OrbitLoader className="absolute top-1/2" moonClassName="w-4!" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Intro
