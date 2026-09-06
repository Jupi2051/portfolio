import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"

export type RivalsBalancingSettings = {
  useSkillLevel: boolean
  useRoleSkills: boolean
  useConstraints: boolean
}

export const DEFAULT_BALANCING_SETTINGS: RivalsBalancingSettings = {
  useSkillLevel: true,
  useRoleSkills: true,
  useConstraints: true,
}

/** Fetches which factors the team balancer should weigh (Controls can toggle these). */
export function useRivalsBalancingSettings() {
  const trpc = useTRPC()
  return useQuery(trpc.rivalsRandomizer.settings.get.queryOptions())
}
