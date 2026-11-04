import { AnimatePresence, motion, Reorder } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { useEventListener } from "usehooks-ts"
import cn from "classnames"
import { RootState } from "@/storage/store"
import {
  setTaskbarApplications,
  type TaskbarOpenApplication,
} from "@/storage/slices/taskbar"
import useStartMenu from "@/hooks/use-start-menu"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import { LauncherIcon, SearchIcon } from "@/components/ui/icons"
import { enterTransition, exitTransition, pressTransition } from "@/lib/motion"
import DockApp from "./dock-app"
import SystemTray from "./system-tray"

/** Marks buttons that toggle the launcher so its click-outside handler ignores them. */
export const LAUNCHER_TRIGGER_ATTR = "data-launcher-trigger"

function Dock({ className }: { className?: string }) {
  const dispatch = useDispatch()
  const { isRendered, setRenderStartMenu } = useStartMenu()
  const { unFocusAllWindows } = useGlobalWindowsControls()
  const openApps = useSelector(
    (x: RootState) => x.taskbarState.TaskbarOpenApplications,
  )

  const toggleLauncher = () => {
    unFocusAllWindows()
    setRenderStartMenu(!isRendered)
  }

  const openLauncher = () => {
    unFocusAllWindows()
    setRenderStartMenu(true)
  }

  // "/" opens the launcher (the hint lives in its search field) unless the
  // user is already typing somewhere.
  useEventListener("keydown", (event) => {
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey)
      return
    const target = event.target
    if (
      target instanceof Element &&
      target.closest("input, textarea, [contenteditable='true']")
    )
      return
    event.preventDefault()
    openLauncher()
  })

  return (
    <div
      className={cn(
        "relative flex items-start justify-center px-2 pt-1 sm:px-4 sm:pt-2",
        className,
      )}
    >
      <motion.div
        layout
        style={{ borderRadius: 24 }}
        transition={enterTransition}
        className={cn(
          "flex h-14 items-center border border-white/12 bg-ink/58 p-1.5 backdrop-blur-xl sm:h-17 sm:p-2",
          // Backdrop blur is very costly on phone GPUs; go opaque on touch.
          "pointer-coarse:bg-ink/90 pointer-coarse:backdrop-blur-none",
          "shadow-[0_20px_50px_rgba(8,7,20,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]",
        )}
      >
        <motion.button
          layout="position"
          type="button"
          aria-label="Open launcher"
          aria-expanded={isRendered}
          {...{ [LAUNCHER_TRIGGER_ATTR]: true }}
          onClick={toggleLauncher}
          whileTap={{ scale: 0.92 }}
          transition={pressTransition}
          className={cn(
            "flex size-11 items-center justify-center rounded-[14px] border text-moon outline-none sm:size-13 sm:rounded-2xl",
            "transition-[background-image,border-color,box-shadow] duration-200 ease-out-strong focus-visible:border-holo-soft",
            isRendered
              ? "border-[rgba(190,192,255,0.6)] bg-[linear-gradient(160deg,rgba(140,142,255,0.7)_0%,rgba(140,142,255,0.35)_100%)] shadow-[0_0_0_4px_rgba(140,142,255,0.16)]"
              : "border-[rgba(160,162,255,0.35)] bg-[linear-gradient(160deg,rgba(140,142,255,0.38)_0%,rgba(140,142,255,0.12)_100%)]",
          )}
        >
          <LauncherIcon className="size-5 sm:size-5.5" />
        </motion.button>

        <motion.button
          layout="position"
          type="button"
          aria-label="Search apps"
          {...{ [LAUNCHER_TRIGGER_ATTR]: true }}
          onClick={openLauncher}
          whileTap={{ scale: 0.92 }}
          transition={pressTransition}
          className="ml-1 flex size-11 items-center justify-center rounded-[14px] text-lilac outline-none sm:ml-1.5 transition-colors duration-150 ease-out-strong hover:bg-white/6 focus-visible:bg-white/8 sm:size-13 sm:rounded-2xl"
        >
          <SearchIcon className="size-5 sm:size-5.5" />
        </motion.button>

        <AnimatePresence initial={false}>
          {openApps.length > 0 && (
            <motion.div
              key="divider"
              layout="position"
              className="mx-1 h-7 w-px shrink-0 bg-white/14 sm:mx-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: exitTransition }}
            />
          )}
        </AnimatePresence>

        <Reorder.Group
          as="ul"
          axis="x"
          values={openApps}
          onReorder={(value: TaskbarOpenApplication[]) =>
            dispatch(setTaskbarApplications(value))
          }
          className="relative flex list-none items-center gap-1 sm:gap-1.5"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {openApps.map((app) => (
              <Reorder.Item
                key={app.id}
                value={app}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: exitTransition }}
                transition={enterTransition}
              >
                <DockApp Icon={app.Icon} AppId={app.AppId} />
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </motion.div>

      <SystemTray className="absolute top-4 right-6 hidden sm:flex" />
    </div>
  )
}

export default Dock
