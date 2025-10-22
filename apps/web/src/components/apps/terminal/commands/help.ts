import { CommandFunction } from "./types";
import commands from "./index";

const help: CommandFunction = (outputToTerminal) => {
  outputToTerminal("\x1b[32mAvailable commands:\x1b[0m");
  const commandsList = commands.map((cmd) => cmd.name[0]);
  outputToTerminal(commandsList.join(", "));

  outputToTerminal("");
  outputToTerminal(
    "\x1b[33mType any command name or alias to execute it.\x1b[0m"
  );
};

export default help;
