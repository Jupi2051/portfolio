import DebouncedSlider from "./debounced-slider"
import { ROLE_ICONS, ROLE_NAMES } from "./role-icons"

type RoleSkillEntry = { role: 0 | 1 | 2; weight: number }

type Props = {
  roleSkills: RoleSkillEntry[]
  onChange: (roleSkills: RoleSkillEntry[]) => void
  disabled?: boolean
}

/** Editing a role's comfort weight (0-1); best-role-first order is derived by sorting weights on save. */
export default function RoleSkillWeights({ roleSkills, onChange, disabled }: Props) {
  const weightByRole = new Map(roleSkills.map((entry) => [entry.role, entry.weight]))

  function handleWeightChange(role: 0 | 1 | 2, weight: number) {
    const next = [0, 1, 2].map((r) => ({
      role: r as 0 | 1 | 2,
      weight: r === role ? weight : (weightByRole.get(r as 0 | 1 | 2) ?? 0),
    }))
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-1.5">
      {([0, 1, 2] as const).map((role) => (
        <DebouncedSlider
          key={role}
          label={ROLE_NAMES[role]}
          icon={ROLE_ICONS[role]}
          value={weightByRole.get(role) ?? 0}
          disabled={disabled}
          onCommit={(weight) => handleWeightChange(role, weight)}
        />
      ))}
    </div>
  )
}
