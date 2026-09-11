import { publicProcedure } from "@/lib/trpc"
import { getRankLabel, getRankPeakSkillLevel } from "../rank-labels"

const getValorantActivePlayers = publicProcedure.query(async ({ ctx }) => {
  const players = await ctx.prisma.valorantPlayer.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    include: {
      mainAgent: { select: { id: true, slug: true, name: true, color: true } },
    },
  })

  return players.map((player) => ({
    id: player.id,
    name: player.displayName,
    peakRank: {
      label: getRankLabel(player.rank),
      skillLevel: getRankPeakSkillLevel(player.rank),
    },
    skillLevel: player.skillLevel,
    mainAgent: player.mainAgent,
  }))
})

export default getValorantActivePlayers
