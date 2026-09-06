import DebouncedSlider from "./debounced-slider"
import RoleSkillWeights from "./role-skill-weights"
import IconSelect, { type IconSelectOption } from "./icon-select"
import { rivalsPlayerBannerUrl } from "./image-urls"
import type { RivalsPlayerRow } from "./types"

type Props = {
  player: RivalsPlayerRow
  rankOptions: IconSelectOption[]
  heroOptions: IconSelectOption[]
  disabled: boolean
  onUpdate: (
    changes: Partial<{
      rank: RivalsPlayerRow["rank"]
      mainHeroId: string | null
      skillLevel: number
      roleSkills: RivalsPlayerRow["roleSkills"]
    }>,
  ) => void
  onRefresh: () => void
  onRemove: () => void
  isRefreshing: boolean
  isRemoving: boolean
}

export default function PlayerStatsEditor({
  player,
  rankOptions,
  heroOptions,
  disabled,
  onUpdate,
  onRefresh,
  onRemove,
  isRefreshing,
  isRemoving,
}: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-ctp-surface1 p-3">
      <div className="h-14 w-full overflow-hidden rounded-lg bg-ctp-surface0">
        <img
          src={rivalsPlayerBannerUrl(player.id)}
          alt=""
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden"
          }}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-40">
              <IconSelect
                value={player.rank}
                options={rankOptions}
                disabled={disabled}
                onChange={(rank) => onUpdate({ rank: rank as RivalsPlayerRow["rank"] })}
              />
            </div>
            <div className="w-44">
              <IconSelect
                value={player.mainHero?.id ?? ""}
                options={heroOptions}
                searchable
                placeholder="No main hero"
                disabled={disabled}
                onChange={(heroId) => onUpdate({ mainHeroId: heroId || null })}
              />
            </div>
          </div>

          <DebouncedSlider
            label="Skill"
            value={player.skillLevel}
            disabled={disabled}
            onCommit={(skillLevel) => onUpdate({ skillLevel })}
          />

          <RoleSkillWeights
            roleSkills={player.roleSkills}
            disabled={disabled}
            onChange={(roleSkills) => {
              const ordered = [...roleSkills].sort((a, b) => b.weight - a.weight)
              onUpdate({ roleSkills: ordered })
            }}
          />
        </div>

        <div className="flex shrink-0 gap-2 sm:flex-col">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-mantle px-3 py-1 text-xs text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={isRemoving}
            className="cursor-pointer rounded-lg border border-ctp-red/40 bg-ctp-mantle px-3 py-1 text-xs text-ctp-red transition hover:bg-ctp-red/10"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
