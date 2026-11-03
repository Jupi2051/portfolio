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
      className="flex cursor-grab items-center gap-2 rounded-[10px] border border-white/10 bg-raised px-2 py-1.5 text-xs font-medium text-moon shadow-[0_4px_10px_rgba(6,5,16,0.3)] select-none active:cursor-grabbing"
    >
      <img
        src={rivalsPlayerAvatarUrl(id)}
        alt=""
        className="size-6 shrink-0 rounded-full object-cover"
        draggable={false}
      />
      <span className="truncate">{name}</span>
    </div>
  )
}
