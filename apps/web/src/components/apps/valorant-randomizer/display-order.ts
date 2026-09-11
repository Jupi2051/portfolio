import type { AssignedPlayer, TeamSplitResult } from "./types"

export function sortPlayersForDisplay(players: AssignedPlayer[]) {
  return players.slice().sort((left, right) => right.effectiveSkill - left.effectiveSkill)
}

export function getRosterRows(result: TeamSplitResult): AssignedPlayer[] {
  return [
    ...sortPlayersForDisplay(result.teamA.players),
    ...sortPlayersForDisplay(result.teamB.players),
  ]
}
