/** Pairs that must land on opposite teams. */
export const MUST_SPLIT_PAIRS: [string, string][] = []

export function violatesSplitConstraints(
  teamAIds: ReadonlySet<string>,
  teamBIds: ReadonlySet<string>,
): boolean {
  for (const [playerA, playerB] of MUST_SPLIT_PAIRS) {
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
