import { useMemo } from "react"
import { motion } from "framer-motion"
import TeamPlayerRow from "./team-player-row"
import { sortPlayersForDisplay } from "./display-order"
import type { AssignedPlayer, BalancedTeam } from "./types"

const ROW_STAGGER_SECONDS = 0.6
const ROW_DURATION_SECONDS = 0.32
/** Fast deceleration ("snappy") rather than a gentle ease-out. */
const ROW_EASE = [0.16, 1, 0.3, 1] as const
const SLIDE_DISTANCE_PX = 220

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
    <section className="flex min-w-0 flex-1 flex-col gap-3">
      <div className={`rounded-t-xl border-b-2 px-4 py-3 ${accentClass}`}>
        <h2 className="font-jockey-one text-xl tracking-wide">{name}</h2>
      </div>
      <ul className="flex flex-col gap-2 px-1">
        {entries.map((entry, index) => (
          <motion.li
            key={`${revealKey}-${entry.player.id}`}
            initial={{ opacity: 0, x: SLIDE_DISTANCE_PX * fromDirection }}
            animate={{ opacity: 1, x: 0 }}
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
        ))}
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
    <div className="grid gap-4 lg:grid-cols-2">
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
