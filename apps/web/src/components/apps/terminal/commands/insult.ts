import trpcClient from "@/lib/trpc/trpc-client";
import { CommandFunction } from "./types";

const insult: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const response = await trpcClient.terminal.insult.query();
  outputToTerminal("");
  outputToTerminal(`\x1b[33m${response.insult}\x1b[0m`);
};

export default insult;
