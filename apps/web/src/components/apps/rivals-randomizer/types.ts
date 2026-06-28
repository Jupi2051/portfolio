export const ROLE_CATALOG = {
  0: "Healer",
  1: "Tank",
  2: "Dps",
} as const

export type Role = keyof typeof ROLE_CATALOG

export type PeakRank = {
  label: string
  skillLevel: number
}

export type RoleSkill = {
  weight: number
  role: Role
}

export type RivalsPlayer = {
  id: string
  name: string
  image: string
  peakRank: PeakRank
  /** Overall player skill (0–1), used for team balance. */
  skillLevel: number
  /** Best role first; weight is comfort on that role (display / assignment only). */
  roleSkills: [RoleSkill, RoleSkill, RoleSkill]
}

export type AssignedPlayer = {
  player: RivalsPlayer
  assignedRole: Role
  rolePreferenceIndex: number
  effectiveSkill: number
}

export type BalancedTeam = {
  players: AssignedPlayer[]
  totalSkill: number
  rolePreferencePenalty: number
}

export type TeamSplitResult = {
  teamA: BalancedTeam
  teamB: BalancedTeam
  skillDifference: number
  balanceScore: number
}

export function getRoleSkill(player: RivalsPlayer, role: Role): number {
  const entry = player.roleSkills.find((roleSkill) => roleSkill.role === role)
  return entry?.weight ?? 0
}
