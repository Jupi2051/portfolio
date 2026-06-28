import type {
  AssignedPlayer,
  BalancedTeam,
  Role,
  RivalsPlayer,
  TeamSplitResult,
} from "./types"
import { violatesSplitConstraints } from "./constraints"

const TEAM_SIZE = 6
const ATTEMPTS = 1200
const TOP_CANDIDATE_POOL = 24
const HEALER_ROLE = 0 satisfies Role

export function getEffectiveSkill(player: RivalsPlayer): number {
  return player.skillLevel
}

function getRolePreferenceIndex(player: RivalsPlayer, role: Role): number {
  const index = player.roleSkills.findIndex((roleSkill) => roleSkill.role === role)
  return index === -1 ? player.roleSkills.length : index
}

function combinations<T>(items: T[], size: number): T[][] {
  if (size === 0) return [[]]
  if (size > items.length) return []

  const [first, ...rest] = items
  const withFirst = combinations(rest, size - 1).map((group) => [first, ...group])
  const withoutFirst = combinations(rest, size)

  return [...withFirst, ...withoutFirst]
}

function buildAssignedTeam(
  players: RivalsPlayer[],
  roleAssignments: Map<string, Role>,
): BalancedTeam {
  const assignedPlayers: AssignedPlayer[] = players.map((player) => {
    const assignedRole = roleAssignments.get(player.id)!
    const rolePreferenceIndex = getRolePreferenceIndex(player, assignedRole)

    return {
      player,
      assignedRole,
      rolePreferenceIndex,
      effectiveSkill: getEffectiveSkill(player),
    }
  })

  return {
    players: assignedPlayers,
    totalSkill: assignedPlayers.reduce(
      (sum, entry) => sum + entry.effectiveSkill,
      0,
    ),
    rolePreferencePenalty: assignedPlayers.reduce(
      (sum, entry) => sum + entry.rolePreferenceIndex,
      0,
    ),
  }
}

function getHealerComfort(player: RivalsPlayer): number {
  return player.roleSkills.find((roleSkill) => roleSkill.role === HEALER_ROLE)?.weight ?? 0
}

function assignRoles(team: RivalsPlayer[]): BalancedTeam {
  let bestTeam: BalancedTeam | null = null

  for (const healers of combinations(team, 2)) {
    const healerIds = new Set(healers.map((player) => player.id))
    const remainingAfterHealers = team.filter((player) => !healerIds.has(player.id))

    for (const tanks of combinations(remainingAfterHealers, 2)) {
      const tankIds = new Set(tanks.map((player) => player.id))
      const dps = remainingAfterHealers.filter((player) => !tankIds.has(player.id))

      const assignments = new Map<string, Role>()
      for (const player of healers) assignments.set(player.id, HEALER_ROLE)
      for (const player of tanks) assignments.set(player.id, 1)
      for (const player of dps) assignments.set(player.id, 2)

      const candidate = buildAssignedTeam(team, assignments)
      const healerComfort = healers.reduce(
        (sum, player) => sum + getHealerComfort(player),
        0,
      )

      if (bestTeam === null) {
        bestTeam = candidate
        continue
      }

      const bestHealers = bestTeam.players
        .filter((entry) => entry.assignedRole === HEALER_ROLE)
        .map((entry) => entry.player)
      const bestHealerComfort = bestHealers.reduce(
        (sum, player) => sum + getHealerComfort(player),
        0,
      )

      if (candidate.rolePreferencePenalty < bestTeam.rolePreferencePenalty) {
        bestTeam = candidate
        continue
      }

      if (
        candidate.rolePreferencePenalty === bestTeam.rolePreferencePenalty &&
        healerComfort > bestHealerComfort
      ) {
        bestTeam = candidate
      }
    }
  }

  return bestTeam!
}

function evaluateSplit(
  teamA: RivalsPlayer[],
  teamB: RivalsPlayer[],
): TeamSplitResult | null {
  if (teamA.length !== TEAM_SIZE || teamB.length !== TEAM_SIZE) return null

  const teamAIds = new Set(teamA.map((player) => player.id))
  const teamBIds = new Set(teamB.map((player) => player.id))

  if (violatesSplitConstraints(teamAIds, teamBIds)) return null

  const balancedA = assignRoles(teamA)
  const balancedB = assignRoles(teamB)
  const skillDifference = Math.abs(balancedA.totalSkill - balancedB.totalSkill)

  return {
    teamA: balancedA,
    teamB: balancedB,
    skillDifference,
    balanceScore: skillDifference,
  }
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

export function generateBalancedTeams(players: RivalsPlayer[]): TeamSplitResult {
  const candidates: TeamSplitResult[] = []

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const shuffled = shuffle(players)
    const split = evaluateSplit(
      shuffled.slice(0, TEAM_SIZE),
      shuffled.slice(TEAM_SIZE),
    )

    if (split) candidates.push(split)
  }

  if (candidates.length === 0) {
    throw new Error("Could not generate a balanced team split.")
  }

  candidates.sort((left, right) => left.balanceScore - right.balanceScore)

  const bestScore = candidates[0].balanceScore
  const eliteCandidates = candidates.filter(
    (candidate) => candidate.balanceScore <= bestScore + 0.05,
  )
  const pool = eliteCandidates.slice(0, TOP_CANDIDATE_POOL)

  return pool[Math.floor(Math.random() * pool.length)] ?? candidates[0]
}
