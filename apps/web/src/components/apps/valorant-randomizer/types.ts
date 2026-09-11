export type PeakRank = {
  label: string
  skillLevel: number
}

export type ValorantAgent = {
  id: string
  slug: string
  name: string
  /** Average color sampled from the agent's art, e.g. "#a12b3c"; used as a background accent. */
  color?: string | null
}

export type ValorantPlayer = {
  id: string
  name: string
  image: string
  /** Discord banner, if the player has one; used as a per-row background accent. */
  banner?: string
  peakRank: PeakRank
  /** Overall player skill (0–1), used for team balance. */
  skillLevel: number
  /** No role system — skill + pairing constraints only. */
  mainAgent?: ValorantAgent | null
}

export type AssignedPlayer = {
  player: ValorantPlayer
  effectiveSkill: number
}

export type BalancedTeam = {
  players: AssignedPlayer[]
  totalSkill: number
}

export type TeamSplitResult = {
  teamA: BalancedTeam
  teamB: BalancedTeam
  skillDifference: number
  balanceScore: number
}
