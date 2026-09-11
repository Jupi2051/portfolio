import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"

const TOGGLES = [
  { key: "useSkillLevel", label: "Skill level" },
  { key: "useConstraints", label: "Constraints" },
] as const

/** Lets Controls turn off individual factors the randomizer weighs; unchecking all makes it fully random. */
export default function BalancingSettings() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const settingsQuery = useQuery(trpc.valorantRandomizer.settings.get.queryOptions())
  const updateSettings = useMutation({
    ...trpc.valorantRandomizer.settings.update.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(trpc.valorantRandomizer.pathFilter()),
  })

  const settings = settingsQuery.data
  const isFullyRandom = settings && !settings.useSkillLevel && !settings.useConstraints

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-ctp-surface1 bg-ctp-mantle px-3 py-2">
      <span className="text-xs font-medium text-ctp-subtext1">Weigh teams by:</span>
      {TOGGLES.map(({ key, label }) => (
        <label key={key} className="flex items-center gap-1.5 text-xs text-ctp-subtext1">
          <input
            type="checkbox"
            checked={settings?.[key] ?? true}
            disabled={!settings || updateSettings.isPending}
            onChange={(event) => updateSettings.mutate({ [key]: event.target.checked })}
          />
          {label}
        </label>
      ))}
      {isFullyRandom ? (
        <span className="text-xs text-ctp-subtext0">(fully random)</span>
      ) : null}
    </div>
  )
}
