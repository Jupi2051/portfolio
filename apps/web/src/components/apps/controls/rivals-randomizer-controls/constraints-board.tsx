import { useMemo, useState } from "react"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import PlayerChip from "./player-chip"
import ConstraintsDropZone from "./constraints-drop-zone"

type Zone = "unassigned" | "sideA" | "sideB"

/** Drag active players onto a side to build this round's must-pair / must-split layout. */
export default function ConstraintsBoard() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const playersQuery = useQuery(trpc.rivalsRandomizer.players.listAll.queryOptions())
  const activePlayers = useMemo(
    () => (playersQuery.data ?? []).filter((player) => player.isActive),
    [playersQuery.data],
  )

  const [placement, setPlacement] = useState<Record<string, Zone>>({})

  const zonePlayers = useMemo(() => {
    const grouped: Record<Zone, typeof activePlayers> = {
      unassigned: [],
      sideA: [],
      sideB: [],
    }
    for (const player of activePlayers) {
      grouped[placement[player.id] ?? "unassigned"].push(player)
    }
    return grouped
  }, [activePlayers, placement])

  const applySides = useMutation({
    ...trpc.rivalsRandomizer.constraints.applySides.mutationOptions(),
    onSuccess: () => {
      void queryClient.invalidateQueries(trpc.rivalsRandomizer.pathFilter())
    },
  })

  function handleDragEnd(event: DragEndEvent) {
    const zone = event.over?.id as Zone | undefined
    if (!zone) return
    setPlacement((current) => ({ ...current, [String(event.active.id)]: zone }))
  }

  function handleSave() {
    applySides.mutate({
      sideA: zonePlayers.sideA.map((player) => player.id),
      sideB: zonePlayers.sideB.map((player) => player.id),
    })
  }

  const hasLayout = zonePlayers.sideA.length > 0 || zonePlayers.sideB.length > 0

  if (playersQuery.isLoading) {
    return <p className="text-sm text-ctp-subtext0">Loading players...</p>
  }

  if (activePlayers.length === 0) {
    return (
      <p className="text-sm text-ctp-subtext0">
        Activate players in the Players tab to start building constraints.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-ctp-subtext0">
        Drag active players onto a side: players on the same side must play together,
        players on opposite sides must be split up.
      </p>

      <DndContext onDragEnd={handleDragEnd}>
        <ConstraintsDropZone
          id="unassigned"
          title="Unassigned"
          subtitle="Not constrained by this layout"
          accentClass="border-ctp-surface2"
        >
          {zonePlayers.unassigned.map((player) => (
            <PlayerChip key={player.id} id={player.id} name={player.displayName} />
          ))}
        </ConstraintsDropZone>

        <div className="grid gap-3 sm:grid-cols-2">
          <ConstraintsDropZone
            id="sideA"
            title="Side A"
            subtitle="Must play together"
            accentClass="border-ctp-blue"
          >
            {zonePlayers.sideA.map((player) => (
              <PlayerChip key={player.id} id={player.id} name={player.displayName} />
            ))}
          </ConstraintsDropZone>
          <ConstraintsDropZone
            id="sideB"
            title="Side B"
            subtitle="Must play together, split from Side A"
            accentClass="border-ctp-red"
          >
            {zonePlayers.sideB.map((player) => (
              <PlayerChip key={player.id} id={player.id} name={player.displayName} />
            ))}
          </ConstraintsDropZone>
        </div>
      </DndContext>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasLayout || applySides.isPending}
          className="cursor-pointer rounded-lg bg-ctp-lavender px-4 py-1.5 text-sm font-medium text-ctp-crust transition hover:bg-ctp-mauve disabled:cursor-not-allowed disabled:opacity-60"
        >
          {applySides.isPending ? "Saving..." : "Save layout as constraints"}
        </button>
        {applySides.data ? (
          <span className="text-xs text-ctp-subtext0">
            Saved {applySides.data.constraintCount} constraint(s).
          </span>
        ) : null}
        {applySides.isError ? (
          <span className="text-xs text-ctp-red">{applySides.error.message}</span>
        ) : null}
      </div>
    </div>
  )
}
