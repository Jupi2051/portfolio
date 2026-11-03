import type { ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import cn from "classnames"
import { useTRPC } from "@/lib/trpc/trpc"
import { useMutation, useQuery } from "@tanstack/react-query"
import { LauncherIcon, SignOutIcon } from "@/components/ui/icons"
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion"
import type {
  ControlsPanel,
  NavigateToPanel,
} from "./aritcle-controls/controls-panel-types"

type Props = {
  panel: ControlsPanel
  onNavigate: NavigateToPanel
  onLoggedOut: () => void
  children: ReactNode
}

type NavItem = {
  panel: ControlsPanel
  label: string
  icon: ReactNode
}

const appIcon = (src: string, rounded = false) => (
  <img
    src={src}
    alt=""
    className={cn("size-5 object-contain", rounded && "rounded-md object-cover")}
  />
)

const NAV_ITEMS: NavItem[] = [
  {
    panel: "overview",
    label: "Overview",
    icon: <LauncherIcon className="size-4 text-[#c9c9ff]" />,
  },
  {
    panel: "articles",
    label: "Articles",
    icon: appIcon("/Imgs/DesktopApps/Notepad.webp"),
  },
  {
    panel: "vico",
    label: "Vico approvals",
    icon: appIcon("/Imgs/Apps/Photos.jpg", true),
  },
  {
    panel: "rivals-randomizer",
    label: "Rivals randomizer",
    icon: appIcon("/Imgs/DesktopApps/Rivals.webp"),
  },
  {
    panel: "valorant-randomizer",
    label: "Valorant randomizer",
    icon: appIcon("/Imgs/DesktopApps/ValorantRandomizer.webp"),
  },
]

export default function AuthenticatedShell({
  panel,
  onNavigate,
  onLoggedOut,
  children,
}: Props) {
  const trpc = useTRPC()
  const reduceMotion = useReducedMotion()
  const logoutUser = useMutation(trpc.users.logout.mutationOptions())
  const { data: me } = useQuery(trpc.users.me.queryOptions())
  const { data: overview } = useQuery(trpc.controls.overview.queryOptions())

  const badges: Partial<Record<ControlsPanel, ReactNode>> = {
    articles: overview ? (
      <span className="text-xs font-medium text-haze-dim">
        {overview.articles.count}
      </span>
    ) : null,
    vico:
      overview && overview.vico.pendingCount > 0 ? (
        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-melon px-1.5 text-[11px] leading-3.5 font-bold text-white">
          {overview.vico.pendingCount}
        </span>
      ) : null,
  }

  function handleLogout() {
    logoutUser.mutate(undefined, { onSuccess: () => onLoggedOut() })
  }

  return (
    <div className="flex h-full min-h-0 w-full bg-panel">
      <nav
        aria-label="Controls sections"
        className="flex w-16 shrink-0 flex-col justify-between border-r border-white/6 bg-panel-sunken px-2 pt-6 pb-3.5 @2xl/appwindow:w-58 @2xl/appwindow:px-3"
      >
        <div className="flex flex-col gap-5.5">
          <div className="hidden flex-col gap-1 px-2.5 @2xl/appwindow:flex">
            <span className="font-serif text-[28px] leading-7.5 text-moon-bright italic">
              Controls
            </span>
            <span className="flex items-center gap-1.5 truncate text-xs leading-4 text-haze-dim">
              <span className="size-1.5 shrink-0 rounded-full bg-mint" />
              <span className="truncate">
                Signed in{me?.email ? ` as ${me.email}` : ""}
              </span>
            </span>
          </div>

          <ul className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = item.panel === panel
              return (
                <li key={item.panel}>
                  <button
                    type="button"
                    title={item.label}
                    aria-current={active ? "page" : undefined}
                    onClick={() => onNavigate(item.panel)}
                    className={cn(
                      "relative flex h-10 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] px-2.5 outline-none @2xl/appwindow:justify-start",
                      "transition-colors duration-150 ease-out-strong focus-visible:bg-white/8",
                      !active && "hover:bg-white/5",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="controls-nav-active"
                        className="absolute inset-0 rounded-[10px] bg-holo/14"
                        transition={{ duration: 0.25, ease: EASE_IN_OUT }}
                      />
                    )}
                    <span className="relative flex size-5.5 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "relative hidden flex-1 truncate text-left text-sm leading-4.5 font-medium @2xl/appwindow:block",
                        active ? "text-moon-bright" : "text-lilac",
                      )}
                    >
                      {item.label}
                    </span>
                    {badges[item.panel] && (
                      <span className="relative hidden @2xl/appwindow:flex">
                        {badges[item.panel]}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <button
          type="button"
          title="Sign out"
          onClick={handleLogout}
          disabled={logoutUser.isPending}
          className="flex h-10 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border-t border-white/6 px-2.5 text-[#ffb3c2] transition-colors duration-150 ease-out-strong hover:bg-melon/10 disabled:opacity-60 @2xl/appwindow:justify-start"
        >
          <SignOutIcon className="size-4.25 shrink-0 text-[#ff8fa6]" />
          <span className="hidden text-sm font-medium @2xl/appwindow:block">
            Sign out
          </span>
        </button>
      </nav>

      <div className="relative min-w-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={panel}
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: EASE_OUT } }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
