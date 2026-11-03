import { useState } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import cn from "classnames"
import { setMinimizedState } from "@/storage/slices/desktop"
import useAppWindowData from "@/hooks/use-app-window-data"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import { EASE_OUT, pressTransition } from "@/lib/motion"

type DockAppProps = {
  Icon: string
  AppId: number
}

const ICON_NUDGE = {
  // Minimising dips the icon, restoring lifts it — a one-off nudge, not a loop.
  restore: { y: [0, -3, 0] },
  minimize: { y: [0, 3, 0] },
  idle: { y: 0 },
}

function DockApp({ Icon, AppId }: DockAppProps) {
  const { isMinimized, isFocused, focusWindow, bringWindowToFront } =
    useAppWindowData(AppId)
  const { unFocusAllWindows } = useGlobalWindowsControls()
  const [nudge, setNudge] = useState<keyof typeof ICON_NUDGE>("idle")
  const dispatch = useDispatch()

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!isMinimized && !isFocused) {
      bringWindowToFront()
      focusWindow()
      setNudge("idle")
      return
    }

    const nextMinimized = !isMinimized
    dispatch(setMinimizedState({ id: AppId, state: nextMinimized }))

    if (nextMinimized) unFocusAllWindows()
    else {
      focusWindow()
      bringWindowToFront()
    }

    setNudge(nextMinimized ? "minimize" : "restore")
  }

  return (
    <motion.button
      type="button"
      aria-label="Toggle window"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={pressTransition}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-[14px] border outline-none sm:size-13 sm:rounded-2xl",
        "transition-colors duration-150 ease-out-strong focus-visible:border-holo-soft/60",
        isFocused
          ? "border-white/8 bg-white/9"
          : "border-transparent hover:bg-white/6",
      )}
    >
      <motion.img
        src={Icon}
        alt=""
        draggable={false}
        className="pointer-events-none max-h-7 max-w-7 rounded-[7px] sm:max-h-8 sm:max-w-8"
        variants={ICON_NUDGE}
        animate={nudge}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        onAnimationComplete={() => setNudge("idle")}
      />
      <motion.span
        className="pointer-events-none absolute -bottom-1 left-1/2 h-0.75 -translate-x-1/2 rounded-full sm:-bottom-1.25"
        initial={false}
        animate={{
          width: isFocused ? 14 : 4,
          backgroundColor: isFocused ? "#ff5d7e" : "#b9b6da",
          boxShadow: isFocused
            ? "0 0 8px rgba(255,93,126,0.7)"
            : "0 0 0px rgba(255,93,126,0)",
        }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
      />
    </motion.button>
  )
}

export default DockApp
