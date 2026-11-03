export const NOTE_COLORS = [
  "white",
  "black",
  "blue",
  "green",
  "red",
  "pink",
  "yellow",
  "gray",
  "purple",
] as const

export type NoteColor = (typeof NOTE_COLORS)[number]

type NoteTheme = {
  /** Paper fill. */
  paper: string
  /** Handwriting colour. */
  ink: string
  /** Author line colour. */
  author: string
  /** Pushpin gradient (watermelon, periwinkle or spark). */
  pin: string
  label: string
}

const PIN_MELON =
  "radial-gradient(circle at 35% 30%, #ff9fb3 0%, #ff5d7e 55%, #d63a5c 100%)"
const PIN_HOLO =
  "radial-gradient(circle at 35% 30%, #c9caff 0%, #8c8eff 55%, #5f61d8 100%)"
const PIN_SPARK =
  "radial-gradient(circle at 35% 30%, #fff1c9 0%, #ffd98a 55%, #d9a94e 100%)"

/** The stored colour names (kept for the API) mapped to pastel paper tones. */
export const NOTE_THEMES: Record<NoteColor, NoteTheme> = {
  white: { paper: "#f6f4ff", ink: "#2a2840", author: "#6b6890", pin: PIN_MELON, label: "Paper" },
  black: { paper: "#23213a", ink: "#f1efff", author: "#a9a6cc", pin: PIN_SPARK, label: "Ink" },
  blue: { paper: "#d9dbff", ink: "#2a2840", author: "#5e5c8c", pin: PIN_MELON, label: "Periwinkle" },
  green: { paper: "#d3f2df", ink: "#2a2840", author: "#4f7660", pin: PIN_HOLO, label: "Mint" },
  red: { paper: "#ffd1da", ink: "#2a2840", author: "#8a4e5c", pin: PIN_HOLO, label: "Watermelon" },
  pink: { paper: "#fbd7f0", ink: "#2a2840", author: "#8a5a7e", pin: PIN_MELON, label: "Blush" },
  yellow: { paper: "#ffefc4", ink: "#2a2840", author: "#7a6a45", pin: PIN_MELON, label: "Spark" },
  gray: { paper: "#e3e2ec", ink: "#2a2840", author: "#6b6a80", pin: PIN_MELON, label: "Fog" },
  purple: { paper: "#e6d9ff", ink: "#2a2840", author: "#6e5c99", pin: PIN_HOLO, label: "Lavender" },
}

export const noteTheme = (color: string | undefined) =>
  NOTE_THEMES[(color as NoteColor) ?? "blue"] ?? NOTE_THEMES.blue

/** Stable tilt between -3° and 3° so a note keeps its angle across renders. */
export const noteTilt = (seed: string) => {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0
  return ((Math.abs(hash) % 61) - 30) / 10
}

export const NOTE_MESSAGE_MIN = 10
export const NOTE_MESSAGE_MAX = 100
export const NOTE_NAME_MAX = 50
