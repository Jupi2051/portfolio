import { useDraggable } from "@dnd-kit/core"
import { rivalsPlayerAvatarUrl } from "./image-urls"

type Props = {
  id: string
  name: string
}

export default function PlayerChip({ id, name }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.4 : 1,
      }}
      className="flex cursor-grab items-center gap-2 rounded-lg border border-ctp-surface1 bg-ctp-base px-2 py-1.5 text-xs text-ctp-text shadow-sm select-none active:cursor-grabbing"
    >
      <img
        src={rivalsPlayerAvatarUrl(id)}
        alt=""
        className="h-6 w-6 shrink-0 rounded-md object-cover"
        draggable={false}
      />
      <span className="truncate">{name}</span>
    </div>
  )
}
