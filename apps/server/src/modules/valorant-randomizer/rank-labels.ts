import type { ValorantRank } from "../../../prisma/generated/client/enums"

/**
 * Ordered lowest to highest; index doubles as a display-only "peak skill" number.
 * Unlike Rivals' Marvel-Rivals-style tiers (which count DOWN as you rank up,
 * e.g. Bronze 3 -> Bronze 2 -> Bronze 1), real Valorant tiers count UP within
 * a tier (Iron 1 -> Iron 2 -> Iron 3) before promoting to the next tier.
 */
export const VALORANT_RANK_ORDER = [
  "IRON_1",
  "IRON_2",
  "IRON_3",
  "BRONZE_1",
  "BRONZE_2",
  "BRONZE_3",
  "SILVER_1",
  "SILVER_2",
  "SILVER_3",
  "GOLD_1",
  "GOLD_2",
  "GOLD_3",
  "PLATINUM_1",
  "PLATINUM_2",
  "PLATINUM_3",
  "DIAMOND_1",
  "DIAMOND_2",
  "DIAMOND_3",
  "ASCENDANT_1",
  "ASCENDANT_2",
  "ASCENDANT_3",
  "IMMORTAL_1",
  "IMMORTAL_2",
  "IMMORTAL_3",
  "RADIANT",
] as const satisfies readonly ValorantRank[]

export const LOWEST_VALORANT_RANK: ValorantRank = VALORANT_RANK_ORDER[0]

const RANK_LABELS: Record<ValorantRank, string> = {
  IRON_1: "Iron 1",
  IRON_2: "Iron 2",
  IRON_3: "Iron 3",
  BRONZE_1: "Bronze 1",
  BRONZE_2: "Bronze 2",
  BRONZE_3: "Bronze 3",
  SILVER_1: "Silver 1",
  SILVER_2: "Silver 2",
  SILVER_3: "Silver 3",
  GOLD_1: "Gold 1",
  GOLD_2: "Gold 2",
  GOLD_3: "Gold 3",
  PLATINUM_1: "Platinum 1",
  PLATINUM_2: "Platinum 2",
  PLATINUM_3: "Platinum 3",
  DIAMOND_1: "Diamond 1",
  DIAMOND_2: "Diamond 2",
  DIAMOND_3: "Diamond 3",
  ASCENDANT_1: "Ascendant 1",
  ASCENDANT_2: "Ascendant 2",
  ASCENDANT_3: "Ascendant 3",
  IMMORTAL_1: "Immortal 1",
  IMMORTAL_2: "Immortal 2",
  IMMORTAL_3: "Immortal 3",
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
