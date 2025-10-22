import { CommandFunction } from "./types";

const pwd: CommandFunction = (outputToTerminal, readFromUser, ...args) => {
  // Display the current path (simulated Windows path)
  outputToTerminal("C:\\Users\\Jupi");
};

export default pwd;
