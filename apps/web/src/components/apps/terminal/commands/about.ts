import { CommandFunction } from "./types";

const about: CommandFunction = (outputToTerminal) => {
  outputToTerminal(
    "\x1b[36mI'm Jupi — a creative developer who loves building interactive experiences.\x1b[0m"
  );
};

export default about;
