import { protectedProcedure } from "@/lib/trpc"
import { refreshPlayerFromDiscord } from "./refresh-one"

/** Re-pulls Discord profile data (avatar, banner, name) for every player, one at a time. */
const refreshAllValorantPlayers = protectedProcedure.mutation(async ({ ctx }) => {
  const players = await ctx.prisma.valorantPlayer.findMany({
    select: { id: true, discordId: true, displayName: true },
    orderBy: { order: "asc" },
  })

  console.log(`[valorant players] refreshing all ${players.length} player(s)...`)

  let updated = 0
  const failed: string[] = []

  for (const player of players) {
    try {
      console.log(
        `[valorant players] refreshing ${player.displayName} (discordId=${player.discordId})...`,
      )
      const result = await refreshPlayerFromDiscord(player)
      console.log(`[valorant players] refreshed ${result.displayName} (id=${result.id})`)
      updated++
    } catch (error) {
      console.error(`[valorant players] failed to refresh ${player.displayName}:`, error)
      failed.push(player.displayName)
    }
  }

  console.log(
    `[valorant players] refresh all complete: ${updated} updated, ${failed.length} failed${
      failed.length ? ` (${failed.join(", ")})` : ""
    }`,
  )

  return { total: players.length, updated, failed }
})

export default refreshAllValorantPlayers
