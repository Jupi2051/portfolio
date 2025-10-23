import { TerminalTheme } from "./types";

export const neonTheme: TerminalTheme = {
  name: "neon",
  colors: {
    // Basic ANSI colors (Classic neon terminal)
    black: "#000000",
    red: "#ff0080",
    green: "#00ff00",
    yellow: "#ffff00",
    blue: "#0080ff",
    magenta: "#ff00ff",
    cyan: "#00ffff",
    white: "#ffffff",
    gray: "#808080",

    // Background colors
    bgBlack: "#000000",
    bgRed: "#ff0080",
    bgGreen: "#00ff00",
    bgYellow: "#ffff00",
    bgBlue: "#0080ff",
    bgMagenta: "#ff00ff",
    bgCyan: "#00ffff",
    bgWhite: "#ffffff",
    bgGray: "#808080",

    // Terminal specific colors
    background: "#000000",
    foreground: "#00ff00",
    selection: "#ff00ff", // Bright magenta
    selectionText: "#000000",
    link: "#00ffff", // Bright cyan
    linkHover: "#ffff00", // Bright yellow
    scrollbar: "#404040",
    scrollbarHover: "#00ff00", // Bright green
  },
};
