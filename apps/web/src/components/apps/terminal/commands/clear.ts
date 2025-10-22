import { CommandFunction } from "./types";

const clear: CommandFunction = (outputToTerminal, readFromUser, ...args) => {
  // This command will be handled specially in the terminal window
  // since it needs to clear the history state
  outputToTerminal(""); // Empty output, the terminal will handle clearing
};

export default clear;
