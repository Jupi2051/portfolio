import { CommandFunction } from "./types";
import trpcClient from "@/lib/trpc/trpc-client";

const ping: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const timestamp = Date.now();
  outputToTerminal("\x1b[32m🏓 Pinging server...\x1b[0m");
  const response = await trpcClient.terminal.ping.query();
  const latency = Date.now() - timestamp;

  // Color-coded latency with emojis
  let latencyEmoji = "🟢";
  let latencyColor = "\x1b[32m"; // Green

  if (latency > 200) {
    latencyEmoji = "🟡";
    latencyColor = "\x1b[33m"; // Yellow
  } else if (latency > 500) {
    latencyEmoji = "🔴";
    latencyColor = "\x1b[31m"; // Red
  }

  outputToTerminal(
    `\x1b[36m✨\x1b[0m ${response.message} ${latencyEmoji} ${latencyColor}Latency: ${latency}ms\x1b[0m`
  );
};

export default ping;
