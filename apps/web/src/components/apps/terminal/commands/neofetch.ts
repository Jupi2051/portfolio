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
    `\x1b[36m       @@@@@@@@@@@@@@@@@@@@        \x1b[0m ${distanceFromLogo}-------------------------------------`
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
  outputToTerminal(
    `\x1b[36m  @@@@@  @@@                   @  \x1b[0m \x1b[33m${distanceFromLogo} \x1b[48;2;242;213;207m  \x1b[0m\x1b[48;2;238;190;190m  \x1b[0m\x1b[48;2;244;184;228m  \x1b[0m\x1b[48;2;202;158;230m  \x1b[0m\x1b[48;2;231;130;132m  \x1b[0m\x1b[48;2;234;153;156m  \x1b[0m\x1b[48;2;239;159;118m  \x1b[0m\x1b[48;2;229;200;144m  \x1b[0m`
  );
  outputToTerminal(
    `\x1b[36m   @  @@@                     @@  \x1b[0m \x1b[33m${distanceFromLogo} \x1b[48;2;166;209;137m  \x1b[0m\x1b[48;2;129;200;190m  \x1b[0m\x1b[48;2;153;209;219m  \x1b[0m\x1b[48;2;133;193;220m  \x1b[0m\x1b[48;2;140;170;238m  \x1b[0m\x1b[48;2;186;187;241m  \x1b[0m\x1b[48;2;198;208;245m  \x1b[0m\x1b[48;2;181;191;226m  \x1b[0m`
  );
  outputToTerminal("\x1b[36m   @  @@@                     @@  \x1b[0m");
  outputToTerminal("\x1b[36m                             @@   \x1b[0m");
  outputToTerminal("\x1b[36m     @@@                  @@@     \x1b[0m");
  outputToTerminal("\x1b[36m       @@@@@@@@@@@@@@@@@@@@        \x1b[0m");
  outputToTerminal("\x1b[36m         @@@@@@@@@@@@@@@        \x1b[0m");
};

export default neofetch;
