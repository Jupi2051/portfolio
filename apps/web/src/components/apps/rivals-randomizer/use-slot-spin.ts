import { useEffect, useRef, useState } from "react"
import type { RivalsPlayer } from "./types"

const SPIN_INTERVAL_MS = 75
const MIN_TICKS = 18
const MAX_EXTRA_TICKS = 6

type UseSlotSpinOptions = {
  active: boolean
  finalPlayer: RivalsPlayer
  pool: RivalsPlayer[]
  onComplete: () => void
}

function pickFromPool(pool: RivalsPlayer[], fallback: RivalsPlayer) {
  if (pool.length === 0) return fallback
  return pool[Math.floor(Math.random() * pool.length)]
}

export function useSlotSpin({
  active,
  finalPlayer,
  pool,
  onComplete,
}: UseSlotSpinOptions) {
  const [currentPlayer, setCurrentPlayer] = useState(finalPlayer)
  const [completed, setCompleted] = useState(false)
  const onCompleteRef = useRef(onComplete)
  const poolRef = useRef(pool)
  onCompleteRef.current = onComplete

  if (active) {
    poolRef.current = pool
  }

  useEffect(() => {
    if (!active) return

    const frozenPool =
      poolRef.current.length > 0 ? poolRef.current : [finalPlayer]

    setCompleted(false)
    setCurrentPlayer(pickFromPool(frozenPool, finalPlayer))

    let ticks = 0
    const totalTicks = MIN_TICKS + Math.floor(Math.random() * MAX_EXTRA_TICKS)
    let timeoutId: number | null = null
    let finished = false

    const tick = () => {
      if (ticks >= totalTicks) {
        if (!finished) {
          finished = true
          setCurrentPlayer(finalPlayer)
          setCompleted(true)
          onCompleteRef.current()
        }
        return
      }

      setCurrentPlayer(pickFromPool(frozenPool, finalPlayer))
      ticks += 1
      timeoutId = window.setTimeout(tick, SPIN_INTERVAL_MS)
    }

    timeoutId = window.setTimeout(tick, SPIN_INTERVAL_MS)

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [active, finalPlayer])

  return { currentPlayer, completed }
}
