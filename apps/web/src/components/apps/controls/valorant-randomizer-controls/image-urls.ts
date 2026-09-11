const API_BASE = import.meta.env.VITE_API_URL ?? ""

/** These are static files exported to disk by the server (see prepare-images.ts), not API routes. */
export function valorantPlayerAvatarUrl(playerId: string): string {
  return `${API_BASE}/valorant-randomizer-images/players/${playerId}-avatar.webp`
}

export function valorantPlayerBannerUrl(playerId: string): string {
  return `${API_BASE}/valorant-randomizer-images/players/${playerId}-banner.webp`
}

export function valorantAgentIconUrl(agentId: string): string {
  return `${API_BASE}/valorant-randomizer-images/agents/${agentId}-icon.webp`
}

export function valorantAgentFullArtUrl(agentId: string): string {
  return `${API_BASE}/valorant-randomizer-images/agents/${agentId}-fullart.webp`
}
