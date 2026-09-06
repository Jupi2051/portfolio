const API_BASE = import.meta.env.VITE_API_URL ?? ""

/** These are static files exported to disk by the server (see prepare-images.ts), not API routes. */
export function rivalsPlayerAvatarUrl(playerId: string): string {
  return `${API_BASE}/rivals-randomizer-images/players/${playerId}-avatar.webp`
}

export function rivalsPlayerBannerUrl(playerId: string): string {
  return `${API_BASE}/rivals-randomizer-images/players/${playerId}-banner.webp`
}

export function rivalsHeroIconUrl(heroId: string): string {
  return `${API_BASE}/rivals-randomizer-images/heroes/${heroId}-icon.webp`
}

export function rivalsHeroPrestigeUrl(heroId: string): string {
  return `${API_BASE}/rivals-randomizer-images/heroes/${heroId}-prestige.webp`
}
