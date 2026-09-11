import { protectedProcedure } from "@/lib/trpc"
import { computeAccentColorHex, convertToWebp, downloadImageBuffer } from "../image"
import { writeAgentImagesToDisk } from "../prepare-images"
import { scrapeAgentList } from "./scrape"

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

      const iconWebp = iconSource ? await convertToWebp(iconSource, false) : null
      const fullArtWebp = fullArtSource ? await convertToWebp(fullArtSource, false) : null
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
