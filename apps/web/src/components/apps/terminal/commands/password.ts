import { CommandFunction } from "./types";

const password: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  ...args
) => {
  const password = await readFromUser(
    `output hte password lil bro:`,
    true,
    true
  );
  outputToTerminal(
    `\x1b[32mPassword received (${password.length} characters)\x1b[0m`
  );
};

export default password;
