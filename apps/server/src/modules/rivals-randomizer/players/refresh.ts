import { protectedProcedure } from "@/lib/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { refreshPlayerFromDiscord } from "./refresh-one"

const refreshRivalsPlayer = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const player = await ctx.prisma.rivalsPlayer.findUnique({
      where: { id: input.id },
    })
    if (!player) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Player not found" })
    }

    console.log(
      `[rivals players] refreshing ${player.displayName} (discordId=${player.discordId})...`,
    )

    const updated = await refreshPlayerFromDiscord(player)

    console.log(`[rivals players] refreshed ${updated.displayName} (id=${updated.id})`)

    return updated
  })

export default refreshRivalsPlayer
