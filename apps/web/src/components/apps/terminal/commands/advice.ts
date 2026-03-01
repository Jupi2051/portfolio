import trpcClient from "@/lib/trpc/trpc-client";
import { CommandFunction } from "./types";

const advice: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const response = await trpcClient.terminal.advice.query();
  outputToTerminal("");
  outputToTerminal(`\x1b[33m${response.advice}\x1b[0m`);
};

export default advice;
