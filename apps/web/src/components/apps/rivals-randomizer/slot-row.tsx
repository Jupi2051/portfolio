import type { AssignedPlayer, RivalsPlayer } from "./types"
import { useSlotSpin } from "./use-slot-spin"
import TeamPlayerRow from "./team-player-row"

type SlotRowProps = {
  entry: AssignedPlayer
  pool: RivalsPlayer[]
  onComplete: () => void
}

function SlotRow({ entry, pool, onComplete }: SlotRowProps) {
  const { currentPlayer, completed } = useSlotSpin({
    active: true,
    finalPlayer: entry.player,
    pool,
    onComplete,
  })

  return (
    <TeamPlayerRow
      player={completed ? entry.player : currentPlayer}
      isSpinning={!completed}
    />
  )
}

export default SlotRow
