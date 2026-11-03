import { AnimatePresence, motion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

/**
 * Desktop backdrop. A new wallpaper fades in over the old one (rare action,
 * so it gets a slower 500ms crossfade). The vignettes keep icon labels and
 * the dock legible over bright artwork.
 */
function Wallpaper({ url }: { url: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <AnimatePresence initial={false}>
        <motion.div
          key={url}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${url})` }}
          initial={{ opacity: 0, zIndex: 1 }}
          animate={{ opacity: 1, zIndex: 1 }}
          exit={{ opacity: 1, zIndex: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        />
      </AnimatePresence>
      <div className="absolute inset-y-0 left-0 z-2 w-65 bg-[linear-gradient(90deg,rgba(12,11,26,0.62)_0%,rgba(12,11,26,0.35)_45%,rgba(12,11,26,0)_100%)] sm:w-105" />
      <div className="absolute inset-x-0 bottom-0 z-2 h-50 bg-[linear-gradient(0deg,rgba(12,11,26,0.55)_0%,rgba(12,11,26,0)_100%)]" />
    </div>
  )
}

export default Wallpaper
