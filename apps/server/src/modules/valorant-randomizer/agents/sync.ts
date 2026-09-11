import { protectedProcedure } from "@/lib/trpc"
import { computeAccentColorHex, convertToWebp, downloadImageBuffer } from "../image"
import { writeAgentImagesToDisk } from "../prepare-images"
import { scrapeAgentList } from "./scrape"

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const DOWNLOAD_ATTEMPTS = 3

/**
 * The CDN's bot-management occasionally 403s an individual request under
 * rapid back-to-back hits from the same IP (a real browser UA is necessary
 * but not always sufficient) even though the file itself is fine — retrying
 * after a short pause reliably gets it through. Verified: a one-off failure
 * on a specific agent (e.g. Chamber's icon) was not reproducible in isolation,
 * only under the sync's tight per-agent request loop.
 */
async function tryDownloadBuffer(url: string | null): Promise<Buffer | null> {
  if (!url) return null

  for (let attempt = 1; attempt <= DOWNLOAD_ATTEMPTS; attempt++) {
    try {
      return await downloadImageBuffer(url, { Referer: "https://valorant.fandom.com/" })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      if (attempt === DOWNLOAD_ATTEMPTS) {
        console.error(`[valorant agents] image download failed for ${url}: ${message}`)
        return null
      }
      console.warn(
        `[valorant agents] image download attempt ${attempt} failed for ${url} (${message}), retrying...`,
      )
      await sleep(500 * attempt)
    }
  }

  return null
}

type SyncOutcome = "added" | "updated" | "failed"

/**
 * The wiki serves icons at 1024x1024 and full art at 2048x1860 — far larger
 * than this app ever renders them at (a ~60px avatar, a row-height background
 * image). Capping here keeps both the transfer size and the per-frame cost of
 * the reveal animation's SVG outline filter (which scales with pixel count)
 * in the same ballpark as Rivals' equivalents (136px icons, 1200px prestige art).
 */
const ICON_MAX_WIDTH = 150
const FULL_ART_MAX_WIDTH = 1200

/**
 * Re-scrapes the live valorant.fandom.com agent roster and upserts a
 * `ValorantAgent` per agent: icon, full art, and a palette-derived accent color.
 */
const syncValorantAgents = protectedProcedure.mutation(async ({ ctx }) => {
  console.log("[valorant agents] sync starting: scraping valorant.fandom.com/wiki/Agents...")
  const scrapedAgents = await scrapeAgentList()
  console.log(`[valorant agents] found ${scrapedAgents.length} agents on the wiki`)
  const results: { name: string; outcome: SyncOutcome }[] = []

  for (const scraped of scrapedAgents) {
    try {
      const existing = await ctx.prisma.valorantAgent.findUnique({
        where: { slug: scraped.slug },
        select: { id: true },
      })

      const iconSource = await tryDownloadBuffer(scraped.iconUrl)
      const fullArtSource = await tryDownloadBuffer(scraped.fullArtUrl)

      const iconWebp = iconSource ? await convertToWebp(iconSource, false, ICON_MAX_WIDTH) : null
      const fullArtWebp = fullArtSource
        ? await convertToWebp(fullArtSource, false, FULL_ART_MAX_WIDTH)
        : null
      // The icon is a tight headshot crop; the full art actually shows the
      // agent's costume/palette, which is what we want a theme color from.
      const colorSource = fullArtSource ?? iconSource
      const color = colorSource ? await computeAccentColorHex(colorSource) : null

      const agent = await ctx.prisma.valorantAgent.upsert({
        where: { slug: scraped.slug },
        create: {
          slug: scraped.slug,
          name: scraped.name,
          iconWebp,
          fullArtWebp,
          color,
        },
        update: {
          name: scraped.name,
          ...(iconWebp ? { iconWebp } : {}),
          ...(fullArtWebp ? { fullArtWebp } : {}),
          ...(color ? { color } : {}),
        },
        select: { id: true, iconWebp: true, fullArtWebp: true },
      })

      await writeAgentImagesToDisk(agent)

      const outcome: SyncOutcome = existing ? "updated" : "added"
      console.log(
        `[valorant agents] ${outcome} ${scraped.name} (icon=${iconWebp ? "ok" : "missing"}, fullArt=${fullArtWebp ? "ok" : "missing"}, color=${color ?? "n/a"})`,
      )
      results.push({ name: scraped.name, outcome })
    } catch (error) {
      console.error(`[valorant agents] failed to sync "${scraped.name}":`, error)
      results.push({ name: scraped.name, outcome: "failed" })
    }

    // Be a well-behaved scraper: a small pause between agents' image downloads too.
    await sleep(150)
  }

  const summary = {
    total: scrapedAgents.length,
    added: results.filter((r) => r.outcome === "added").length,
    updated: results.filter((r) => r.outcome === "updated").length,
    failed: results.filter((r) => r.outcome === "failed").map((r) => r.name),
  }

  console.log(
    `[valorant agents] sync complete: ${summary.added} added, ${summary.updated} updated, ${summary.failed.length} failed${
      summary.failed.length ? ` (${summary.failed.join(", ")})` : ""
    }`,
  )

  return summary
})

export default syncValorantAgents
