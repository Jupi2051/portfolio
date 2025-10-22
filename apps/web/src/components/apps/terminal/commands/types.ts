export interface TerminalInfo {
  currentPath: string;
  sessionStartTime: number;
  setHistory: (updater: (prev: string[]) => string[]) => void;
}

export type CommandFunction = (
  outputToTerminal: (text: string) => void,
  readFromUser: (
    outputText: string,
    deleteOutputMessage?: boolean,
    isPassword?: boolean
  ) => Promise<string>,
  terminalInfo: TerminalInfo,
  ...args: string[]
) => void | Promise<void>;

export interface Command {
  name: string[];
  execute: CommandFunction;
}
