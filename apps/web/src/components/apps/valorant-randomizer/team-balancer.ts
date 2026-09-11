import type { AssignedPlayer, BalancedTeam, ValorantPlayer, TeamSplitResult } from "./types"
import type { ValorantConstraints } from "./constraints"
import { violatesPairConstraints, violatesSplitConstraints } from "./constraints"
import type { ValorantBalancingSettings } from "./settings"

const TEAM_SIZE = 5
const ATTEMPTS = 1200
const TOP_CANDIDATE_POOL = 24

export function getEffectiveSkill(player: ValorantPlayer): number {
  return player.skillLevel
}

function buildAssignedTeam(players: ValorantPlayer[]): BalancedTeam {
  const assignedPlayers: AssignedPlayer[] = players.map((player) => ({
    player,
    effectiveSkill: getEffectiveSkill(player),
  }))

  return {
    players: assignedPlayers,
    totalSkill: assignedPlayers.reduce((sum, entry) => sum + entry.effectiveSkill, 0),
  }
}

function evaluateSplit(
  teamA: ValorantPlayer[],
  teamB: ValorantPlayer[],
  constraints: ValorantConstraints,
  settings: ValorantBalancingSettings,
): TeamSplitResult | null {
  if (teamA.length !== TEAM_SIZE || teamB.length !== TEAM_SIZE) return null

  if (settings.useConstraints) {
    const teamAIds = new Set(teamA.map((player) => player.id))
    const teamBIds = new Set(teamB.map((player) => player.id))

    if (violatesSplitConstraints(teamAIds, teamBIds, constraints.mustSplit)) return null
    if (violatesPairConstraints(teamAIds, teamBIds, constraints.mustPair)) return null
  }

  const balancedA = buildAssignedTeam(teamA)
  const balancedB = buildAssignedTeam(teamB)
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

export function generateBalancedTeams(
  players: ValorantPlayer[],
  constraints: ValorantConstraints,
  settings: ValorantBalancingSettings,
): TeamSplitResult {
  const requiredPlayers = TEAM_SIZE * 2
  if (players.length !== requiredPlayers) {
    throw new Error(
      `Expected ${requiredPlayers} players for ${TEAM_SIZE}v${TEAM_SIZE}, got ${players.length}.`,
    )
  }

  const candidates: TeamSplitResult[] = []

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const shuffled = shuffle(players)
    const split = evaluateSplit(
      shuffled.slice(0, TEAM_SIZE),
      shuffled.slice(TEAM_SIZE),
      constraints,
      settings,
    )

    if (split) candidates.push(split)
  }

  if (candidates.length === 0) {
    throw new Error("Could not generate a balanced team split.")
  }

  if (!settings.useSkillLevel) {
    return candidates[Math.floor(Math.random() * candidates.length)]!
  }

  candidates.sort((left, right) => left.balanceScore - right.balanceScore)

  const bestScore = candidates[0].balanceScore
  const eliteCandidates = candidates.filter(
    (candidate) => candidate.balanceScore <= bestScore + 0.05,
  )
  const pool = eliteCandidates.slice(0, TOP_CANDIDATE_POOL)

  return pool[Math.floor(Math.random() * pool.length)] ?? candidates[0]
}
