import { useCallback, useEffect, useMemo, useState } from "react"
import SlotRow from "./slot-row"
import TeamPlayerRow from "./team-player-row"
import { sortPlayersForDisplay } from "./display-order"
import {
  getSpinPool,
  slotKey,
  type SlotKey,
  type TeamSide,
} from "./spin-pool"
import type { AssignedPlayer, BalancedTeam, RivalsPlayer } from "./types"

const ROWS_PER_TEAM = 6

function WaitingRow() {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-ctp-surface0/30 px-3 py-2 opacity-50">
      <div className="h-10 w-10 shrink-0 rounded-md bg-ctp-surface2" />
      <div className="min-w-0 flex-1">
        <div className="h-4 w-24 rounded bg-ctp-surface2" />
      </div>
      <div className="h-8 w-8 shrink-0 rounded bg-ctp-surface2" />
    </li>
  )
}

type TeamRosterProps = {
  name: string
  teamSide: TeamSide
  entries: AssignedPlayer[]
  activeSlotIndex: number
  completedSlots: ReadonlySet<SlotKey>
  isRevealing: boolean
  spinPool: RivalsPlayer[]
  onRowComplete: (team: TeamSide, slotIndex: number) => void
  accentClass: string
}

function TeamRoster({
  name,
  teamSide,
  entries,
  activeSlotIndex,
  completedSlots,
  isRevealing,
  spinPool,
  onRowComplete,
  accentClass,
}: TeamRosterProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-3">
      <div className={`rounded-t-xl border-b-2 px-4 py-3 ${accentClass}`}>
        <h2 className="font-jockey-one text-xl tracking-wide">{name}</h2>
      </div>
      <ul className="flex flex-col gap-2 px-1">
        {entries.map((entry, index) => {
          const key = slotKey(teamSide, index)
          const locked = completedSlots.has(key)
          const spinning = isRevealing && activeSlotIndex === index && !locked

          if (!isRevealing || locked) {
            return (
              <TeamPlayerRow
                key={entry.player.id}
                player={entry.player}
                isSpinning={false}
              />
            )
          }

          if (spinning) {
            return (
              <SlotRow
                key={entry.player.id}
                entry={entry}
                pool={spinPool}
                onComplete={() => onRowComplete(teamSide, index)}
              />
            )
          }

          return <WaitingRow key={entry.player.id} />
        })}
      </ul>
    </section>
  )
}

type TeamRosterRevealProps = {
  teamA: BalancedTeam
  teamB: BalancedTeam
  spinPool: RivalsPlayer[]
  revealKey: number
  isRevealing: boolean
  onRevealComplete: () => void
}

export function TeamRosterReveal({
  teamA,
  teamB,
  spinPool: allPlayers,
  revealKey,
  isRevealing,
  onRevealComplete,
}: TeamRosterRevealProps) {
  const [activeSlotIndex, setActiveSlotIndex] = useState(0)
  const [completedSlots, setCompletedSlots] = useState<Set<SlotKey>>(() => new Set())

  const teamAEntries = useMemo(
    () => sortPlayersForDisplay(teamA.players),
    [teamA.players],
  )
  const teamBEntries = useMemo(
    () => sortPlayersForDisplay(teamB.players),
    [teamB.players],
  )

  const spinPool = useMemo(
    () => getSpinPool(allPlayers, teamAEntries, teamBEntries, completedSlots),
    [allPlayers, teamAEntries, teamBEntries, completedSlots],
  )

  const handleRowComplete = useCallback((team: TeamSide, slotIndex: number) => {
    setCompletedSlots((current) => {
      const next = new Set(current)
      next.add(slotKey(team, slotIndex))
      return next
    })
  }, [])

  useEffect(() => {
    setActiveSlotIndex(0)
    setCompletedSlots(new Set())
  }, [revealKey])

  useEffect(() => {
    if (!isRevealing) return

    const teamADone = completedSlots.has(slotKey("A", activeSlotIndex))
    const teamBDone = completedSlots.has(slotKey("B", activeSlotIndex))

    if (teamADone && teamBDone && activeSlotIndex < ROWS_PER_TEAM) {
      setActiveSlotIndex((current) => current + 1)
    }
  }, [completedSlots, activeSlotIndex, isRevealing])

  useEffect(() => {
    if (!isRevealing) return
    if (activeSlotIndex >= ROWS_PER_TEAM) {
      onRevealComplete()
    }
  }, [activeSlotIndex, isRevealing, onRevealComplete])

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <TeamRoster
        name="Team A"
        teamSide="A"
        entries={teamAEntries}
        activeSlotIndex={activeSlotIndex}
        completedSlots={completedSlots}
        isRevealing={isRevealing}
        spinPool={spinPool}
        onRowComplete={handleRowComplete}
        accentClass="border-ctp-blue bg-ctp-blue/10"
      />
      <TeamRoster
        name="Team B"
        teamSide="B"
        entries={teamBEntries}
        activeSlotIndex={activeSlotIndex}
        completedSlots={completedSlots}
        isRevealing={isRevealing}
        spinPool={spinPool}
        onRowComplete={handleRowComplete}
        accentClass="border-ctp-red bg-ctp-red/10"
      />
    </div>
  )
}
