export interface TerminalTheme {
  name: string;
  colors: {
    // Basic ANSI colors
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    gray: string;

    // Background colors
    bgBlack: string;
    bgRed: string;
    bgGreen: string;
    bgYellow: string;
    bgBlue: string;
    bgMagenta: string;
    bgCyan: string;
    bgWhite: string;
    bgGray: string;

    // Terminal specific colors
    background: string;
    foreground: string;
    selection: string;
    selectionText: string;
    link: string;
    linkHover: string;
    scrollbar: string;
    scrollbarHover: string;
  };
}
