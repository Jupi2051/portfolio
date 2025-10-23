import { CommandFunction } from "./types";
import trpcClient from "@/lib/trpc/trpc-client";

const ping: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const timestamp = Date.now();
  outputToTerminal("\x1b[36m🏓 Pinging server...\x1b[0m");
  const response = await trpcClient.terminal.ping.query();
  const latency = Date.now() - timestamp;

  // Color-coded latency with emojis using brighter greens
  let latencyEmoji = "🟢";
  let latencyColor = "\x1b[32m"; // Bright green

  if (latency > 500) {
    latencyEmoji = "🔴";
    latencyColor = "\x1b[31m"; // Red
  } else if (latency > 200) {
    latencyEmoji = "🟡";
    latencyColor = "\x1b[33m"; // Yellow
  }

  outputToTerminal(
    `\x1b[36m✨\x1b[0m ${response.message} ${latencyEmoji} ${latencyColor}Latency: ${latency}ms\x1b[0m`
  );
};

export default ping;
