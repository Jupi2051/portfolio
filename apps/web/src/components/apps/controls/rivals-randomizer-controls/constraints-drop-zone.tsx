import type { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"

type Props = {
  id: string
  title: string
  subtitle: string
  accentClass: string
  children: ReactNode
}

export default function ConstraintsDropZone({ id, title, subtitle, accentClass, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-40 flex-col gap-2 rounded-xl border-2 p-3 transition ${accentClass} ${
        isOver ? "bg-ctp-surface0" : "bg-ctp-mantle"
      }`}
    >
      <div>
        <p className="font-jockey-one text-sm tracking-wide text-ctp-text">{title}</p>
        <p className="text-[0.65rem] text-ctp-subtext0">{subtitle}</p>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">{children}</div>
    </div>
  )
}
