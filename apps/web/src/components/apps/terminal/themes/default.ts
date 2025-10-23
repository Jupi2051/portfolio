import { TerminalTheme } from "./types";

export const defaultTheme: TerminalTheme = {
  name: "default",
  colors: {
    // Basic ANSI colors (Catppuccin Frappe)
    black: "#1e1e2e",
    red: "#f38ba8",
    green: "#a6e3a1",
    yellow: "#f9e2af",
    blue: "#89b4fa",
    magenta: "#cba6f7",
    cyan: "#94e2d5",
    white: "#cdd6f4",
    gray: "#585b70",

    // Background colors
    bgBlack: "#1e1e2e",
    bgRed: "#f38ba8",
    bgGreen: "#a6e3a1",
    bgYellow: "#f9e2af",
    bgBlue: "#89b4fa",
    bgMagenta: "#cba6f7",
    bgCyan: "#94e2d5",
    bgWhite: "#cdd6f4",
    bgGray: "#585b70",

    // Terminal specific colors
    background: "linear-gradient(to bottom right, #303446, #292c3c)", // ctp-base to ctp-surface0 gradient
    foreground: "#c6d0f5", // ctp-text
    selection: "#cba6f7", // ctp-mauve
    selectionText: "#303446", // ctp-base
    link: "#89b4fa", // ctp-blue
    linkHover: "#a6e3a1", // ctp-green
    scrollbar: "#6c7086", // ctp-surface2
    scrollbarHover: "#89b4fa", // ctp-blue
  },
};
