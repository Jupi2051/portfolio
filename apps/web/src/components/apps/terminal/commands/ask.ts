import { CommandFunction } from "./types";

const ask: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  if (args.length === 0) {
    outputToTerminal("\x1b[31mUsage: ask <question>\x1b[0m");
    return;
  }

  const question = args.join(" ");
  const answer = await readFromUser(`\x1b[36m${question}\x1b[0m`, false);
  outputToTerminal(`\x1b[32mYou answered: ${answer}\x1b[0m`);
};

export default ask;
