import { getRankIconUrl } from "./rank-icons"
import type { RivalsPlayer } from "./types"

/** Shared with team-roster.tsx so the per-row stagger offset can keep this edge continuous across the gap. */
export const ROW_HEIGHT_PX = 76
export const ROW_SKEW_PX = 18

type TeamPlayerRowProps = {
  player: RivalsPlayer
}

function TeamPlayerRow({ player }: TeamPlayerRowProps) {
  const rankIcon = getRankIconUrl(player.peakRank.label)

  return (
    <div
      className="flex items-center gap-4 bg-ctp-surface0/60 pr-6"
      style={{
        height: ROW_HEIGHT_PX,
        paddingLeft: ROW_SKEW_PX + 20,
        clipPath: `polygon(${ROW_SKEW_PX}px 0, 100% 0, calc(100% - ${ROW_SKEW_PX}px) 100%, 0 100%)`,
      }}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-ctp-surface1">
        <img
          src={player.image}
          alt={player.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-jockey-one text-xl tracking-wide text-ctp-text">
          {player.name}
        </p>
      </div>
      <div className="relative h-11 w-11 shrink-0 overflow-hidden">
        <img
          src={rankIcon}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  )
}

export default TeamPlayerRow
