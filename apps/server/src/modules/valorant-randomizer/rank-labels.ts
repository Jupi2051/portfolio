import type { ValorantRank } from "../../../prisma/generated/client/enums"

/** Ordered lowest to highest; index doubles as a display-only "peak skill" number. */
export const VALORANT_RANK_ORDER = [
  "IRON_3",
  "IRON_2",
  "IRON_1",
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
  "ASCENDANT_3",
  "ASCENDANT_2",
  "ASCENDANT_1",
  "IMMORTAL_3",
  "IMMORTAL_2",
  "IMMORTAL_1",
  "RADIANT",
] as const satisfies readonly ValorantRank[]

export const LOWEST_VALORANT_RANK: ValorantRank = VALORANT_RANK_ORDER[0]

const RANK_LABELS: Record<ValorantRank, string> = {
  IRON_3: "Iron 3",
  IRON_2: "Iron 2",
  IRON_1: "Iron 1",
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
  ASCENDANT_3: "Ascendant 3",
  ASCENDANT_2: "Ascendant 2",
  ASCENDANT_1: "Ascendant 1",
  IMMORTAL_3: "Immortal 3",
  IMMORTAL_2: "Immortal 2",
  IMMORTAL_1: "Immortal 1",
  RADIANT: "Radiant",
}

export function getRankLabel(rank: ValorantRank): string {
  return RANK_LABELS[rank]
}

export function getRankPeakSkillLevel(rank: ValorantRank): number {
  return VALORANT_RANK_ORDER.indexOf(rank)
}

export function listRanks(): { value: ValorantRank; label: string }[] {
  return VALORANT_RANK_ORDER.map((value) => ({ value, label: RANK_LABELS[value] }))
}
