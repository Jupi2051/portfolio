import { motion, useReducedMotion } from "framer-motion"
import AppTileIcon from "@/components/ui/app-tile-icon"
import type { DesktopIconData } from "@/components/windows/desktop/apps-on-desktop"
import { EASE_OUT } from "@/lib/motion"

type LauncherAppProps = {
  app: DesktopIconData
  index: number
  onOpen: (app: DesktopIconData) => void
}

function LauncherApp({ app, index, onOpen }: LauncherAppProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(app)}
      className="group flex h-27.5 w-25 flex-col items-center gap-2 rounded-2xl border border-transparent px-1 pt-2.5 pb-1.5 outline-none select-none focus-visible:border-holo-soft/60"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.22,
        ease: EASE_OUT,
        delay: 0.04 + Math.min(index, 8) * 0.03,
      }}
    >
      <AppTileIcon src={app.IconPath} fill={app.IconFill} />
      <span className="line-clamp-2 w-full shrink-0 text-center text-[13px] leading-4 font-medium text-moon">
        {app.Name}
      </span>
    </motion.button>
  )
}

export default LauncherApp
