import { useCallback, useState } from "react"
import { injectGuangGuangEasterEgg } from "./guang-guang"
import { RIVALS_PLAYERS } from "./players"
import { TeamRosterReveal } from "./team-roster"
import { generateBalancedTeams } from "./team-balancer"
import type { TeamSplitResult } from "./types"

function RivalsRandomizer() {
  const [result, setResult] = useState<TeamSplitResult | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealKey, setRevealKey] = useState(0)
  const [hasGuangGuangEasterEgg, setHasGuangGuangEasterEgg] = useState(true)

  const randomizeTeams = () => {
    if (isRevealing) return

    const showGuangGuang = hasGuangGuangEasterEgg
    if (showGuangGuang) {
      setHasGuangGuangEasterEgg(false)
    }

    const generated = generateBalancedTeams(RIVALS_PLAYERS)
    setResult(showGuangGuang ? injectGuangGuangEasterEgg(generated) : generated)
    setRevealKey((current) => current + 1)
    setIsRevealing(true)
  }

  const handleRevealComplete = useCallback(() => {
    setIsRevealing(false)
  }, [])

  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden bg-linear-to-br from-ctp-base via-ctp-mantle to-ctp-crust text-ctp-text">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <header className="text-center">
            <h1 className="font-jockey-one text-3xl tracking-wide text-ctp-lavender">
              Rivals Randomizer
            </h1>
            <p className="mt-1 text-sm text-ctp-subtext0">
              Balanced 6v6 teams by rank, role, and skill weight
            </p>
          </header>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={randomizeTeams}
              disabled={isRevealing}
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
              spinPool={RIVALS_PLAYERS}
              revealKey={revealKey}
              isRevealing={isRevealing}
              onRevealComplete={handleRevealComplete}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-ctp-surface2 bg-ctp-surface0/30 px-6 py-10 text-center">
              <p className="text-sm text-ctp-subtext0">
                Hit Randomize Teams to split 12 players into two balanced
                6-stacks with healer, tank, and dps roles assigned.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RivalsRandomizer
