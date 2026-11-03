import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import cn from "classnames"
import { CheckIcon } from "@/components/ui/icons"

const TOGGLES = [
  { key: "useSkillLevel", label: "Skill" },
  { key: "useRoleSkills", label: "Roles" },
  { key: "useConstraints", label: "Constraints" },
] as const

/** Lets Controls turn off individual factors the randomizer weighs; unchecking all makes it fully random. */
export default function BalancingSettings() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const settingsQuery = useQuery(trpc.rivalsRandomizer.settings.get.queryOptions())
  const updateSettings = useMutation({
    ...trpc.rivalsRandomizer.settings.update.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(trpc.rivalsRandomizer.pathFilter()),
  })

  const settings = settingsQuery.data
  const isFullyRandom =
    settings && !settings.useSkillLevel && !settings.useRoleSkills && !settings.useConstraints

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="pr-0.5 text-xs text-haze-dim">Balance by</span>
      {TOGGLES.map(({ key, label }) => {
        const checked = settings?.[key] ?? true
        return (
          <label
            key={key}
            className={cn(
              "flex h-7 cursor-pointer items-center gap-1.25 rounded-full border px-2.5 text-xs font-medium transition-colors duration-150 ease-out-strong",
              checked
                ? "border-holo-soft/40 bg-holo/16 text-[#e4e2ff]"
                : "border-white/12 text-haze hover:bg-white/5",
              (!settings || updateSettings.isPending) && "cursor-wait opacity-70",
            )}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              disabled={!settings || updateSettings.isPending}
              onChange={(event) => updateSettings.mutate({ [key]: event.target.checked })}
            />
            {checked && <CheckIcon className="size-2.75 text-[#c9c9ff]" />}
            {label}
          </label>
        )
      })}
      {isFullyRandom ? (
        <span className="pl-1 text-xs text-haze-dim">fully random</span>
      ) : null}
    </div>
  )
}
