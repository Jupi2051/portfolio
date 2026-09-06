import { getRankIconUrl } from "./rank-icons"
import type { RivalsPlayer } from "./types"

type TeamPlayerRowProps = {
  player: RivalsPlayer
}

function TeamPlayerRow({ player }: TeamPlayerRowProps) {
  const rankIcon = getRankIconUrl(player.peakRank.label)

  return (
    <div className="flex items-center gap-3 rounded-lg bg-ctp-surface0/50 px-3 py-2">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-ctp-surface1">
        <img
          src={player.image}
          alt={player.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ctp-text">{player.name}</p>
      </div>
      <div className="relative h-8 w-8 shrink-0 overflow-hidden">
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
