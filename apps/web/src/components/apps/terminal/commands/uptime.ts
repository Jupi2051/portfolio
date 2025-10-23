import { CommandFunction } from "./types";
import trpcClient from "@/lib/trpc/trpc-client";

const uptime: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  outputToTerminal(
    "\x1b[36m📊 Fetching uptime data from status.jupi.dev...\x1b[0m"
  );

  const { uptime, status } = await trpcClient.terminal.uptime.query();

  const portfolioUptime = parseFloat(uptime);

  // Calculate session duration
  const sessionDuration = Date.now() - terminalInfo.sessionStartTime;
  const sessionMinutes = Math.floor(sessionDuration / 60000);
  const sessionSeconds = Math.floor((sessionDuration % 60000) / 1000);

  // Determine uptime status and colors
  let uptimeEmoji = "🟢";
  let uptimeColor = "\x1b[32m"; // Green
  let statusText = "EXCELLENT";

  if (portfolioUptime < 95) {
    uptimeEmoji = "🔴";
    uptimeColor = "\x1b[31m"; // Red
    statusText = "POOR";
  } else if (portfolioUptime < 99) {
    uptimeEmoji = "🟡";
    uptimeColor = "\x1b[33m"; // Yellow
    statusText = "GOOD";
  } else if (portfolioUptime < 99.9) {
    uptimeEmoji = "🟠";
    uptimeColor = "\x1b[35m"; // Magenta
    statusText = "VERY GOOD";
  }

  // Determine status color based on actual status
  let statusColor = "\x1b[32m"; // Default to green
  switch (status) {
    case "MAJOROUTAGE":
      statusColor = "\x1b[31m"; // Red
      break;
    case "DEGRADEDPERFORMANCE":
      statusColor = "\x1b[33m"; // Yellow
      break;
    case "OPERATIONAL":
      statusColor = "\x1b[32m"; // Green
      break;
    case "UNDERMAINTENANCE":
      statusColor = "\x1b[34m"; // Blue
      break;
    case "PARTIALOUTAGE":
      statusColor = "\x1b[38;5;208m"; // Orange (using 256-color mode)
      break;
    default:
      statusColor = "\x1b[32m"; // Default to green
  }

  terminalInfo.setHistory((prev) => prev.slice(0, -1));

  // ASCII art header
  outputToTerminal("\x1b[36m┌─────────────────────────────────┐\x1b[0m");
  outputToTerminal(
    "\x1b[36m│\x1b[0m \x1b[33m🚀 PORTFOLIO UPTIME MONITOR 🚀 \x1b[0m \x1b[36m│\x1b[0m"
  );
  outputToTerminal("\x1b[36m└─────────────────────────────────┘\x1b[0m");
  outputToTerminal("");

  // Main uptime display
  outputToTerminal(
    `\x1b[36m📈 Portfolio Uptime:\x1b[0m ${uptimeEmoji} ${uptimeColor}${portfolioUptime.toFixed(
      3
    )}%\x1b[0m`
  );
  outputToTerminal(`\x1b[36m📊 Status:\x1b[0m ${statusColor}${status}\x1b[0m`);
  outputToTerminal(
    `\x1b[36m⏱️ Session Duration:\x1b[0m \x1b[33m${sessionMinutes}m ${sessionSeconds}s\x1b[0m`
  );
  outputToTerminal(
    `\x1b[36m📅 Monitoring Period:\x1b[0m \x1b[33mLast 90 days\x1b[0m`
  );
  outputToTerminal("");

  // Progress bar
  const barLength = 30;
  const filledLength = Math.round((portfolioUptime / 100) * barLength);
  const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

  outputToTerminal(
    `[${uptimeColor}${bar}\x1b[0m] ${portfolioUptime.toFixed(1)}%`
  );
  outputToTerminal("");

  // Additional info
  const downtime = 100 - portfolioUptime;
  if (downtime > 0) {
    outputToTerminal(
      `\x1b[36m⚠️ Total Downtime:\x1b[0m \x1b[31m${downtime.toFixed(3)}%\x1b[0m`
    );
  } else {
    outputToTerminal(
      `\x1b[36m✨ Perfect Uptime: \x1b[0m \x1b[32m100.000%\x1b[0m`
    );
  }

  outputToTerminal(
    `\x1b[36m🌐 Monitor URL:\x1b[0m \x1b[33mhttps://status.jupi.dev/\x1b[0m`
  );
};

export default uptime;
