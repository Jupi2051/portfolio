import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import { playerAvatarUrl, playerBannerUrl } from "./image-urls"
import type { RivalsPlayer, RoleSkill } from "./types"

export { playerAvatarUrl }

/** Fetches the current pool of active (up to 12) players for the randomizer. */
export function useRivalsPlayers() {
  const trpc = useTRPC()
  const query = useQuery(trpc.rivalsRandomizer.players.listActive.queryOptions())

  const players: RivalsPlayer[] = (query.data ?? []).map((player) => ({
    id: player.id,
    name: player.name,
    image: playerAvatarUrl(player.id),
    banner: playerBannerUrl(player.id),
    peakRank: player.peakRank,
    skillLevel: player.skillLevel,
    roleSkills: player.roleSkills as [RoleSkill, RoleSkill, RoleSkill],
    mainHero: player.mainHero,
  }))

  return { ...query, players }
}
