import { getAvailableThemes } from "./index";

const THEME_STORAGE_KEY = "terminal-theme";

export const saveTheme = (themeName: string): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
};

export const loadTheme = (): string => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const availableThemes = getAvailableThemes();

    if (savedTheme && availableThemes.includes(savedTheme)) {
      return savedTheme;
    }
  } catch (error) {
    console.warn("Failed to load theme from localStorage:", error);
  }

  return "default";
};

export const clearTheme = (): void => {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear theme from localStorage:", error);
  }
};
