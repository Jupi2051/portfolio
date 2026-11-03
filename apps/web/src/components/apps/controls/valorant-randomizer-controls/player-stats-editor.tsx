import DebouncedSlider from "./debounced-slider"
import IconSelect, { type IconSelectOption } from "./icon-select"
import MainPicker, { type AgentOption } from "./main-picker"
import { valorantPlayerBannerUrl } from "./image-urls"
import type { ValorantPlayerRow } from "./types"

type Props = {
  player: ValorantPlayerRow
  rankOptions: IconSelectOption[]
  agents: AgentOption[]
  disabled: boolean
  onUpdate: (
    changes: Partial<{
      rank: ValorantPlayerRow["rank"]
      skillLevel: number
      mainAgentId: string | null
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
  agents,
  disabled,
  onUpdate,
  onRefresh,
  onRemove,
  isRefreshing,
  isRemoving,
}: Props) {
  return (
    <div className="mx-1.5 mb-1.5 flex flex-col gap-3 rounded-xl border border-white/8 bg-panel-sunken p-3">
      <div className="h-14 w-full overflow-hidden rounded-[10px] bg-raised">
        <img
          src={valorantPlayerBannerUrl(player.id)}
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
                onChange={(rank) => onUpdate({ rank: rank as ValorantPlayerRow["rank"] })}
              />
            </div>
          </div>

          <DebouncedSlider
            label="Skill"
            value={player.skillLevel}
            disabled={disabled}
            onCommit={(skillLevel) => onUpdate({ skillLevel })}
          />

          <div className="rounded-[10px] border border-white/8 p-2">
            <p className="mb-1.5 text-xs font-medium text-haze">Main</p>
            <MainPicker
              agents={agents}
              selectedId={player.mainAgent?.id ?? null}
              disabled={disabled}
              onChange={(mainAgentId) => onUpdate({ mainAgentId })}
            />
          </div>
        </div>

        <div className="flex shrink-0 gap-2 sm:flex-col">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex h-8 cursor-pointer items-center justify-center rounded-[9px] border border-white/10 px-3 text-xs font-medium text-lilac transition-colors duration-150 ease-out-strong hover:bg-white/6"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={isRemoving}
            className="flex h-8 cursor-pointer items-center justify-center rounded-[9px] border border-melon/30 px-3 text-xs font-medium text-[#ff8fa6] transition-colors duration-150 ease-out-strong hover:bg-melon hover:text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
