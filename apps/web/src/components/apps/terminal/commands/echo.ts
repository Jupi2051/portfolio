import { CommandFunction } from "./types";

const echo: CommandFunction = (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  if (args.length === 0) {
    outputToTerminal("");
  } else {
    outputToTerminal(args.join(" "));
  }
};

export default echo;
