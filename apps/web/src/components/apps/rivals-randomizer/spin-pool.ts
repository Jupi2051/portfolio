import type { AssignedPlayer, RivalsPlayer } from "./types"
import { getRosterRows } from "./display-order"
import type { TeamSplitResult } from "./types"

export type TeamSide = "A" | "B"

export type SlotKey = `${TeamSide}:${number}`

export function slotKey(team: TeamSide, index: number): SlotKey {
  return `${team}:${index}`
}

export function getRevealedPlayerIds(
  teamAEntries: AssignedPlayer[],
  teamBEntries: AssignedPlayer[],
  completedSlots: ReadonlySet<SlotKey>,
): Set<string> {
  const revealedIds = new Set<string>()

  for (const key of completedSlots) {
    const [team, indexValue] = key.split(":") as [TeamSide, string]
    const index = Number(indexValue)
    const entry = team === "A" ? teamAEntries[index] : teamBEntries[index]

    if (entry) revealedIds.add(entry.player.id)
  }

  return revealedIds
}

export function getSpinPool(
  allPlayers: RivalsPlayer[],
  teamAEntries: AssignedPlayer[],
  teamBEntries: AssignedPlayer[],
  completedSlots: ReadonlySet<SlotKey>,
): RivalsPlayer[] {
  const revealedIds = getRevealedPlayerIds(
    teamAEntries,
    teamBEntries,
    completedSlots,
  )

  return allPlayers.filter((player) => !revealedIds.has(player.id))
}

export function getEntriesForTeam(
  result: TeamSplitResult,
  team: TeamSide,
): AssignedPlayer[] {
  const rows = getRosterRows(result)
  return team === "A" ? rows.slice(0, 6) : rows.slice(6, 12)
}
