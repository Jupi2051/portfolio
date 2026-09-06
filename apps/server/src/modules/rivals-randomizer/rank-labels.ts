import type { RivalsRank } from "../../../prisma/generated/client/enums"

/** Ordered lowest to highest; index doubles as a display-only "peak skill" number. */
export const RIVALS_RANK_ORDER = [
  "BRONZE_3",
  "BRONZE_2",
  "BRONZE_1",
  "SILVER_3",
  "SILVER_2",
  "SILVER_1",
  "GOLD_3",
  "GOLD_2",
  "GOLD_1",
  "PLATINUM_3",
  "PLATINUM_2",
  "PLATINUM_1",
  "DIAMOND_3",
  "DIAMOND_2",
  "DIAMOND_1",
  "GRANDMASTER_3",
  "GRANDMASTER_2",
  "GRANDMASTER_1",
  "CELESTIAL_3",
  "CELESTIAL_2",
  "CELESTIAL_1",
  "ETERNITY",
  "ONE_ABOVE_ALL",
] as const satisfies readonly RivalsRank[]

export const LOWEST_RIVALS_RANK: RivalsRank = RIVALS_RANK_ORDER[0]

const RANK_LABELS: Record<RivalsRank, string> = {
  BRONZE_3: "Bronze 3",
  BRONZE_2: "Bronze 2",
  BRONZE_1: "Bronze 1",
  SILVER_3: "Silver 3",
  SILVER_2: "Silver 2",
  SILVER_1: "Silver 1",
  GOLD_3: "Gold 3",
  GOLD_2: "Gold 2",
  GOLD_1: "Gold 1",
  PLATINUM_3: "Platinum 3",
  PLATINUM_2: "Platinum 2",
  PLATINUM_1: "Platinum 1",
  DIAMOND_3: "Diamond 3",
  DIAMOND_2: "Diamond 2",
  DIAMOND_1: "Diamond 1",
  GRANDMASTER_3: "Grandmaster 3",
  GRANDMASTER_2: "Grandmaster 2",
  GRANDMASTER_1: "Grandmaster 1",
  CELESTIAL_3: "Celestial 3",
  CELESTIAL_2: "Celestial 2",
  CELESTIAL_1: "Celestial 1",
  ETERNITY: "Eternity",
  ONE_ABOVE_ALL: "One Above All",
}

export function getRankLabel(rank: RivalsRank): string {
  return RANK_LABELS[rank]
}

export function getRankPeakSkillLevel(rank: RivalsRank): number {
  return RIVALS_RANK_ORDER.indexOf(rank)
}

export function listRanks(): { value: RivalsRank; label: string }[] {
  return RIVALS_RANK_ORDER.map((value) => ({ value, label: RANK_LABELS[value] }))
}
