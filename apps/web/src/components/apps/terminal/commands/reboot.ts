import { CommandFunction } from "./types";

const reboot: CommandFunction = (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  window.location.href = `${window.location.origin}${window.location.pathname}?Terminal={}`;
};

export default reboot;
