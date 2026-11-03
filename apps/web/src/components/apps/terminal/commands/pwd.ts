import { CommandFunction } from "./types";

const pwd: CommandFunction = (outputToTerminal, readFromUser, ...args) => {
  // Display the current path
  outputToTerminal("/home/jupi");
};

export default pwd;
