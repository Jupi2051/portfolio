import guangGuang from "@/assets/rivals-players/GuangGuang.png"
import { FINAL_ROW_INDEX, sortPlayersForDisplay } from "./display-order"
import type { TeamSide } from "./spin-pool"
import type {
  AssignedPlayer,
  BalancedTeam,
  Role,
  RivalsPlayer,
  TeamSplitResult,
} from "./types"

export const GUANG_GUANG_PLAYER: RivalsPlayer = {
  id: "guang-guang",
  name: "Guang Guang",
  image: guangGuang,
  peakRank: { label: "One Above All", skillLevel: 10 },
  skillLevel: 0.1,
  roleSkills: [
    { weight: 0.1, role: 2 },
    { weight: 0.1, role: 1 },
    { weight: 0.1, role: 0 },
  ],
}

function getRolePreferenceIndex(player: RivalsPlayer, role: Role): number {
  const index = player.roleSkills.findIndex((roleSkill) => roleSkill.role === role)
  return index === -1 ? player.roleSkills.length : index
}

function replaceFinalRowWithGuangGuang(team: BalancedTeam): BalancedTeam {
  const finalRowEntry = sortPlayersForDisplay(team.players)[FINAL_ROW_INDEX]
  const assignedRole = finalRowEntry.assignedRole

  const guangGuangEntry: AssignedPlayer = {
    player: GUANG_GUANG_PLAYER,
    assignedRole,
    rolePreferenceIndex: getRolePreferenceIndex(GUANG_GUANG_PLAYER, assignedRole),
    effectiveSkill: GUANG_GUANG_PLAYER.skillLevel,
  }

  const players = team.players.map((entry) =>
    entry.player.id === finalRowEntry.player.id ? guangGuangEntry : entry,
  )

  return {
    players,
    totalSkill: players.reduce((sum, entry) => sum + entry.effectiveSkill, 0),
    rolePreferencePenalty: players.reduce(
      (sum, entry) => sum + entry.rolePreferenceIndex,
      0,
    ),
  }
}

export function injectGuangGuangEasterEgg(result: TeamSplitResult): TeamSplitResult {
  const guangGuangTeam: TeamSide = Math.random() < 0.5 ? "A" : "B"
  const teamA =
    guangGuangTeam === "A"
      ? replaceFinalRowWithGuangGuang(result.teamA)
      : result.teamA
  const teamB =
    guangGuangTeam === "B"
      ? replaceFinalRowWithGuangGuang(result.teamB)
      : result.teamB

  return {
    teamA,
    teamB,
    skillDifference: Math.abs(teamA.totalSkill - teamB.totalSkill),
    balanceScore: Math.abs(teamA.totalSkill - teamB.totalSkill),
  }
}
