import { protectedProcedure } from "@/lib/trpc"
import { getRankLabel } from "../rank-labels"

const getValorantAllPlayers = protectedProcedure.query(async ({ ctx }) => {
  const players = await ctx.prisma.valorantPlayer.findMany({
    orderBy: { order: "asc" },
    include: {
      mainAgent: { select: { id: true, slug: true, name: true } },
    },
  })

  return players.map((player) => ({
    id: player.id,
    discordId: player.discordId,
    displayName: player.displayName,
    username: player.username,
    hasAvatar: player.avatarWebp !== null,
    hasBanner: player.bannerWebp !== null,
    rank: player.rank,
    rankLabel: getRankLabel(player.rank),
    skillLevel: player.skillLevel,
    mainAgent: player.mainAgent,
    isActive: player.isActive,
    order: player.order,
    createdAt: player.createdAt.toISOString(),
  }))
})

export default getValorantAllPlayers
