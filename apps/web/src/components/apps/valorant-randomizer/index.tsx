import { useCallback, useState } from "react"
import { useValorantPlayers } from "./players"
import { EMPTY_CONSTRAINTS, useValorantConstraints } from "./constraints"
import { DEFAULT_BALANCING_SETTINGS, useValorantBalancingSettings } from "./settings"
import { TeamRosterReveal } from "./team-roster"
import { generateBalancedTeams } from "./team-balancer"
import RandomizeButton from "./randomize-button"
import type { TeamSplitResult } from "./types"

const REQUIRED_PLAYER_COUNT = 10

function ValorantRandomizer() {
  const [result, setResult] = useState<TeamSplitResult | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealKey, setRevealKey] = useState(0)

  const { players, isLoading: isLoadingPlayers } = useValorantPlayers()
  const { data: constraints, isLoading: isLoadingConstraints } =
    useValorantConstraints()
  const { data: balancingSettings, isLoading: isLoadingSettings } =
    useValorantBalancingSettings()

  const isLoading = isLoadingPlayers || isLoadingConstraints || isLoadingSettings
  const hasFullRoster = players.length === REQUIRED_PLAYER_COUNT

  const randomizeTeams = () => {
    if (isRevealing || !hasFullRoster) return

    setResult(
      generateBalancedTeams(
        players,
        constraints ?? EMPTY_CONSTRAINTS,
        balancingSettings ?? DEFAULT_BALANCING_SETTINGS,
      ),
    )
    setRevealKey((current) => current + 1)
    setIsRevealing(true)
  }

  const handleRevealComplete = useCallback(() => {
    setIsRevealing(false)
  }, [])

  return (
    <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden text-ctp-text">
      <div className="absolute inset-0 bg-linear-to-br from-ctp-crust via-ctp-mantle to-ctp-base" />
      <div className="absolute inset-0 bg-linear-to-br from-ctp-red/10 via-transparent to-ctp-blue/10" />

      <div className="relative flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain p-4 sm:p-6">
        <div className="mx-auto flex h-full w-full min-h-0 max-w-340 flex-col gap-3">
          <div className="flex shrink-0 flex-col items-center gap-1">
            <RandomizeButton
              onClick={randomizeTeams}
              disabled={isRevealing || isLoading || !hasFullRoster}
              label={
                isRevealing
                  ? "Rolling teams..."
                  : result
                    ? "Randomize Again"
                    : "Randomize Teams"
              }
            />
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
                    ? "Hit Randomize Teams to split 10 players into two balanced 5-stacks by skill weight."
                    : `Waiting on a full 10-player pool (currently ${players.length}). Add or activate players from Controls.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ValorantRandomizer
