import { AnimatePresence, motion } from "framer-motion"
import { getRankIconUrl } from "./rank-icons"
import type { RivalsPlayer } from "./types"

const FLIP_TRANSITION = { duration: 0.1, ease: "easeOut" as const }

const FLIP_IMAGE_MOTION = {
  initial: { opacity: 0, scale: 0.65, rotate: -12, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.15, rotate: 10, filter: "blur(4px)" },
}

type TeamPlayerRowProps = {
  player: RivalsPlayer
  isSpinning: boolean
}

function TeamPlayerRow({ player, isSpinning }: TeamPlayerRowProps) {
  const rankIcon = getRankIconUrl(player.peakRank.label)

  return (
    <li className="flex items-center gap-3 rounded-lg bg-ctp-surface0/50 px-3 py-2">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-ctp-surface1">
        {isSpinning ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={player.id}
              src={player.image}
              alt={player.name}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              {...FLIP_IMAGE_MOTION}
              transition={FLIP_TRANSITION}
            />
          </AnimatePresence>
        ) : (
          <img
            src={player.image}
            alt={player.name}
            className="h-full w-full object-cover"
            draggable={false}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        {isSpinning ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={player.id}
              className="truncate font-medium text-ctp-text"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={FLIP_TRANSITION}
            >
              {player.name}
            </motion.p>
          </AnimatePresence>
        ) : (
          <p className="truncate font-medium text-ctp-text">{player.name}</p>
        )}
      </div>
      <div className="relative h-8 w-8 shrink-0 overflow-hidden">
        {isSpinning ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={player.id}
              src={rankIcon}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              draggable={false}
              {...FLIP_IMAGE_MOTION}
              transition={FLIP_TRANSITION}
            />
          </AnimatePresence>
        ) : (
          <img
            src={rankIcon}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        )}
      </div>
    </li>
  )
}

export default TeamPlayerRow
