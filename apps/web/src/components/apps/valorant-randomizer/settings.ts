import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"

export type ValorantBalancingSettings = {
  useSkillLevel: boolean
  useConstraints: boolean
}

export const DEFAULT_BALANCING_SETTINGS: ValorantBalancingSettings = {
  useSkillLevel: true,
  useConstraints: true,
}

/** Fetches which factors the team balancer should weigh (Controls can toggle these). */
export function useValorantBalancingSettings() {
  const trpc = useTRPC()
  return useQuery(trpc.valorantRandomizer.settings.get.queryOptions())
}
