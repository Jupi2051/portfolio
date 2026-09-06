import fs from "node:fs/promises"
import path from "node:path"
import { prisma } from "@/lib/prisma"
import { downloadAndConvertToWebp } from "./image"

function getRivalsImagesDir(): string {
  const bucket = process.env.IMAGES_BUCKET
  if (!bucket) {
    throw new Error("IMAGES_BUCKET is not set")
  }
  return path.join(path.resolve(bucket), "rivals-images")
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
  const dir = path.join(getRivalsImagesDir(), "players")
  await fs.mkdir(dir, { recursive: true })
  await writeIfPresent(dir, `${player.id}-avatar.webp`, player.avatarWebp)
  await writeIfPresent(dir, `${player.id}-banner.webp`, player.bannerWebp)
}

export async function writeHeroImagesToDisk(hero: {
  id: string
  iconWebp?: Uint8Array | null
  prestigeWebp?: Uint8Array | null
}): Promise<void> {
  const dir = path.join(getRivalsImagesDir(), "heroes")
  await fs.mkdir(dir, { recursive: true })
  await writeIfPresent(dir, `${hero.id}-icon.webp`, hero.iconWebp)
  await writeIfPresent(dir, `${hero.id}-prestige.webp`, hero.prestigeWebp)
}

const ROLE_ICON_SOURCES: Record<"support" | "tank" | "dps", string> = {
  support:
    "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/role-icons/Strategist.png",
  tank: "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/role-icons/Vanguard.png",
  dps: "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/role-icons/Duelist.png",
}

async function fileExists(filePath: string): Promise<boolean> {
  return fs.access(filePath).then(
    () => true,
    () => false,
  )
}

/** The 3 role icons are fixed and never change, so they're only fetched once, if missing on disk. */
async function prepareRoleIcons(rivalsImagesDir: string): Promise<void> {
  const rolesDir = path.join(rivalsImagesDir, "roles")
  await fs.mkdir(rolesDir, { recursive: true })

  for (const [role, url] of Object.entries(ROLE_ICON_SOURCES)) {
    const filePath = path.join(rolesDir, `${role}.webp`)
    if (await fileExists(filePath)) continue

    try {
      const webp = await downloadAndConvertToWebp(url, false)
      await fs.writeFile(filePath, Buffer.from(webp))
    } catch (error) {
      console.error(`[rivals images] failed to fetch role icon "${role}":`, error)
    }
  }
}

/**
 * Dumps every player/hero image from the DB to disk (served by `express.static`)
 * and backfills the static role icons. Mirrors Vico's on-start webp export.
 */
export async function prepareRivalsRandomizerImages(): Promise<void> {
  const dir = getRivalsImagesDir()
  await fs.mkdir(dir, { recursive: true })

  const [players, heroes] = await Promise.all([
    prisma.rivalsPlayer.findMany({
      select: { id: true, avatarWebp: true, bannerWebp: true },
    }),
    prisma.rivalsMainHero.findMany({
      select: { id: true, iconWebp: true, prestigeWebp: true },
    }),
  ])

  await Promise.all([
    ...players.map((player) => writePlayerImagesToDisk(player)),
    ...heroes.map((hero) => writeHeroImagesToDisk(hero)),
    prepareRoleIcons(dir),
  ])

  console.log(
    `[rivals images] prepared ${players.length} player(s), ${heroes.length} hero(es)`,
  )
}
