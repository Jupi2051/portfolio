import { TerminalTheme } from "./types";

/** Hologram — matches the desktop palette (see the @theme block in index.css). */
export const defaultTheme: TerminalTheme = {
  name: "default",
  colors: {
    // Basic ANSI colors
    black: "#12111f",
    red: "#ff5d7e",
    green: "#9be3b4",
    yellow: "#ffd98a",
    blue: "#8c8eff",
    magenta: "#c9a7ff",
    cyan: "#8fd8e8",
    white: "#f1efff",
    gray: "#9a97be",

    // Background colors
    bgBlack: "#12111f",
    bgRed: "#ff5d7e",
    bgGreen: "#9be3b4",
    bgYellow: "#ffd98a",
    bgBlue: "#8c8eff",
    bgMagenta: "#c9a7ff",
    bgCyan: "#8fd8e8",
    bgWhite: "#f1efff",
    bgGray: "#2a2944",

    // Terminal specific colors
    background: "#0e0d1a",
    foreground: "#d9d6ff",
    selection: "#8c8eff",
    selectionText: "#0e0d1a",
    link: "#a9aaff",
    linkHover: "#ffd98a",
    scrollbar: "rgba(255, 255, 255, 0.14)",
    scrollbarHover: "#8c8eff",
  },
};
