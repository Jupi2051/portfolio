import { CommandFunction } from "./types";

const projects: CommandFunction = (outputToTerminal) => {
  outputToTerminal("\x1b[34mVisit: https://jupi.dev/projects\x1b[0m");
};

export default projects;
