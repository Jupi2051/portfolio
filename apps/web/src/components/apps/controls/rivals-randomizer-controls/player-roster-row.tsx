import { useDraggable } from "@dnd-kit/core"
import cn from "classnames"
import { getRankIconUrl } from "@/components/apps/rivals-randomizer/rank-icons"
import { CheckIcon, GripIcon } from "@/components/ui/icons"
import { rivalsPlayerAvatarUrl } from "./image-urls"
import type { RivalsPlayerRow } from "./types"

type Props = {
  player: RivalsPlayerRow
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
  const checkboxDisabled = disabled || (!player.isActive && !canActivate)
  const skill = Math.max(0, Math.min(1, player.skillLevel ?? 0))

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
      className={cn(
        "flex h-13 items-center gap-2.5 rounded-[10px] pr-2.5 pl-1.5 transition-[background-color,opacity,box-shadow] duration-150 ease-out-strong",
        isDragging
          ? "z-10 bg-raised-2 opacity-90 shadow-[0_14px_30px_rgba(6,5,16,0.5)]"
          : expanded
            ? "bg-white/6"
            : "hover:bg-white/4",
      )}
    >
      <button
        type="button"
        {...listeners}
        {...attributes}
        className="flex h-8 w-4 shrink-0 cursor-grab touch-none items-center justify-center text-[#6f6c94] transition-colors hover:text-haze active:cursor-grabbing"
        aria-label="Drag to move"
      >
        <GripIcon className="h-4 w-3" />
      </button>
      <img
        src={rivalsPlayerAvatarUrl(player.id)}
        alt=""
        className="size-8 shrink-0 rounded-full border border-white/14 object-cover"
        draggable={false}
      />
      <button
        type="button"
        onClick={onToggleExpand}
        aria-expanded={expanded}
        className="flex min-w-0 flex-1 cursor-pointer flex-col gap-px text-left"
      >
        <span className="truncate text-sm leading-4.5 font-semibold text-moon">
          {player.displayName}
        </span>
        <span className="flex items-center gap-1.25 truncate text-xs leading-3.75 text-haze-dim">
          <img
            src={getRankIconUrl(player.rankLabel)}
            alt=""
            className="size-3.5 shrink-0 object-contain"
          />
          {player.rankLabel}
        </span>
      </button>
      <div
        className="hidden w-16 shrink-0 flex-col gap-1 @xl/appwindow:flex"
        title={`Skill ${skill.toFixed(2)}`}
      >
        <div className="h-1 w-16 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-holo"
            style={{ width: `${skill * 100}%` }}
          />
        </div>
        <span className="text-right font-mono text-[11px] leading-3.25 text-haze-dim tabular-nums">
          {skill.toFixed(2)}
        </span>
      </div>
      <label
        className={cn(
          "flex size-4.5 shrink-0 items-center justify-center rounded-[5px] transition-colors duration-150 ease-out-strong",
          player.isActive ? "bg-holo" : "border-[1.5px] border-white/22",
          checkboxDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-holo-soft",
        )}
        title={player.isActive ? "In pool" : canActivate ? "Add to pool" : "Pool is full"}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={player.isActive}
          disabled={checkboxDisabled}
          onChange={(event) => onToggleActive(event.target.checked)}
        />
        {player.isActive && <CheckIcon className="size-2.75 text-ink-deep" />}
      </label>
    </div>
  )
}
