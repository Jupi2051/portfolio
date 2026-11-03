import { useMemo, useState } from "react"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import { getRankIconUrl } from "@/components/apps/valorant-randomizer/rank-icons"
import AddPlayerForm from "./add-player-form"
import PlayerRosterRow from "./player-roster-row"
import PlayerStatsEditor from "./player-stats-editor"
import ConstraintsDropZone from "./constraints-drop-zone"
import BalancingSettings from "./balancing-settings"
import { RefreshIcon, StarIcon } from "@/components/ui/icons"
import { secondaryButtonClassName } from "../controls-panel-header"
import type { ValorantPlayerRow } from "./types"

const MAX_ACTIVE_PLAYERS = 10

export default function PlayersTab() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [refreshAllMessage, setRefreshAllMessage] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const playersQuery = useQuery(trpc.valorantRandomizer.players.listAll.queryOptions())
  const ranksQuery = useQuery(trpc.valorantRandomizer.ranks.list.queryOptions())
  const agentsQuery = useQuery(trpc.valorantRandomizer.agents.list.queryOptions())

  const invalidate = () => queryClient.invalidateQueries(trpc.valorantRandomizer.pathFilter())

  const updatePlayer = useMutation({
    ...trpc.valorantRandomizer.players.update.mutationOptions(),
    onSuccess: invalidate,
  })
  const removePlayer = useMutation({
    ...trpc.valorantRandomizer.players.remove.mutationOptions(),
    onSuccess: invalidate,
  })
  const refreshPlayer = useMutation({
    ...trpc.valorantRandomizer.players.refresh.mutationOptions(),
    onSuccess: invalidate,
  })
  const syncAgents = useMutation({
    ...trpc.valorantRandomizer.agents.sync.mutationOptions(),
    onSuccess: (result) => {
      setSyncMessage(
        `Synced ${result.total} agents — ${result.added} added, ${result.updated} updated${
          result.failed.length ? `, ${result.failed.length} failed` : ""
        }.`,
      )
      void invalidate()
    },
    onError: (error) => setSyncMessage(`Sync failed: ${error.message}`),
  })
  const refreshAllPlayers = useMutation({
    ...trpc.valorantRandomizer.players.refreshAll.mutationOptions(),
    onSuccess: (result) => {
      setRefreshAllMessage(
        `Refreshed ${result.updated}/${result.total} player(s)${
          result.failed.length ? `, ${result.failed.length} failed` : ""
        }.`,
      )
      void invalidate()
    },
    onError: (error) => setRefreshAllMessage(`Refresh failed: ${error.message}`),
  })

  const players = playersQuery.data ?? []
  const ranks = ranksQuery.data ?? []
  const agents = agentsQuery.data ?? []

  const roster = useMemo(() => players.filter((player) => !player.isActive), [players])
  const pool = useMemo(() => players.filter((player) => player.isActive), [players])
  const canActivate = pool.length < MAX_ACTIVE_PLAYERS

  const rankOptions = ranks.map((rank) => ({
    value: rank.value,
    label: rank.label,
    icon: getRankIconUrl(rank.label),
  }))

  function setActive(player: ValorantPlayerRow, isActive: boolean) {
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

  function renderRow(player: ValorantPlayerRow) {
    return (
      <div key={player.id} className="flex flex-col">
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
            agents={agents}
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
      <div className="flex flex-wrap items-start justify-between gap-3">
        <AddPlayerForm />
        <div className="flex flex-col items-end gap-1">
          <div className="flex flex-wrap justify-end gap-1.5">
            <button
              type="button"
              onClick={() => {
                setSyncMessage(null)
                syncAgents.mutate()
              }}
              disabled={syncAgents.isPending}
              className={secondaryButtonClassName}
            >
              <StarIcon className="size-3.5" />
              {syncAgents.isPending ? "Updating agents…" : "Update agents"}
            </button>
            <button
              type="button"
              onClick={() => {
                setRefreshAllMessage(null)
                refreshAllPlayers.mutate()
              }}
              disabled={refreshAllPlayers.isPending}
              className={secondaryButtonClassName}
            >
              <RefreshIcon
                className={`size-3.5 ${refreshAllPlayers.isPending ? "animate-spin" : ""}`}
              />
              {refreshAllPlayers.isPending ? "Syncing…" : "Sync Discord"}
            </button>
          </div>
          {syncMessage ? <span className="text-xs text-haze-dim">{syncMessage}</span> : null}
          {refreshAllMessage ? (
            <span className="text-xs text-haze-dim">{refreshAllMessage}</span>
          ) : null}
        </div>
      </div>

      <BalancingSettings />

      {playersQuery.isLoading ? (
        <div className="grid gap-4 @2xl/appwindow:grid-cols-[1.45fr_1fr]">
          <div className="h-72 animate-pulse rounded-2xl bg-white/4" />
          <div className="h-72 animate-pulse rounded-2xl bg-white/4" />
        </div>
      ) : players.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/12 px-6 py-10 text-center text-sm text-haze">
          No players yet — add one by Discord ID above.
        </p>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid items-start gap-4 @2xl/appwindow:grid-cols-[1.45fr_1fr]">
            <ConstraintsDropZone
              id="pool"
              title="In the pool"
              subtitle={`${pool.length} / ${MAX_ACTIVE_PLAYERS}`}
              accentClass="text-holo-soft"
            >
              {pool.length === 0 ? (
                <p className="px-2.5 py-3 text-xs text-haze-dim">
                  Drag players here to activate them.
                </p>
              ) : (
                pool.map(renderRow)
              )}
            </ConstraintsDropZone>

            <ConstraintsDropZone
              id="roster"
              title="Bench"
              subtitle={String(roster.length)}
              accentClass="text-haze-dim"
            >
              {roster.length === 0 ? (
                <p className="px-2.5 py-3 text-xs text-haze-dim">Everyone is in the pool.</p>
              ) : (
                roster.map(renderRow)
              )}
              {roster.length > 0 && (
                <p className="mx-1 mt-2 rounded-[10px] border border-dashed border-holo-soft/35 py-3 text-center text-xs text-holo-soft">
                  Drag into the pool to activate
                </p>
              )}
            </ConstraintsDropZone>
          </div>
        </DndContext>
      )}
    </div>
  )
}
