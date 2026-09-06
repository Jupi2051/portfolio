import { useCallback, useState } from "react"
import { useRivalsPlayers } from "./players"
import { EMPTY_CONSTRAINTS, useRivalsConstraints } from "./constraints"
import { TeamRosterReveal } from "./team-roster"
import { generateBalancedTeams } from "./team-balancer"
import type { TeamSplitResult } from "./types"

const REQUIRED_PLAYER_COUNT = 12

function RivalsRandomizer() {
  const [result, setResult] = useState<TeamSplitResult | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealKey, setRevealKey] = useState(0)

  const { players, isLoading: isLoadingPlayers } = useRivalsPlayers()
  const { data: constraints, isLoading: isLoadingConstraints } =
    useRivalsConstraints()

  const isLoading = isLoadingPlayers || isLoadingConstraints
  const hasFullRoster = players.length === REQUIRED_PLAYER_COUNT

  const randomizeTeams = () => {
    if (isRevealing || !hasFullRoster) return

    setResult(generateBalancedTeams(players, constraints ?? EMPTY_CONSTRAINTS))
    setRevealKey((current) => current + 1)
    setIsRevealing(true)
  }

  const handleRevealComplete = useCallback(() => {
    setIsRevealing(false)
  }, [])

  return (
    <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden text-ctp-text">
      {/* Oversized so the blur's edge falloff doesn't reveal a sharp, unblurred boundary. */}
      <video
        className="absolute -inset-6 object-cover"
        src="/Imgs/Images/cinematic.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-linear-to-br from-ctp-base/85 via-ctp-mantle/80 to-ctp-crust/90" />

      <div className="relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain p-4 sm:p-6">
        <div className="mx-auto flex h-full w-full min-h-0 max-w-340 flex-col gap-3">
          {/* <header className="text-center">
            <h1 className="font-jockey-one text-3xl tracking-wide text-ctp-lavender">
              Rivals Randomizer
            </h1>
            <p className="mt-1 text-sm text-ctp-subtext0">
              Balanced 6v6 teams by rank, role, and skill weight
            </p>
          </header> */}

          <div className="flex shrink-0 flex-col items-center gap-1">
            <button
              type="button"
              onClick={randomizeTeams}
              disabled={isRevealing || isLoading || !hasFullRoster}
              className="rounded-full cursor-pointer bg-ctp-lavender px-8 py-3 font-jockey-one text-lg tracking-wide text-ctp-crust transition hover:bg-ctp-mauve disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRevealing
                ? "Rolling teams..."
                : result
                  ? "Randomize Again"
                  : "Randomize Teams"}
            </button>
          </div>

          {result ? (
            <TeamRosterReveal
              teamA={result.teamA}
              teamB={result.teamB}
              revealKey={revealKey}
              onRevealComplete={handleRevealComplete}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-ctp-surface2 bg-ctp-surface0/30 px-6 py-10 text-center">
              <p className="text-sm text-ctp-subtext0">
                {isLoading
                  ? "Loading the player pool..."
                  : hasFullRoster
                    ? "Hit Randomize Teams to split 12 players into two balanced 6-stacks with healer, tank, and dps roles assigned."
                    : `Waiting on a full 12-player pool (currently ${players.length}). Add or activate players from Controls.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RivalsRandomizer
