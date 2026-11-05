import {
  motion,
  useAnimate,
  useReducedMotion,
  type Transition,
} from "framer-motion"
import { useDispatch } from "react-redux"
import cn from "classnames"
import { setMinimizedState } from "@/storage/slices/desktop"
import useAppWindowData from "@/hooks/use-app-window-data"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import { pressTransition } from "@/lib/motion"

type DockAppProps = {
  Icon: string
  AppId: number
}

/** Minimising dips the icon, restoring lifts it — a one-off hop, not a loop. */
const HOP_DISTANCE = { minimize: 4, restore: -4 }

const HOP_TRANSITION: Transition = {
  duration: 0.34,
  times: [0, 0.42, 1],
  // Decelerate into the apex, then ease back down: speed is zero at the top,
  // so the hop reads as one arc rather than two separate movements.
  ease: [
    [0.33, 1, 0.68, 1],
    [0.45, 0, 0.55, 1],
  ],
}

function DockApp({ Icon, AppId }: DockAppProps) {
  const { isMinimized, isFocused, focusWindow, bringWindowToFront } =
    useAppWindowData(AppId)
  const { unFocusAllWindows } = useGlobalWindowsControls()
  const [iconRef, animate] = useAnimate<HTMLImageElement>()
  const reduceMotion = useReducedMotion()
  const dispatch = useDispatch()

  const hop = (direction: keyof typeof HOP_DISTANCE) => {
    if (reduceMotion) return
    // `null` starts from the current position, so a click mid-hop can't snap.
    animate(
      iconRef.current,
      { y: [null, HOP_DISTANCE[direction], 0] },
      HOP_TRANSITION,
    )
  }

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!isMinimized && !isFocused) {
      bringWindowToFront()
      focusWindow()
      return
    }

    const nextMinimized = !isMinimized
    dispatch(setMinimizedState({ id: AppId, state: nextMinimized }))

    if (nextMinimized) unFocusAllWindows()
    else {
      focusWindow()
      bringWindowToFront()
    }

    hop(nextMinimized ? "minimize" : "restore")
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
      {/* will-change: the dock is centred, so icons can land on a half pixel.
          Keeping the layer promoted avoids a visible shift when the hop hands
          off to the GPU at its start and end. */}
      <img
        ref={iconRef}
        src={Icon}
        alt=""
        draggable={false}
        className="pointer-events-none max-h-7 max-w-7 rounded-[7px] will-change-transform sm:max-h-8 sm:max-w-8"
      />
      {/* Open-app dot, with the focused pill growing out of it. Only scale and
          opacity animate, so this never repaints under the dock's blur. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-1/2 h-0.75 w-1 -translate-x-1/2 rounded-full bg-haze sm:-bottom-1.25"
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-1 left-1/2 h-0.75 w-3.5 -translate-x-1/2 rounded-full bg-melon shadow-[0_0_8px_rgba(255,93,126,0.7)] sm:-bottom-1.25",
          // The fade is much shorter than the stretch so the growth stays
          // visible; entering settles with a slight overshoot, leaving doesn't.
          isFocused
            ? "scale-x-100 opacity-100 [transition:scale_380ms_cubic-bezier(0.34,1.45,0.64,1),opacity_120ms_ease-out]"
            : "scale-x-[0.2857] opacity-0 [transition:scale_280ms_cubic-bezier(0.45,0,0.55,1),opacity_160ms_ease-in_120ms]",
        )}
      />
    </motion.button>
  )
}

export default DockApp
