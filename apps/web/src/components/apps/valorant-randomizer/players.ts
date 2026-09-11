import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import { playerAvatarUrl, playerBannerUrl } from "./image-urls"
import type { ValorantPlayer } from "./types"

export { playerAvatarUrl }

/** Fetches the current pool of active (up to 10) players for the randomizer. */
export function useValorantPlayers() {
  const trpc = useTRPC()
  const query = useQuery(trpc.valorantRandomizer.players.listActive.queryOptions())

  const players: ValorantPlayer[] = (query.data ?? []).map((player) => ({
    id: player.id,
    name: player.name,
    image: playerAvatarUrl(player.id),
    banner: playerBannerUrl(player.id),
    peakRank: player.peakRank,
    skillLevel: player.skillLevel,
    mainAgent: player.mainAgent,
  }))

  return { ...query, players }
}
