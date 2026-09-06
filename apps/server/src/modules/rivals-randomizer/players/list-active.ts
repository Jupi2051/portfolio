import { publicProcedure } from "@/lib/trpc"
import { getRankLabel, getRankPeakSkillLevel } from "../rank-labels"
import type { RoleSkillEntry } from "../validators"

const getRivalsActivePlayers = publicProcedure.query(async ({ ctx }) => {
  const players = await ctx.prisma.rivalsPlayer.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: { mainHero: { select: { id: true, slug: true, name: true } } },
  })

  return players.map((player) => ({
    id: player.id,
    name: player.displayName,
    peakRank: {
      label: getRankLabel(player.rank),
      skillLevel: getRankPeakSkillLevel(player.rank),
    },
    skillLevel: player.skillLevel,
    roleSkills: player.roleSkills as unknown as RoleSkillEntry[],
    mainHero: player.mainHero,
  }))
})

export default getRivalsActivePlayers
