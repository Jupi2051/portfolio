import { CommandFunction } from "./types";

const neofetch: CommandFunction = (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  // Calculate session duration
  const sessionDuration = Date.now() - terminalInfo.sessionStartTime;
  const sessionMinutes = Math.floor(sessionDuration / 60000);
  const sessionSeconds = Math.floor((sessionDuration % 60000) / 1000);

  // Get browser information
  const userAgent = navigator.userAgent;
  let browserName = "Unknown Browser";

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browserName = "Google Chrome";
  } else if (userAgent.includes("Firefox")) {
    browserName = "Mozilla Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browserName = "Safari";
  } else if (userAgent.includes("Edg")) {
    browserName = "Microsoft Edge";
  } else if (userAgent.includes("Opera")) {
    browserName = "Opera";
  }

  const distanceFromLogo = "      ";

  // Display system information side by side with @ symbol logo
  outputToTerminal(
    `\x1b[36m          @@@@@@@@@@@@@@@          \x1b[0m \x1b[36m${distanceFromLogo}jupi@jupi.dev\x1b[0m`
  );
  outputToTerminal(
    `\x1b[36m       @@@@@@@@@@@@@@@@@@@@        \x1b[0m ${distanceFromLogo}-------------`
  );
  outputToTerminal(
    `\x1b[36m     @@@                  @@@     \x1b[0m \x1b[33m${distanceFromLogo} OS:\x1b[0m Windows 11 Pro 22H2`
  );
  outputToTerminal(
    `\x1b[36m   @@                     @       \x1b[0m \x1b[33m${distanceFromLogo} Host:\x1b[0m https://jupi.dev`
  );
  outputToTerminal(
    `\x1b[36m  @@                   @@@    @   \x1b[0m \x1b[33m${distanceFromLogo} Kernel:\x1b[0m Terminal v1.0.0`
  );
  outputToTerminal(
    `\x1b[36m  @                @@@@@  @@@@@@@ \x1b[0m \x1b[33m${distanceFromLogo} Uptime:\x1b[0m ${sessionMinutes}m ${sessionSeconds}s`
  );
  outputToTerminal(
    `\x1b[36m @@            @@@@    @@@     @@\x1b[0m \x1b[33m${distanceFromLogo}  Shell:\x1b[0m Jupi Terminal`
  );
  outputToTerminal(
    `\x1b[36m  @                @@@@@  @@@@@@@ \x1b[0m \x1b[33m${distanceFromLogo} Browser:\x1b[0m ${browserName}`
  );
  outputToTerminal(
    `\x1b[36m @@            @@@@    @@@     @@\x1b[0m \x1b[33m${distanceFromLogo}  CPU:\x1b[0m Intel® Core™ i5-12400F`
  );
  outputToTerminal(
    `\x1b[36m @          @@@@   @@@@        @@ \x1b[0m \x1b[33m${distanceFromLogo} GPU:\x1b[0m NVIDIA RTX 3060 12 GB`
  );
  outputToTerminal(
    `\x1b[36m @       @@@   @@@@            @@ \x1b[0m \x1b[33m${distanceFromLogo} Memory:\x1b[0m 32 GB DDR4`
  );
  outputToTerminal("\x1b[36m @    @@@   @@@@               @@ \x1b[0m");
  // Create colored squares using ANSI background colors (processed by theme system)
  const colorSquares1 =
    "\x1b[41m  \x1b[0m\x1b[45m  \x1b[0m\x1b[43m  \x1b[0m\x1b[44m  \x1b[0m\x1b[46m  \x1b[0m\x1b[42m  \x1b[0m\x1b[47m  \x1b[0m\x1b[100m  \x1b[0m";
  const colorSquares2 =
    "\x1b[42m  \x1b[0m\x1b[46m  \x1b[0m\x1b[44m  \x1b[0m\x1b[45m  \x1b[0m\x1b[41m  \x1b[0m\x1b[43m  \x1b[0m\x1b[47m  \x1b[0m\x1b[100m  \x1b[0m";

  outputToTerminal(
    `\x1b[36m  @@@@@  @@@                   @  \x1b[0m \x1b[33m${distanceFromLogo} ${colorSquares1}`
  );
  outputToTerminal(
    `\x1b[36m   @  @@@                     @@  \x1b[0m \x1b[33m${distanceFromLogo} ${colorSquares2}`
  );
  outputToTerminal("\x1b[36m   @  @@@                     @@  \x1b[0m");
  outputToTerminal("\x1b[36m                             @@   \x1b[0m");
  outputToTerminal("\x1b[36m     @@@                  @@@     \x1b[0m");
  outputToTerminal("\x1b[36m       @@@@@@@@@@@@@@@@@@@@        \x1b[0m");
  outputToTerminal("\x1b[36m         @@@@@@@@@@@@@@@        \x1b[0m");
};

export default neofetch;
