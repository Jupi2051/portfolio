import axios from "axios"
import { load } from "cheerio"

const HEROES_PAGE_URL = "https://rivalskins.com/heroes/"

export type ScrapedHero = {
  slug: string
  name: string
  /** Base game costume art, used as a prestige-image fallback for heroes with no dedicated one. */
  costumeImageUrl: string | null
}

/** Scrapes the live hero roster straight from the site's own `div.hero-item` cards. */
export async function scrapeHeroList(): Promise<ScrapedHero[]> {
  const { data: html } = await axios.get<string>(HEROES_PAGE_URL)
  const $ = load(html)

  const heroes: ScrapedHero[] = []
  const seenSlugs = new Set<string>()

  $("div.hero-item").each((_, element) => {
    const card = $(element)
    const name = card.attr("data-name")?.trim()
    const href = card.find('a[href*="/hero/"]').first().attr("href")
    const slug = href?.match(/\/hero\/([^/]+)\/?/)?.[1]
    const costumeImageUrl = card.find("img.hero-item-img").first().attr("src") ?? null

    if (!name || !slug || seenSlugs.has(slug)) return
    seenSlugs.add(slug)
    heroes.push({ slug, name, costumeImageUrl })
  })

  return heroes
}
