const API_BASE = import.meta.env.VITE_API_URL ?? ""

/** These are static files exported to disk by the server (see prepare-images.ts on the backend), not API routes. */
export function playerAvatarUrl(playerId: string): string {
  return `${API_BASE}/valorant-randomizer-images/players/${playerId}-avatar.webp`
}

export function playerBannerUrl(playerId: string): string {
  return `${API_BASE}/valorant-randomizer-images/players/${playerId}-banner.webp`
}

export function agentFullArtUrl(agentId: string): string {
  return `${API_BASE}/valorant-randomizer-images/agents/${agentId}-fullart.webp`
}
