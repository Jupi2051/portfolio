export type CommandFunction = (
  outputToTerminal: (text: string) => void,
  readFromUser: (
    outputText: string,
    deleteOutputMessage?: boolean,
    isPassword?: boolean
  ) => Promise<string>,
  ...args: string[]
) => void | Promise<void>;

export interface Command {
  name: string[];
  execute: CommandFunction;
}
