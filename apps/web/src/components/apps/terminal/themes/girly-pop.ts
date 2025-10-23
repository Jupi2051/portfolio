import { TerminalTheme } from "./types";

export const girlyPopTheme: TerminalTheme = {
  name: "girly-pop",
  colors: {
    // Basic ANSI colors (Purple-pink theme)
    black: "#2d1b2e", // Dark purple-pink
    red: "#e91e63", // Bright pink-red
    green: "#9c27b0", // Purple-green
    yellow: "#ff4081", // Pink-yellow
    blue: "#9c27b0", // Purple-blue
    magenta: "#e91e63", // Bright pink-red
    cyan: "#ba68c8", // Light purple
    white: "#ffffff", // Pure white for maximum contrast
    gray: "#8e24aa", // Purple-gray

    // Background colors
    bgBlack: "#2d1b2e",
    bgRed: "#e91e63",
    bgGreen: "#9c27b0",
    bgYellow: "#ff4081",
    bgBlue: "#9c27b0",
    bgMagenta: "#e91e63",
    bgCyan: "#ba68c8",
    bgWhite: "#ffffff",
    bgGray: "#8e24aa",

    // Terminal specific colors
    background: "linear-gradient(to bottom right, #f8bbd9, #e1bee7, #f3e5f5)", // Pink-purple gradient
    foreground: "#2d1b2e", // Dark purple-pink for contrast
    selection: "#9c27b0", // Purple
    selectionText: "#ffffff", // White for maximum contrast
    link: "#ba68c8", // Light purple
    linkHover: "#8e24aa", // Darker purple for hover
    scrollbar: "#ce93d8", // Light purple for visibility
    scrollbarHover: "#9c27b0", // Purple
  },
};
