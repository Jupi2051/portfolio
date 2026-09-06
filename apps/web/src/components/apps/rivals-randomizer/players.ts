import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import type { RivalsPlayer, RoleSkill } from "./types"

const API_BASE = import.meta.env.VITE_API_URL ?? ""

/** Static file exported to disk by the server (see prepare-images.ts on the backend), not an API route. */
export function playerAvatarUrl(playerId: string): string {
  return `${API_BASE}/rivals-randomizer-images/players/${playerId}-avatar.webp`
}

/** Fetches the current pool of active (up to 12) players for the randomizer. */
export function useRivalsPlayers() {
  const trpc = useTRPC()
  const query = useQuery(trpc.rivalsRandomizer.players.listActive.queryOptions())

  const players: RivalsPlayer[] = (query.data ?? []).map((player) => ({
    id: player.id,
    name: player.name,
    image: playerAvatarUrl(player.id),
    peakRank: player.peakRank,
    skillLevel: player.skillLevel,
    roleSkills: player.roleSkills as [RoleSkill, RoleSkill, RoleSkill],
    mainHero: player.mainHero,
  }))

  return { ...query, players }
}
