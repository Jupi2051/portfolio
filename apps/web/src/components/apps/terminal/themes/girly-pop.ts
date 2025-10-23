import { TerminalTheme } from "./types";

export const girlyPopTheme: TerminalTheme = {
  name: "girly-pop",
  colors: {
    // Basic ANSI colors (Pink theme with light blue accents)
    black: "#2d1b2e", // Dark purple-pink
    red: "#e91e63", // Bright pink-red
    green: "#4caf50", // Bright green for contrast
    yellow: "#ff9800", // Orange-yellow for contrast
    blue: "#64b5f6", // Light blue - visible but not too light
    cyan: "#4dd0e1", // Light cyan - visible but not too light
    white: "#ffffff", // Pure white for maximum contrast
    gray: "#9e9e9e", // Medium gray for better contrast

    // Background colors
    bgBlack: "#2d1b2e",
    bgRed: "#e91e63",
    bgGreen: "#4caf50",
    bgYellow: "#ff9800",
    bgBlue: "#64b5f6",
    bgMagenta: "#e91e63",
    bgCyan: "#4dd0e1",
    bgWhite: "#ffffff",
    bgGray: "#9e9e9e",

    // Terminal specific colors
    background: "linear-gradient(to bottom right, #f8bbd9, #fce4ec, #f3e5f5)", // Pink gradient
    foreground: "#2d1b2e", // Dark purple-pink for contrast
    selection: "#64b5f6", // Light blue
    selectionText: "#ffffff", // White for maximum contrast
    link: "#64b5f6", // Light blue
    linkHover: "#42a5f5", // Slightly darker blue for hover
    scrollbar: "#90caf9", // Light blue for visibility
    scrollbarHover: "#64b5f6", // Light blue

    magenta: "#e91e63", // Bright pink-red
  },
};
