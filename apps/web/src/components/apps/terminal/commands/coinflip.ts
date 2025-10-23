import { CommandFunction } from "./types";

const coinflip: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const isHeads = Math.random() < 0.5;
  const result = isHeads ? "HEADS" : "TAILS";
  const emoji = isHeads ? "🪙" : "🪙";

  const resultColor = isHeads ? "\x1b[32m" : "\x1b[31m"; // Green for heads, red for tails
  outputToTerminal("");
  outputToTerminal(
    `${emoji} \x1b[33mResult:\x1b[0m ${resultColor}${result}\x1b[0m`
  );
  outputToTerminal("");
  outputToTerminal(
    "\x1b[35m💡 Tip: Run 'coinflip' again for another flip!\x1b[0m"
  );
};

export default coinflip;
