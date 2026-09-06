import { useMemo } from "react"
import { motion } from "framer-motion"
import TeamPlayerRow, { ROW_HEIGHT_PX, ROW_SKEW_PX } from "./team-player-row"
import { sortPlayersForDisplay } from "./display-order"
import type { AssignedPlayer, BalancedTeam } from "./types"

const ROW_STAGGER_SECONDS = 0.4
const ROW_DURATION_SECONDS = 0.32
/** Fast deceleration ("snappy") rather than a gentle ease-out. */
const ROW_EASE = [0.16, 1, 0.3, 1] as const
const SLIDE_DISTANCE_PX = 220
const ROW_GAP_PX = 8

/**
 * Each row's edges are cut at ROW_SKEW_PX of horizontal shift over its own
 * height. Shifting every next row by that same slope projected across the gap
 * keeps the cut continuing at the same angle, so the edges chain into one
 * unbroken diagonal line down the whole column instead of a zigzag. Rows are
 * flex-filled now (see below), so ROW_HEIGHT_PX is an estimate here, not exact.
 */
const CONTINUOUS_EDGE_STEP_PX = ROW_SKEW_PX * (1 + ROW_GAP_PX / ROW_HEIGHT_PX)

type TeamSide = "A" | "B"

type TeamRosterProps = {
  name: string
  teamSide: TeamSide
  entries: AssignedPlayer[]
  revealKey: number
  onLastRowComplete?: () => void
  accentClass: string
}

function TeamRoster({
  name,
  teamSide,
  entries,
  revealKey,
  onLastRowComplete,
  accentClass,
}: TeamRosterProps) {
  const fromDirection = teamSide === "A" ? -1 : 1

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col gap-3">
      <div
        className={`shrink-0 rounded-t-xl border-b-2 px-4 py-2 ${accentClass}`}
      >
        <h2 className="font-jockey-one text-xl tracking-wide">{name}</h2>
      </div>
      <ul
        className="flex min-h-0 flex-1 flex-col px-1"
        style={{ gap: ROW_GAP_PX }}
      >
        {entries.map((entry, index) => {
          const restingX = -index * CONTINUOUS_EDGE_STEP_PX

          return (
            <motion.li
              key={`${revealKey}-${entry.player.id}`}
              className="min-h-0 flex-1"
              initial={{
                opacity: 0,
                x: restingX + SLIDE_DISTANCE_PX * fromDirection,
              }}
              animate={{ opacity: 1, x: restingX }}
              transition={{
                delay: index * ROW_STAGGER_SECONDS,
                duration: ROW_DURATION_SECONDS,
                ease: ROW_EASE,
              }}
              onAnimationComplete={
                index === entries.length - 1 ? onLastRowComplete : undefined
              }
            >
              <TeamPlayerRow player={entry.player} />
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}

type TeamRosterRevealProps = {
  teamA: BalancedTeam
  teamB: BalancedTeam
  revealKey: number
  onRevealComplete: () => void
}

export function TeamRosterReveal({
  teamA,
  teamB,
  revealKey,
  onRevealComplete,
}: TeamRosterRevealProps) {
  const teamAEntries = useMemo(
    () => sortPlayersForDisplay(teamA.players),
    [teamA.players],
  )
  const teamBEntries = useMemo(
    () => sortPlayersForDisplay(teamB.players),
    [teamB.players],
  )

  return (
    <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2">
      <TeamRoster
        name="Team A"
        teamSide="A"
        entries={teamAEntries}
        revealKey={revealKey}
        onLastRowComplete={onRevealComplete}
        accentClass="border-ctp-blue bg-ctp-blue/10"
      />
      <TeamRoster
        name="Team B"
        teamSide="B"
        entries={teamBEntries}
        revealKey={revealKey}
        onLastRowComplete={onRevealComplete}
        accentClass="border-ctp-red bg-ctp-red/10"
      />
    </div>
  )
}
