import fs from "node:fs/promises"
import path from "node:path"
import { prisma } from "@/lib/prisma"

function getValorantImagesDir(): string {
  const bucket = process.env.IMAGES_BUCKET
  if (!bucket) {
    throw new Error("IMAGES_BUCKET is not set")
  }
  return path.join(path.resolve(bucket), "valorant-images")
}

async function writeIfPresent(
  dir: string,
  filename: string,
  data: Uint8Array | null | undefined,
): Promise<void> {
  if (!data) return
  await fs.writeFile(path.join(dir, filename), Buffer.from(data))
}

export async function writePlayerImagesToDisk(player: {
  id: string
  avatarWebp?: Uint8Array | null
  bannerWebp?: Uint8Array | null
}): Promise<void> {
  const dir = path.join(getValorantImagesDir(), "players")
  await fs.mkdir(dir, { recursive: true })
  await writeIfPresent(dir, `${player.id}-avatar.webp`, player.avatarWebp)
  await writeIfPresent(dir, `${player.id}-banner.webp`, player.bannerWebp)
}

export async function writeAgentImagesToDisk(agent: {
  id: string
  iconWebp?: Uint8Array | null
  fullArtWebp?: Uint8Array | null
}): Promise<void> {
  const dir = path.join(getValorantImagesDir(), "agents")
  await fs.mkdir(dir, { recursive: true })
  await writeIfPresent(dir, `${agent.id}-icon.webp`, agent.iconWebp)
  await writeIfPresent(dir, `${agent.id}-fullart.webp`, agent.fullArtWebp)
}

/**
 * Dumps every player/agent image from the DB to disk (served by `express.static`).
 * Mirrors the Rivals Randomizer's on-start webp export.
 */
export async function prepareValorantRandomizerImages(): Promise<void> {
  const dir = getValorantImagesDir()
  await fs.mkdir(dir, { recursive: true })

  const [players, agents] = await Promise.all([
    prisma.valorantPlayer.findMany({
      select: { id: true, avatarWebp: true, bannerWebp: true },
    }),
    prisma.valorantAgent.findMany({
      select: { id: true, iconWebp: true, fullArtWebp: true },
    }),
  ])

  await Promise.all([
    ...players.map((player) => writePlayerImagesToDisk(player)),
    ...agents.map((agent) => writeAgentImagesToDisk(agent)),
  ])

  console.log(
    `[valorant images] prepared ${players.length} player(s), ${agents.length} agent(s)`,
  )
}
