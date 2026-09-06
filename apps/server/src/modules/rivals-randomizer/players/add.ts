import { protectedProcedure } from "@/lib/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { fetchDiscordProfile } from "../discord-client"
import { downloadAndConvertToWebp } from "../image"
import { writePlayerImagesToDisk } from "../prepare-images"
import { LOWEST_RIVALS_RANK } from "../rank-labels"
import { DEFAULT_ROLE_SKILLS } from "../validators"

const addRivalsPlayer = protectedProcedure
  .input(z.object({ discordId: z.string().trim().min(1).max(32) }))
  .mutation(async ({ ctx, input }) => {
    const existing = await ctx.prisma.rivalsPlayer.findUnique({
      where: { discordId: input.discordId },
    })
    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "That Discord ID is already in the pool",
      })
    }

    console.log(`[rivals players] fetching Discord profile for ${input.discordId}...`)

    let profile
    try {
      profile = await fetchDiscordProfile(input.discordId)
    } catch (error) {
      console.error(`[rivals players] Discord lookup failed for ${input.discordId}:`, error)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Could not find a Discord user with that ID",
      })
    }

    console.log(
      `[rivals players] found ${profile.displayName} (@${profile.username}), downloading avatar/banner...`,
    )

    const [avatarWebp, bannerWebp] = await Promise.all([
      profile.avatarUrl
        ? downloadAndConvertToWebp(profile.avatarUrl, profile.avatarIsAnimated)
        : Promise.resolve(null),
      profile.bannerUrl
        ? downloadAndConvertToWebp(profile.bannerUrl, profile.bannerIsAnimated)
        : Promise.resolve(null),
    ])

    const { _max } = await ctx.prisma.rivalsPlayer.aggregate({
      _max: { order: true },
    })

    const created = await ctx.prisma.rivalsPlayer.create({
      data: {
        discordId: profile.discordId,
        displayName: profile.displayName,
        username: profile.username,
        avatarWebp,
        avatarIsAnimated: profile.avatarIsAnimated,
        bannerWebp,
        bannerIsAnimated: profile.bannerIsAnimated,
        rank: LOWEST_RIVALS_RANK,
        roleSkills: DEFAULT_ROLE_SKILLS,
        order: (_max.order ?? 0) + 1,
      },
      select: { id: true, discordId: true, displayName: true, username: true },
    })

    await writePlayerImagesToDisk({ id: created.id, avatarWebp, bannerWebp })

    console.log(`[rivals players] added ${created.displayName} (id=${created.id})`)

    return created
  })

export default addRivalsPlayer
