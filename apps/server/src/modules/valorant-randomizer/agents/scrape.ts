import axios from "axios"

const API_BASE = "https://valorant.fandom.com/api.php"
const CATEGORY_TITLE = "Category:Agents"
/** MediaWiki's API etiquette asks for a descriptive UA; api.php isn't Cloudflare-gated like the CDN, but this is cheap insurance against future throttling. */
const API_HEADERS = { "User-Agent": "ValorantRandomizerBot/1.0 (+https://jupi.dev)" }

export type ScrapedAgent = {
  slug: string
  name: string
  iconUrl: string | null
  fullArtUrl: string | null
}

type CategoryMembersResponse = {
  query: { categorymembers: { pageid: number; ns: number; title: string }[] }
}

type InfoboxEntry = {
  type: string
  data: unknown
}

type PagePropsResponse = {
  query: {
    pages: Record<
      string,
      {
        pageid: number
        title: string
        pageprops?: { displaytitle?: string; infoboxes?: string }
      }
    >
  }
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * The "title" infobox entry's value is a raw HTML fragment (a linked thumbnail
 * followed by the display name) — pull the icon's real (non-thumbnail) URL
 * straight out of its anchor `href`, which Wikia always points at
 * `.../revision/latest?cb=...` regardless of the thumbnail size embedded elsewhere.
 */
function extractIconUrl(titleValue: string): string | null {
  const match = titleValue.match(/href="([^"]+_icon\.png[^"]*)"/i)
  return match ? match[1].replace(/&amp;/g, "&") : null
}

function extractFullArtUrl(
  images: { url: string; name: string; alt?: string }[],
): string | null {
  const byAlt = images.find((image) => image.alt?.toLowerCase() === "artwork")
  if (byAlt) return byAlt.url
  const byName = images.find((image) => /artwork.?full/i.test(image.name))
  return byName?.url ?? null
}

/**
 * The rendered `/wiki/Agents` page sits behind a Cloudflare "managed" JS
 * challenge that no plain HTTP client (curl, axios, ...) can pass — confirmed
 * by hand before writing this. Fandom's `api.php` (same domain) isn't gated,
 * and its Portable Infobox data already contains exactly what we need (the
 * page's icon + full-art image URLs, pre-resolved to the real, non-thumbnail
 * `static.wikia.nocookie.net` file), so this scrapes through the API instead
 * of the rendered HTML.
 */
export async function scrapeAgentList(): Promise<ScrapedAgent[]> {
  const { data: categoryData } = await axios.get<CategoryMembersResponse>(API_BASE, {
    params: {
      action: "query",
      list: "categorymembers",
      cmtitle: CATEGORY_TITLE,
      cmlimit: 500,
      format: "json",
    },
    headers: API_HEADERS,
    timeout: 15000,
  })

  const titles = categoryData.query.categorymembers
    .filter((member) => member.ns === 0 && member.title !== "Agents")
    .map((member) => member.title)

  const agents: ScrapedAgent[] = []

  for (const title of titles) {
    try {
      const { data } = await axios.get<PagePropsResponse>(API_BASE, {
        params: {
          action: "query",
          titles: title,
          prop: "pageprops",
          format: "json",
        },
        headers: API_HEADERS,
        timeout: 15000,
      })

      const page = Object.values(data.query.pages)[0]
      const infoboxesRaw = page?.pageprops?.infoboxes
      if (!infoboxesRaw) {
        console.error(`[valorant agents] no infobox found for "${title}", skipping`)
        continue
      }

      const displayName = page.pageprops?.displaytitle ?? title
      const infoboxes = JSON.parse(infoboxesRaw) as { data: InfoboxEntry[] }[]
      const entries = infoboxes[0]?.data ?? []

      const titleEntry = entries.find((entry) => entry.type === "title")
      const imageEntry = entries.find((entry) => entry.type === "image")

      const iconUrl = titleEntry
        ? extractIconUrl((titleEntry.data as { value: string }).value)
        : null
      const fullArtUrl = imageEntry
        ? extractFullArtUrl(
            imageEntry.data as { url: string; name: string; alt?: string }[],
          )
        : null

      agents.push({ slug: slugify(displayName), name: displayName, iconUrl, fullArtUrl })

      // Be a well-behaved scraper: a small pause between the wiki's own API calls.
      await new Promise((resolve) => setTimeout(resolve, 150))
    } catch (error) {
      console.error(`[valorant agents] failed to fetch page data for "${title}":`, error)
    }
  }

  return agents
}
