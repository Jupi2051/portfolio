import type { ReactNode } from "react"

type Props = {
  title: ReactNode
  /** Sits next to the title — tabs, status chips. */
  aside?: ReactNode
  /** Right-aligned buttons. */
  actions?: ReactNode
}

/** The 60px bar every Controls panel starts with. */
export default function ControlsPanelHeader({ title, aside, actions }: Props) {
  return (
    <div className="flex min-h-15 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/6 py-2.5 pr-5 pl-6 @2xl/appwindow:pl-8">
      <div className="flex min-w-0 items-center gap-4">
        <h2 className="truncate text-[15px] leading-4.5 font-semibold text-moon">
          {title}
        </h2>
        {aside}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

type Tab<T extends string> = { value: T; label: ReactNode; badge?: ReactNode }

/** Segmented control used for panel tabs (Players / Constraints, Waiting / In gallery). */
export function ControlsTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: Tab<T>[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div
      role="tablist"
      className="flex items-center rounded-[10px] border border-white/8 bg-white/5 p-0.75"
    >
      {tabs.map((tab) => {
        const active = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={
              "flex h-7 cursor-pointer items-center gap-1.75 rounded-[7px] px-3 text-[13px] font-medium transition-colors duration-150 ease-out-strong " +
              (active ? "bg-white/10 text-moon-bright" : "text-haze hover:text-moon")
            }
          >
            {tab.label}
            {tab.badge}
          </button>
        )
      })}
    </div>
  )
}

/** Outline button for secondary panel actions. */
export const secondaryButtonClassName =
  "flex h-8.5 cursor-pointer items-center gap-1.75 rounded-[9px] border border-white/10 px-3 text-[13px] font-medium text-lilac transition-[background-color,scale] duration-150 ease-out-strong hover:bg-white/6 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"

/** Filled periwinkle button for the main action. */
export const primaryButtonClassName =
  "flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-holo px-3.5 text-[13px] font-semibold text-ink-deep transition-[background-color,scale] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
