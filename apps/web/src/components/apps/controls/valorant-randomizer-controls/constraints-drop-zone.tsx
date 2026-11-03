import type { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"
import cn from "classnames"

type Props = {
  id: string
  title: string
  /** Right side of the header — a count like "12 / 12". */
  subtitle: string
  /** Optional accent for the count / outline ("pool" lists get periwinkle). */
  accentClass: string
  children: ReactNode
}

/** Card that's also a dnd-kit drop target; lights up periwinkle while a player hovers it. */
export default function ConstraintsDropZone({
  id,
  title,
  subtitle,
  accentClass,
  children,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-40 min-w-0 flex-col overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-150 ease-out-strong",
        isOver
          ? "border-holo-soft/60 bg-holo/8 shadow-[0_0_0_4px_rgba(140,142,255,0.12)]"
          : "border-white/8 bg-white/3",
      )}
    >
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/6 px-4">
        <span className="text-xs leading-4 font-semibold tracking-[0.14em] text-haze uppercase">
          {title}
        </span>
        <span className={cn("text-xs leading-4 font-semibold", accentClass)}>
          {subtitle}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-1.5">{children}</div>
    </div>
  )
}
