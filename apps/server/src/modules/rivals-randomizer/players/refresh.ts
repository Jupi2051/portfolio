import { protectedProcedure } from "@/lib/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { fetchDiscordProfile } from "../discord-client"
import { downloadAndConvertToWebp } from "../image"
import { writePlayerImagesToDisk } from "../prepare-images"

/** Re-pulls display name, username, avatar, and banner from Discord for an existing player. */
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

    const profile = await fetchDiscordProfile(player.discordId)

    const [avatarWebp, bannerWebp] = await Promise.all([
      profile.avatarUrl
        ? downloadAndConvertToWebp(profile.avatarUrl, profile.avatarIsAnimated)
        : Promise.resolve(null),
      profile.bannerUrl
        ? downloadAndConvertToWebp(profile.bannerUrl, profile.bannerIsAnimated)
        : Promise.resolve(null),
    ])

    const updated = await ctx.prisma.rivalsPlayer.update({
      where: { id: input.id },
      data: {
        displayName: profile.displayName,
        username: profile.username,
        avatarWebp,
        avatarIsAnimated: profile.avatarIsAnimated,
        bannerWebp,
        bannerIsAnimated: profile.bannerIsAnimated,
      },
      select: { id: true, displayName: true, username: true },
    })

    await writePlayerImagesToDisk({ id: updated.id, avatarWebp, bannerWebp })

    console.log(`[rivals players] refreshed ${updated.displayName} (id=${updated.id})`)

    return updated
  })

export default refreshRivalsPlayer
