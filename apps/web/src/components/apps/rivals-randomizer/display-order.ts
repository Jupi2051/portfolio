import type { AssignedPlayer, Role, TeamSplitResult } from "./types"

/** Tank → Dps → Healer */
const ROLE_DISPLAY_ORDER: Record<Role, number> = { 1: 0, 2: 1, 0: 2 }

export function sortPlayersForDisplay(players: AssignedPlayer[]) {
  return players.slice().sort((left, right) => {
    const roleOrder =
      ROLE_DISPLAY_ORDER[left.assignedRole] -
      ROLE_DISPLAY_ORDER[right.assignedRole]

    if (roleOrder !== 0) return roleOrder

    return right.effectiveSkill - left.effectiveSkill
  })
}

export function getRosterRows(result: TeamSplitResult): AssignedPlayer[] {
  return [
    ...sortPlayersForDisplay(result.teamA.players),
    ...sortPlayersForDisplay(result.teamB.players),
  ]
}
