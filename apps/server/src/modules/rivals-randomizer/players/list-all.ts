import { protectedProcedure } from "@/lib/trpc"
import { getRankLabel } from "../rank-labels"
import type { RoleSkillEntry } from "../validators"

const getRivalsAllPlayers = protectedProcedure.query(async ({ ctx }) => {
  const players = await ctx.prisma.rivalsPlayer.findMany({
    orderBy: { order: "asc" },
    include: { mainHero: { select: { id: true, slug: true, name: true } } },
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
    roleSkills: player.roleSkills as unknown as RoleSkillEntry[],
    mainHero: player.mainHero,
    isActive: player.isActive,
    order: player.order,
    createdAt: player.createdAt.toISOString(),
  }))
})

export default getRivalsAllPlayers
