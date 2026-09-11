import { prisma } from "@/lib/prisma"
import { fetchDiscordProfile } from "@/lib/discord-client"
import { downloadAndConvertToWebp } from "../image"
import { writePlayerImagesToDisk } from "../prepare-images"

/**
 * Re-pulls display name, username, avatar, and banner from Discord for one
 * player. Shared by the single-player `refresh` mutation and the bulk
 * `refreshAll` mutation so there's one place that does the actual work.
 */
export async function refreshPlayerFromDiscord(player: {
  id: string
  discordId: string
}) {
  const profile = await fetchDiscordProfile(player.discordId)

  const [avatarWebp, bannerWebp] = await Promise.all([
    profile.avatarUrl
      ? downloadAndConvertToWebp(profile.avatarUrl, profile.avatarIsAnimated)
      : Promise.resolve(null),
    profile.bannerUrl
      ? downloadAndConvertToWebp(profile.bannerUrl, profile.bannerIsAnimated)
      : Promise.resolve(null),
  ])

  const updated = await prisma.valorantPlayer.update({
    where: { id: player.id },
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

  return updated
}
