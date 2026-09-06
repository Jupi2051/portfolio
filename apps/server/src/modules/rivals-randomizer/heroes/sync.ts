import { protectedProcedure } from "@/lib/trpc"
import {
  computeAverageColorHex,
  convertToWebp,
  downloadImageBuffer,
} from "../image"
import { writeHeroImagesToDisk } from "../prepare-images"
import { scrapeHeroList } from "./scrape"

const ICON_BASE = "https://rivalskins.com/wp-content/uploads/marvel-assets/ui/heroes/avatar"
const PRESTIGE_BASE =
  "https://rivalskins.com/wp-content/uploads/marvel-assets/assets/hero-prestige-images"

/** The prestige folder has one filename typo among otherwise-consistent `{slug}_prestige.png` names. */
const PRESTIGE_FILENAME_OVERRIDES: Record<string, string> = {
  angela: "angela_restige.png",
}

function prestigeUrlFor(slug: string): string {
  const filename = PRESTIGE_FILENAME_OVERRIDES[slug] ?? `${slug}_prestige.png`
  return `${PRESTIGE_BASE}/${filename}`
}

async function tryDownloadBuffer(url: string | null): Promise<Buffer | null> {
  if (!url) return null
  try {
    return await downloadImageBuffer(url)
  } catch {
    return null
  }
}

type SyncOutcome = "added" | "updated" | "failed"

/**
 * Re-scrapes the live rivalskins.com hero roster and upserts a `RivalsMainHero`
 * per hero: icon (small avatar), prestige art (falls back to costume art when
 * no dedicated prestige image exists), and an average-color accent.
 */
const syncRivalsHeroes = protectedProcedure.mutation(async ({ ctx }) => {
  console.log("[rivals heroes] sync starting: scraping rivalskins.com/heroes/...")
  const scrapedHeroes = await scrapeHeroList()
  console.log(`[rivals heroes] found ${scrapedHeroes.length} heroes on the site`)
  const results: { name: string; outcome: SyncOutcome }[] = []

  for (const scraped of scrapedHeroes) {
    try {
      const existing = await ctx.prisma.rivalsMainHero.findUnique({
        where: { slug: scraped.slug },
        select: { id: true },
      })

      const iconSource = await tryDownloadBuffer(`${ICON_BASE}/${scraped.slug}_avatar.webp`)
      const prestigeSource =
        (await tryDownloadBuffer(prestigeUrlFor(scraped.slug))) ??
        (await tryDownloadBuffer(scraped.costumeImageUrl))

      const iconWebp = iconSource ? await convertToWebp(iconSource, false) : null
      const prestigeWebp = prestigeSource ? await convertToWebp(prestigeSource, false) : null
      const color = iconSource ? await computeAverageColorHex(iconSource) : null

      const hero = await ctx.prisma.rivalsMainHero.upsert({
        where: { slug: scraped.slug },
        create: {
          slug: scraped.slug,
          name: scraped.name,
          iconWebp,
          prestigeWebp,
          color,
        },
        update: {
          name: scraped.name,
          ...(iconWebp ? { iconWebp } : {}),
          ...(prestigeWebp ? { prestigeWebp } : {}),
          ...(color ? { color } : {}),
        },
        select: { id: true, iconWebp: true, prestigeWebp: true },
      })

      await writeHeroImagesToDisk(hero)

      const outcome: SyncOutcome = existing ? "updated" : "added"
      console.log(
        `[rivals heroes] ${outcome} ${scraped.name} (icon=${iconWebp ? "ok" : "missing"}, prestige=${prestigeWebp ? "ok" : "missing"}, color=${color ?? "n/a"})`,
      )
      results.push({ name: scraped.name, outcome })
    } catch (error) {
      console.error(`[rivals heroes] failed to sync "${scraped.name}":`, error)
      results.push({ name: scraped.name, outcome: "failed" })
    }
  }

  const summary = {
    total: scrapedHeroes.length,
    added: results.filter((r) => r.outcome === "added").length,
    updated: results.filter((r) => r.outcome === "updated").length,
    failed: results.filter((r) => r.outcome === "failed").map((r) => r.name),
  }

  console.log(
    `[rivals heroes] sync complete: ${summary.added} added, ${summary.updated} updated, ${summary.failed.length} failed${
      summary.failed.length ? ` (${summary.failed.join(", ")})` : ""
    }`,
  )

  return summary
})

export default syncRivalsHeroes
