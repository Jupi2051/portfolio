import { RefObject, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"
import cn from "classnames"
import useStartMenu from "@/hooks/use-start-menu"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import useGlobalTaskbarControls from "@/hooks/use-global-taskbar-controls"
import {
  DesktopIcons,
  type DesktopIconData,
} from "@/components/windows/desktop/apps-on-desktop"
import { LAUNCHER_TRIGGER_ATTR } from "@/components/windows/dock"
import { SearchIcon } from "@/components/ui/icons"
import { enterTransition, exitTransition } from "@/lib/motion"
import LauncherApp from "./launcher-app"
import LauncherFooter from "./launcher-footer"

const greeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

function LauncherPanel({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")
  const reduceMotion = useReducedMotion()
  const { openNewApplication } = useGlobalWindowsControls()
  const { openNewTaskbarApplication } = useGlobalTaskbarControls()

  useOnClickOutside(panelRef as RefObject<HTMLDivElement>, (event) => {
    const target = event.target as Element | null
    if (target?.closest(`[${LAUNCHER_TRIGGER_ATTR}]`)) return
    onClose()
  })

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return DesktopIcons
    return DesktopIcons.filter((app) => app.Name.toLowerCase().includes(needle))
  }, [query])

  const openApp = (app: DesktopIconData) => {
    onClose()
    const { focusWindow, bringWindowToFront, app: opened } = openNewApplication(
      {
        App: app.AppComponent,
        processIcon: app.customTaskbarIcon ?? app.IconPath,
        processName: app.Name,
        processData: app.processData,
      },
    )
    focusWindow()
    bringWindowToFront()
    openNewTaskbarApplication({
      id: opened.id,
      AppId: opened.id,
      Icon: app.IconPath,
      CustomTaskbarIcon: app.customTaskbarIcon,
    })
  }

  const hidden = { opacity: 0, y: reduceMotion ? 0 : 8, scale: 0.97 }

  return (
    <>
      <motion.div
        className="absolute inset-0 bg-[rgba(10,9,22,0.5)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: enterTransition }}
        exit={{ opacity: 0, transition: exitTransition }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-label="Launcher"
        className={cn(
          "absolute bottom-19 left-1/2 flex w-170 max-w-[calc(100vw-16px)] -translate-x-1/2 origin-bottom flex-col overflow-hidden sm:bottom-25",
          "rounded-[28px] border border-white/12 bg-[rgba(20,19,36,0.78)] backdrop-blur-[16px]",
          "pointer-coarse:bg-[rgba(20,19,36,0.95)] pointer-coarse:backdrop-blur-none",
          "shadow-[0_30px_80px_rgba(6,5,16,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]",
        )}
        initial={hidden}
        animate={{ opacity: 1, y: 0, scale: 1, transition: enterTransition }}
        exit={{ ...hidden, transition: exitTransition }}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose()
        }}
      >
        <div className="flex flex-col gap-6 px-5 pt-7 pb-5 sm:px-8 sm:pt-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-[28px] leading-8 text-moon italic sm:text-[34px] sm:leading-9.5">
              {greeting()} — what are we opening?
            </h2>
            <label className="flex h-11.5 items-center gap-3 rounded-[14px] border border-holo-soft/40 bg-white/6 px-4 shadow-[0_0_0_4px_rgba(140,142,255,0.1)] transition-[border-color,box-shadow] duration-150 ease-out-strong focus-within:border-holo-soft/70">
              <SearchIcon className="size-4.5 shrink-0 text-haze" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && results[0]) openApp(results[0])
                }}
                placeholder="Search apps, posts and files"
                className="min-w-0 flex-1 bg-transparent text-sm text-moon outline-none placeholder:text-haze-dim"
              />
              <kbd className="rounded-md border border-white/14 px-1.75 py-0.75 font-mono text-xs leading-4 text-haze">
                /
              </kbd>
            </label>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between px-1">
              <span className="text-xs leading-4 font-semibold tracking-[0.14em] text-haze uppercase">
                {query ? "Results" : "All apps"}
              </span>
              <span className="text-xs leading-4 font-medium text-holo">
                {results.length}
              </span>
            </div>
            {results.length > 0 ? (
              <div className="grid grid-cols-3 justify-items-center gap-y-2.5 sm:grid-cols-6">
                {results.map((app, index) => (
                  <LauncherApp
                    key={app.id}
                    app={app}
                    index={index}
                    onOpen={openApp}
                  />
                ))}
              </div>
            ) : (
              <p className="px-1 py-8 text-center text-sm text-haze">
                Nothing matches “{query}”.
              </p>
            )}
          </div>
        </div>
        <LauncherFooter />
      </motion.div>
    </>
  )
}

function Launcher({ className }: { className?: string }) {
  const { isRendered, setRenderStartMenu } = useStartMenu()

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <AnimatePresence>
        {isRendered && (
          <motion.div
            key="launcher"
            className="pointer-events-auto absolute inset-0"
            exit={{ opacity: 1, transition: exitTransition }}
          >
            <LauncherPanel onClose={() => setRenderStartMenu(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Launcher
