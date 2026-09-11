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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AddPlayerForm />
        <div className="flex flex-col items-end gap-1">
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setSyncMessage(null)
                syncAgents.mutate()
              }}
              disabled={syncAgents.isPending}
              className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-mantle px-3 py-1.5 text-xs font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text disabled:cursor-not-allowed disabled:opacity-60"
            >
              {syncAgents.isPending ? "Updating agents..." : "Update agent roster"}
            </button>
            <button
              type="button"
              onClick={() => {
                setRefreshAllMessage(null)
                refreshAllPlayers.mutate()
              }}
              disabled={refreshAllPlayers.isPending}
              className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-mantle px-3 py-1.5 text-xs font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text disabled:cursor-not-allowed disabled:opacity-60"
            >
              {refreshAllPlayers.isPending
                ? "Updating profiles..."
                : "Update all discord profiles"}
            </button>
          </div>
          {syncMessage ? <span className="text-xs text-ctp-subtext0">{syncMessage}</span> : null}
          {refreshAllMessage ? (
            <span className="text-xs text-ctp-subtext0">{refreshAllMessage}</span>
          ) : null}
        </div>
      </div>

      <BalancingSettings />

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
              subtitle="The 10 the randomizer draws from"
              accentClass="border-ctp-red"
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
