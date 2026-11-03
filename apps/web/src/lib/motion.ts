import type { Transition } from "framer-motion"

/**
 * Framer-motion mirrors of the `--ease-*` tokens in index.css.
 * Keep the two in sync — every animation in the shell pulls from here.
 */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]
export const EASE_IN_OUT: [number, number, number, number] = [
  0.77, 0, 0.175, 1,
]
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1]

/** Popovers / launcher / window open — 200–250ms ease-out. */
export const enterTransition: Transition = { duration: 0.22, ease: EASE_OUT }

/** Exits run a touch faster than entrances. */
export const exitTransition: Transition = { duration: 0.15, ease: EASE_OUT }

/** Press feedback. */
export const pressTransition: Transition = { duration: 0.12, ease: EASE_OUT }
