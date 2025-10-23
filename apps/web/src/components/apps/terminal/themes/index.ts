import { TerminalTheme } from "./types";
import { defaultTheme } from "./default";
import { neonTheme } from "./neon";

export const themes: Record<string, TerminalTheme> = {
  default: defaultTheme,
  neon: neonTheme,
};

export const getTheme = (themeName: string): TerminalTheme => {
  return themes[themeName] || themes.default;
};

export const getColor = (
  themeName: string,
  colorKey: keyof TerminalTheme["colors"]
): string => {
  const theme = getTheme(themeName);
  return theme.colors[colorKey];
};

export const getAvailableThemes = (): string[] => {
  return Object.keys(themes);
};
