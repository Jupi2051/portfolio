import { CommandFunction } from "./types";
import { getAvailableThemes } from "../themes";
import { saveTheme } from "../themes/persistence";

const theme: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const availableThemes = getAvailableThemes();

  if (args.length === 0) {
    outputToTerminal("Available themes:");
    availableThemes.forEach((themeName) => {
      outputToTerminal(`  \x1b[36m${themeName}\x1b[0m`);
    });
    outputToTerminal("");
    outputToTerminal("\x1b[31mUsage: themes <theme_name>");
    return;
  }

  const requestedTheme = args[0].toLowerCase();

  if (!availableThemes.includes(requestedTheme)) {
    outputToTerminal(`\x1b[31mTheme '${requestedTheme}' not found.\x1b[0m`);
    outputToTerminal("Available themes:");
    availableThemes.forEach((themeName) => {
      outputToTerminal(`  \x1b[36m${themeName}\x1b[0m`);
    });
    return;
  }

  // Switch the theme
  terminalInfo.setCurrentTheme(requestedTheme);
  saveTheme(requestedTheme); // Save to localStorage
  outputToTerminal(`\x1b[32mSwitched to theme: ${requestedTheme}\x1b[0m`);
};

export default theme;
