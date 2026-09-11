import { useDraggable } from "@dnd-kit/core"
import { getRankIconUrl } from "@/components/apps/valorant-randomizer/rank-icons"
import { valorantPlayerAvatarUrl } from "./image-urls"
import type { ValorantPlayerRow } from "./types"

type Props = {
  player: ValorantPlayerRow
  expanded: boolean
  onToggleExpand: () => void
  onToggleActive: (isActive: boolean) => void
  canActivate: boolean
  disabled?: boolean
}

/** Compact draggable row: drag (via the handle) or the checkbox both flip `isActive` the same way. */
export default function PlayerRosterRow({
  player,
  expanded,
  onToggleExpand,
  onToggleActive,
  canActivate,
  disabled,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: player.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.4 : 1,
      }}
      className="rounded-lg border border-ctp-surface1 bg-ctp-base"
    >
      <div className="flex items-center gap-1.5 p-1.5">
        <button
          type="button"
          {...listeners}
          {...attributes}
          className="shrink-0 cursor-grab touch-none px-1 text-ctp-subtext0 active:cursor-grabbing"
          aria-label="Drag to move"
        >
          ⠿
        </button>
        <img
          src={valorantPlayerAvatarUrl(player.id)}
          alt=""
          className="h-8 w-8 shrink-0 rounded-md object-cover"
          draggable={false}
        />
        <button
          type="button"
          onClick={onToggleExpand}
          className="min-w-0 flex-1 cursor-pointer text-left"
        >
          <p className="truncate text-xs font-medium text-ctp-text">{player.displayName}</p>
          <p className="truncate text-[0.65rem] text-ctp-subtext0">{player.rankLabel}</p>
        </button>
        <img
          src={getRankIconUrl(player.rankLabel)}
          alt=""
          className="h-5 w-5 shrink-0 object-contain"
        />
        <input
          type="checkbox"
          title="In pool"
          checked={player.isActive}
          disabled={disabled || (!player.isActive && !canActivate)}
          onChange={(event) => onToggleActive(event.target.checked)}
        />
        <button
          type="button"
          onClick={onToggleExpand}
          className="shrink-0 cursor-pointer px-1 text-ctp-subtext0"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? "▴" : "▾"}
        </button>
      </div>
    </div>
  )
}
