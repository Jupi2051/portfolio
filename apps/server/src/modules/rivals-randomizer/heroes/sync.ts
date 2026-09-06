import { protectedProcedure } from "@/lib/trpc"
import {
  computeAccentColorHex,
  convertToWebp,
  downloadImageBuffer,
} from "../image"
import { writeHeroImagesToDisk } from "../prepare-images"
import { scrapeHeroList } from "./scrape"

const ICON_BASE = "https://rivalskins.com/wp-content/uploads/marvel-assets/ui/heroes/avatar"
/**
 * The site's original `assets/hero-prestige-images/` batch only ever covered the
 * first ~43 heroes (confirmed missing: Black Cat, Jubilee, Deadpool, Cyclops,
 * Rogue, The Hood, White Fox, Devil Dinosaur, Elsa Bloodstone). Each hero's own
 * page instead links to this newer `ui/heroes/prestige/` path, which covers all
 * of them (verified against every hero above plus a sample of the original 43).
 */
const PRESTIGE_BASE = "https://rivalskins.com/wp-content/uploads/marvel-assets/ui/heroes/prestige"

function prestigeUrlFor(slug: string): string {
  return `${PRESTIGE_BASE}/${slug}_prestige.webp`
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
 * no dedicated prestige image exists), and a palette-derived accent color.
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
      // The icon is a tight headshot crop dominated by skin/face; the prestige art
      // actually shows the costume, which is what we want a theme color from.
      const colorSource = prestigeSource ?? iconSource
      const color = colorSource ? await computeAccentColorHex(colorSource) : null

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
