import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import { getRankIconUrl } from "@/components/apps/rivals-randomizer/rank-icons"
import AddPlayerForm from "./add-player-form"
import DebouncedSlider from "./debounced-slider"
import RoleSkillWeights from "./role-skill-weights"
import IconSelect from "./icon-select"
import { rivalsHeroIconUrl, rivalsPlayerAvatarUrl, rivalsPlayerBannerUrl } from "./image-urls"

const MAX_ACTIVE_PLAYERS = 12

export default function PlayersTab() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [syncMessage, setSyncMessage] = useState<string | null>(null)

  const playersQuery = useQuery(trpc.rivalsRandomizer.players.listAll.queryOptions())
  const ranksQuery = useQuery(trpc.rivalsRandomizer.ranks.list.queryOptions())
  const heroesQuery = useQuery(trpc.rivalsRandomizer.heroes.list.queryOptions())

  const invalidate = () => queryClient.invalidateQueries(trpc.rivalsRandomizer.pathFilter())

  const updatePlayer = useMutation({
    ...trpc.rivalsRandomizer.players.update.mutationOptions(),
    onSuccess: invalidate,
  })
  const removePlayer = useMutation({
    ...trpc.rivalsRandomizer.players.remove.mutationOptions(),
    onSuccess: invalidate,
  })
  const refreshPlayer = useMutation({
    ...trpc.rivalsRandomizer.players.refresh.mutationOptions(),
    onSuccess: invalidate,
  })
  const syncHeroes = useMutation({
    ...trpc.rivalsRandomizer.heroes.sync.mutationOptions(),
    onSuccess: (result) => {
      setSyncMessage(
        `Synced ${result.total} heroes — ${result.added} added, ${result.updated} updated${
          result.failed.length ? `, ${result.failed.length} failed` : ""
        }.`,
      )
      void invalidate()
    },
    onError: (error) => setSyncMessage(`Sync failed: ${error.message}`),
  })

  const players = playersQuery.data ?? []
  const ranks = ranksQuery.data ?? []
  const heroes = heroesQuery.data ?? []
  const activeCount = players.filter((player) => player.isActive).length

  const rankOptions = ranks.map((rank) => ({
    value: rank.value,
    label: rank.label,
    icon: getRankIconUrl(rank.label),
  }))
  const heroOptions = [
    { value: "", label: "No main hero" },
    ...heroes.map((hero) => ({
      value: hero.id,
      label: hero.name,
      icon: rivalsHeroIconUrl(hero.id),
    })),
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AddPlayerForm />
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-ctp-subtext0">
              {activeCount} / {MAX_ACTIVE_PLAYERS} active
            </span>
            <button
              type="button"
              onClick={() => {
                setSyncMessage(null)
                syncHeroes.mutate()
              }}
              disabled={syncHeroes.isPending}
              className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-mantle px-3 py-1.5 text-xs font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text disabled:cursor-not-allowed disabled:opacity-60"
            >
              {syncHeroes.isPending ? "Updating characters..." : "Update game characters list"}
            </button>
          </div>
          {syncMessage ? <span className="text-xs text-ctp-subtext0">{syncMessage}</span> : null}
        </div>
      </div>

      {playersQuery.isLoading ? (
        <p className="text-sm text-ctp-subtext0">Loading players...</p>
      ) : players.length === 0 ? (
        <p className="text-sm text-ctp-subtext0">
          No players yet. Add one by Discord ID above.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {players.map((player) => {
            const canActivate = player.isActive || activeCount < MAX_ACTIVE_PLAYERS

            return (
              <li
                key={player.id}
                className="rounded-xl border border-ctp-surface1 bg-ctp-mantle"
              >
                <div className="relative h-20 w-full">
                  {/* Clips only the banner image to the card's rounded top corners; the avatar
                      below intentionally overflows this box, so it must stay outside this clip. */}
                  <div className="absolute inset-0 overflow-hidden rounded-t-xl bg-ctp-surface0">
                    <img
                      src={rivalsPlayerBannerUrl(player.id)}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden"
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ctp-mantle via-ctp-mantle/30 to-transparent" />
                  </div>
                  <div className="absolute inset-x-3 bottom-0 flex translate-y-1/2 items-end gap-3">
                    <img
                      src={rivalsPlayerAvatarUrl(player.id)}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-xl border-2 border-ctp-mantle object-cover shadow-lg"
                    />
                    <div className="min-w-0 pb-1">
                      <p className="truncate font-medium text-ctp-text drop-shadow">
                        {player.displayName}
                      </p>
                      <p className="truncate text-xs text-ctp-subtext0 drop-shadow">
                        @{player.username}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-3 pt-11 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-ctp-subtext1">
                        <input
                          type="checkbox"
                          checked={player.isActive}
                          disabled={!canActivate || updatePlayer.isPending}
                          onChange={(event) =>
                            updatePlayer.mutate({
                              id: player.id,
                              isActive: event.target.checked,
                            })
                          }
                        />
                        In pool
                      </label>

                      <div className="w-40">
                        <IconSelect
                          value={player.rank}
                          options={rankOptions}
                          disabled={updatePlayer.isPending}
                          onChange={(rank) =>
                            updatePlayer.mutate({
                              id: player.id,
                              rank: rank as typeof player.rank,
                            })
                          }
                        />
                      </div>

                      <div className="w-44">
                        <IconSelect
                          value={player.mainHero?.id ?? ""}
                          options={heroOptions}
                          searchable
                          placeholder="No main hero"
                          disabled={updatePlayer.isPending}
                          onChange={(heroId) =>
                            updatePlayer.mutate({
                              id: player.id,
                              mainHeroId: heroId || null,
                            })
                          }
                        />
                      </div>
                    </div>

                    <DebouncedSlider
                      label="Skill"
                      value={player.skillLevel}
                      disabled={updatePlayer.isPending}
                      onCommit={(skillLevel) =>
                        updatePlayer.mutate({ id: player.id, skillLevel })
                      }
                    />

                    <RoleSkillWeights
                      roleSkills={player.roleSkills}
                      disabled={updatePlayer.isPending}
                      onChange={(roleSkills) => {
                        const ordered = [...roleSkills].sort((a, b) => b.weight - a.weight)
                        updatePlayer.mutate({ id: player.id, roleSkills: ordered })
                      }}
                    />
                  </div>

                  <div className="flex shrink-0 gap-2 sm:flex-col">
                    <button
                      type="button"
                      onClick={() => refreshPlayer.mutate({ id: player.id })}
                      disabled={refreshPlayer.isPending}
                      className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-base px-3 py-1 text-xs text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text"
                    >
                      Refresh
                    </button>
                    <button
                      type="button"
                      onClick={() => removePlayer.mutate({ id: player.id })}
                      disabled={removePlayer.isPending}
                      className="cursor-pointer rounded-lg border border-ctp-red/40 bg-ctp-base px-3 py-1 text-xs text-ctp-red transition hover:bg-ctp-red/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
