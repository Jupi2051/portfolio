import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RIVALS_PLAYERS, type RivalsPlayer } from "./players"

const SPIN_DURATION_MS = 2200
const SPIN_INTERVAL_MS = 80

function pickRandomPlayer(excludeId?: string): RivalsPlayer {
  const pool = excludeId
    ? RIVALS_PLAYERS.filter((player) => player.id !== excludeId)
    : RIVALS_PLAYERS

  return pool[Math.floor(Math.random() * pool.length)] ?? RIVALS_PLAYERS[0]
}

function RivalsRandomizer() {
  const [selectedPlayer, setSelectedPlayer] = useState<RivalsPlayer | null>(
    null,
  )
  const [displayPlayer, setDisplayPlayer] = useState<RivalsPlayer>(
    RIVALS_PLAYERS[0],
  )
  const [isSpinning, setIsSpinning] = useState(false)
  const spinTimerRef = useRef<number | null>(null)

  const clearSpinTimer = useCallback(() => {
    if (spinTimerRef.current !== null) {
      window.clearInterval(spinTimerRef.current)
      spinTimerRef.current = null
    }
  }, [])

  useEffect(() => clearSpinTimer, [clearSpinTimer])

  const randomize = () => {
    if (isSpinning) return

    clearSpinTimer()
    setIsSpinning(true)

    const winner = pickRandomPlayer(selectedPlayer?.id)
    const startedAt = Date.now()

    spinTimerRef.current = window.setInterval(() => {
      setDisplayPlayer(pickRandomPlayer())

      if (Date.now() - startedAt >= SPIN_DURATION_MS) {
        clearSpinTimer()
        setDisplayPlayer(winner)
        setSelectedPlayer(winner)
        setIsSpinning(false)
      }
    }, SPIN_INTERVAL_MS)
  }

  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden bg-linear-to-br from-ctp-base via-ctp-mantle to-ctp-crust text-ctp-text">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6">
          <header className="text-center">
            <h1 className="font-jockey-one text-3xl tracking-wide text-ctp-lavender">
              Rivals Randomizer
            </h1>
            <p className="mt-1 text-sm text-ctp-subtext0">
              Who&apos;s playing today?
            </p>
          </header>

          <div className="relative flex aspect-square w-full max-w-xs items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-ctp-surface0/40 blur-2xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={displayPlayer.id + (isSpinning ? "-spin" : "-idle")}
                initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                animate={{
                  opacity: 1,
                  scale: isSpinning ? [1, 1.04, 1] : 1,
                  rotate: isSpinning ? [0, 4, -4, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.85, rotate: 8 }}
                transition={{
                  duration: isSpinning ? 0.15 : 0.25,
                  repeat: isSpinning ? Infinity : 0,
                }}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <div className="overflow-hidden rounded-2xl border-4 border-ctp-lavender/50 bg-ctp-surface0 shadow-lg shadow-ctp-crust/60">
                  <img
                    src={displayPlayer.image}
                    alt={displayPlayer.name}
                    className="h-56 w-56 object-cover"
                    draggable={false}
                  />
                </div>
                <p className="font-jockey-one text-2xl text-ctp-text">
                  {displayPlayer.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={randomize}
            disabled={isSpinning}
            className="rounded-full bg-ctp-lavender px-8 py-3 font-jockey-one text-lg tracking-wide text-ctp-crust transition hover:bg-ctp-mauve disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSpinning ? "Spinning..." : selectedPlayer ? "Spin Again" : "Randomize"}
          </button>

          <section className="w-full">
            <p className="mb-3 text-center text-xs uppercase tracking-widest text-ctp-subtext0">
              All players
            </p>
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {RIVALS_PLAYERS.map((player) => {
                const isSelected = selectedPlayer?.id === player.id

                return (
                  <li key={player.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isSpinning) return
                        setDisplayPlayer(player)
                        setSelectedPlayer(player)
                      }}
                      className={`group flex w-full flex-col items-center gap-1 rounded-lg p-1.5 transition ${
                        isSelected
                          ? "bg-ctp-lavender/20 ring-2 ring-ctp-lavender"
                          : "hover:bg-ctp-surface0/60"
                      }`}
                      title={player.name}
                    >
                      <img
                        src={player.image}
                        alt={player.name}
                        className="h-10 w-10 rounded-md object-cover"
                        draggable={false}
                      />
                      <span className="truncate text-[0.625rem] text-ctp-subtext1 group-hover:text-ctp-text">
                        {player.name}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RivalsRandomizer
