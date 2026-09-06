import { useMemo, useState } from "react"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import { getRankIconUrl } from "@/components/apps/rivals-randomizer/rank-icons"
import AddPlayerForm from "./add-player-form"
import PlayerRosterRow from "./player-roster-row"
import PlayerStatsEditor from "./player-stats-editor"
import ConstraintsDropZone from "./constraints-drop-zone"
import { rivalsHeroIconUrl } from "./image-urls"
import type { RivalsPlayerRow } from "./types"

const MAX_ACTIVE_PLAYERS = 12

export default function PlayersTab() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

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

  const roster = useMemo(() => players.filter((player) => !player.isActive), [players])
  const pool = useMemo(() => players.filter((player) => player.isActive), [players])
  const canActivate = pool.length < MAX_ACTIVE_PLAYERS

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

  function setActive(player: RivalsPlayerRow, isActive: boolean) {
    if (isActive === player.isActive) return
    if (isActive && !canActivate) return
    updatePlayer.mutate({ id: player.id, isActive })
  }

  function handleDragEnd(event: DragEndEvent) {
    const zone = event.over?.id
    if (zone !== "roster" && zone !== "pool") return

    const player = players.find((candidate) => candidate.id === event.active.id)
    if (!player) return

    setActive(player, zone === "pool")
  }

  function renderRow(player: RivalsPlayerRow) {
    return (
      <div key={player.id} className="flex flex-col gap-1">
        <PlayerRosterRow
          player={player}
          expanded={expandedId === player.id}
          onToggleExpand={() =>
            setExpandedId((current) => (current === player.id ? null : player.id))
          }
          onToggleActive={(isActive) => setActive(player, isActive)}
          canActivate={canActivate}
          disabled={updatePlayer.isPending}
        />
        {expandedId === player.id ? (
          <PlayerStatsEditor
            player={player}
            rankOptions={rankOptions}
            heroOptions={heroOptions}
            disabled={updatePlayer.isPending}
            onUpdate={(changes) => updatePlayer.mutate({ id: player.id, ...changes })}
            onRefresh={() => refreshPlayer.mutate({ id: player.id })}
            onRemove={() => removePlayer.mutate({ id: player.id })}
            isRefreshing={refreshPlayer.isPending}
            isRemoving={removePlayer.isPending}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AddPlayerForm />
        <div className="flex flex-col items-end gap-1">
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
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid gap-3 sm:grid-cols-2">
            <ConstraintsDropZone
              id="roster"
              title="All players"
              subtitle="Drag into the pool, or use the checkbox"
              accentClass="border-ctp-surface2"
            >
              {roster.length === 0 ? (
                <p className="px-1 text-xs text-ctp-subtext0">Everyone is in the pool.</p>
              ) : (
                roster.map(renderRow)
              )}
            </ConstraintsDropZone>

            <ConstraintsDropZone
              id="pool"
              title={`Pool (${pool.length}/${MAX_ACTIVE_PLAYERS})`}
              subtitle="The 12 the randomizer draws from"
              accentClass="border-ctp-lavender"
            >
              {pool.length === 0 ? (
                <p className="px-1 text-xs text-ctp-subtext0">Drag players here to activate them.</p>
              ) : (
                pool.map(renderRow)
              )}
            </ConstraintsDropZone>
          </div>
        </DndContext>
      )}
    </div>
  )
}
