import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"

export type RivalsConstraints = {
  /** Pairs that must land on the same team. */
  mustPair: [string, string][]
  /** Pairs that must land on opposite teams. */
  mustSplit: [string, string][]
}

export const EMPTY_CONSTRAINTS: RivalsConstraints = { mustPair: [], mustSplit: [] }

/** Fetches must-pair / must-split constraints between the currently active players. */
export function useRivalsConstraints() {
  const trpc = useTRPC()
  return useQuery(trpc.rivalsRandomizer.constraints.listActive.queryOptions())
}

export function violatesSplitConstraints(
  teamAIds: ReadonlySet<string>,
  teamBIds: ReadonlySet<string>,
  mustSplit: [string, string][],
): boolean {
  for (const [playerA, playerB] of mustSplit) {
    const aOnA = teamAIds.has(playerA)
    const bOnA = teamAIds.has(playerB)
    const aOnB = teamBIds.has(playerA)
    const bOnB = teamBIds.has(playerB)

    if ((aOnA && bOnA) || (aOnB && bOnB)) {
      return true
    }
  }

  return false
}

export function violatesPairConstraints(
  teamAIds: ReadonlySet<string>,
  teamBIds: ReadonlySet<string>,
  mustPair: [string, string][],
): boolean {
  for (const [playerA, playerB] of mustPair) {
    const bothOnA = teamAIds.has(playerA) && teamAIds.has(playerB)
    const bothOnB = teamBIds.has(playerA) && teamBIds.has(playerB)

    if (!bothOnA && !bothOnB) {
      return true
    }
  }

  return false
}
