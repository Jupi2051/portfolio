import { Client, GatewayIntentBits } from "discord.js"

let readyClient: Promise<Client> | null = null

function getClient(): Promise<Client> {
  if (readyClient) return readyClient

  const token = process.env.DISCORD_BOT_TOKEN
  if (!token) {
    return Promise.reject(new Error("DISCORD_BOT_TOKEN is not set"))
  }

  const client = new Client({ intents: [GatewayIntentBits.Guilds] })

  const pending = new Promise<Client>((resolve, reject) => {
    client.once("clientReady", () => resolve(client))
    client.once("error", reject)
    client.login(token).catch(reject)
  })
  pending.catch(() => {
    readyClient = null
  })

  readyClient = pending
  return pending
}

export type DiscordProfile = {
  discordId: string
  username: string
  displayName: string
  avatarUrl: string | null
  avatarIsAnimated: boolean
  bannerUrl: string | null
  bannerIsAnimated: boolean
}

/** `force: true` is required to get `banner`, which Discord omits from cached/gateway users. */
export async function fetchDiscordProfile(discordId: string): Promise<DiscordProfile> {
  const client = await getClient()
  const user = await client.users.fetch(discordId, { force: true })

  const avatarIsAnimated = user.avatar?.startsWith("a_") ?? false
  const bannerIsAnimated = user.banner?.startsWith("a_") ?? false

  const avatarUrl = user.displayAvatarURL({
    extension: avatarIsAnimated ? "gif" : "png",
    size: 256,
  })

  const bannerUrl = user.bannerURL({
    extension: bannerIsAnimated ? "gif" : "png",
    size: 512,
  }) ?? null

  return {
    discordId: user.id,
    username: user.username,
    displayName: user.globalName ?? user.username,
    avatarUrl,
    avatarIsAnimated,
    bannerUrl,
    bannerIsAnimated,
  }
}
