import { TerminalTheme } from "./types";

export const rosepineTheme: TerminalTheme = {
  name: "rosepine",
  colors: {
    // Basic ANSI colors (Rose Pine palette)
    black: "#1f1d2e", // Surface
    red: "#eb6f92", // Love
    green: "#31748f", // Pine
    yellow: "#f6c177", // Gold
    blue: "#9ccfd8", // Foam
    magenta: "#c4a7e7", // Iris
    cyan: "#ebbcba", // Rose
    white: "#e0def4", // Text
    gray: "#6e6a86", // Muted

    // Background colors
    bgBlack: "#1f1d2e",
    bgRed: "#eb6f92",
    bgGreen: "#31748f",
    bgYellow: "#f6c177",
    bgBlue: "#9ccfd8",
    bgMagenta: "#c4a7e7",
    bgCyan: "#ebbcba",
    bgWhite: "#e0def4",
    bgGray: "#6e6a86",

    // Terminal specific colors
    background: "#191724", // Base background
    foreground: "#e0def4", // Text
    selection: "#c4a7e7", // Iris
    selectionText: "#191724", // Base background
    link: "#9ccfd8", // Foam
    linkHover: "#eb6f92", // Love
    scrollbar: "#26233a", // Overlay
    scrollbarHover: "#6e6a86", // Muted
  },
};
