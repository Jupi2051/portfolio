import {
  DENOMINATIONS,
  emptyCounts,
  type DenomCounts,
  type DenominationId,
} from "./catalog"

export type AtmSplitResult = {
  counts: DenomCounts
  remainder: number
  dispensed: number
}

/** Greedy ATM payout: largest enabled denomination first. */
export function splitLikeAtm(
  amount: number,
  enabledIds: ReadonlySet<DenominationId>,
): AtmSplitResult {
  const counts = emptyCounts()
  let remaining = Math.max(0, Math.floor(amount))
  const target = remaining

  const ordered = DENOMINATIONS.filter((denom) => enabledIds.has(denom.id)).sort(
    (a, b) => b.value - a.value,
  )

  for (const denom of ordered) {
    const n = Math.floor(remaining / denom.value)
    counts[denom.id] = n
    remaining -= n * denom.value
  }

  return {
    counts,
    remainder: remaining,
    dispensed: target - remaining,
  }
}
