import { TerminalTheme } from "./types";

export const instatusTheme: TerminalTheme = {
  name: "instatus",
  colors: {
    // Basic ANSI colors (Authentic Instatus palette)
    black: "#00060D", // Very dark bg
    red: "#D34732", // Main Instatus red
    green: "#43D884", // Main Instatus green
    yellow: "#ECC94B", // Instatus yellow
    blue: "#129FFF", // Main Instatus blue
    magenta: "#FF8C00", // Orange
    cyan: "#4DD9C7", // Lighter green variant
    white: "#ffffff", // Pure white
    gray: "#0B3B59", // Muted blue

    // Background colors
    bgBlack: "#00060D",
    bgRed: "#D34732",
    bgGreen: "#43D884",
    bgYellow: "#ECC94B",
    bgBlue: "#129FFF",
    bgMagenta: "#FF8C00",
    bgCyan: "#4DD9C7",
    bgWhite: "#ffffff",
    bgGray: "#0B3B59",

    // Terminal specific colors
    background: "#030712", // Darker bg
    foreground: "#D1D5DB", // Instatus gray text
    selection: "#129FFF", // Main blue
    selectionText: "#ffffff", // White selection text
    link: "#00B093", // Teal links
    linkHover: "#4DD9C7", // Lighter green hover
    scrollbar: "#0A3459", // Dark blue
    scrollbarHover: "#030973", // Deep blue
  },
};
