import axios from "axios";
import { CommandFunction } from "./types";

const joke: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  const response = await axios.get<{ setup: string; punchline: string }>(
    "https://official-joke-api.appspot.com/random_joke"
  );
  outputToTerminal("");
  outputToTerminal(`\x1b[36m💡 ${response.data.setup}\x1b[0m`);
  outputToTerminal(`\x1b[33m💥 ${response.data.punchline}\x1b[0m`);
};

export default joke;
