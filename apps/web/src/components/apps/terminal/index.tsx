import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTouchDevice } from "@/hooks/use-touch-device";
import TerminalWindow from "./terminal-window";
import TerminalTextBased from "./terminal-text-based";
import commands from "./commands/index";
import { TerminalInfo } from "./commands/types";
import { loadTheme } from "./themes/persistence";

export interface TerminalProps {
  history?: string[];
  input?: string;
  currentPath?: string;
  sessionStartTime?: number;
  isWaitingForInput?: boolean;
  inputPrompt?: string;
  pendingResolve?: ((value: string) => void) | null;
  shouldDeleteOutputMessage?: boolean;
  isPasswordInput?: boolean;
  isCommandRunning?: boolean;
  commandQueue?: string[];
  commandHistory?: string[];
  historyIndex?: number;
  currentTheme?: string;
  onHistoryChange?: (history: string[]) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrentPathChange?: (path: string) => void;
  onSessionStartTimeChange?: (time: number) => void;
  onIsWaitingForInputChange?: (waiting: boolean) => void;
  onInputPromptChange?: (prompt: string) => void;
  onPendingResolveChange?: (resolve: ((value: string) => void) | null) => void;
  onShouldDeleteOutputMessageChange?: (shouldDelete: boolean) => void;
  onIsPasswordInputChange?: (isPassword: boolean) => void;
  onIsCommandRunningChange?: (running: boolean) => void;
  onCommandQueueChange?: (queue: string[]) => void;
  onCommandHistoryChange?: (history: string[]) => void;
  onHistoryIndexChange?: (index: number) => void;
  onCurrentThemeChange?: (theme: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  terminalRef?: React.RefObject<HTMLDivElement>;
  onTerminalClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onScrollToBottom?: () => void;
}

const Terminal = () => {
  const touchDevice = useTouchDevice();
  console.log(touchDevice);
  const useTextBased = touchDevice;

  // Default history initialization
  const defaultHistory = [
    "\x1b[36mJupi Terminal [Version 1.0.0]\x1b[0m",
    "\x1b[36m(c) Jupi. All rights reserved.\x1b[0m",
    "",
    "\x1b[33mType 'help' to see available commands\x1b[0m",
    "",
  ];

  // State management - initialize with default history unless already provided
  const [history, setHistory] = useState<string[]>(() => {
    // If we're switching components and history is already populated, keep it
    // Otherwise, use the default history
    return defaultHistory;
  });
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("C:\\Users\\Jupi");
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [pendingResolve, setPendingResolve] = useState<
    ((value: string) => void) | null
  >(null);
  const [shouldDeleteOutputMessage, setShouldDeleteOutputMessage] =
    useState(false);
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [isCommandRunning, setIsCommandRunning] = useState(false);
  const [commandQueue, setCommandQueue] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentTheme, setCurrentTheme] = useState(() => loadTheme());

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Parse command function
  const parseCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return { command: "", args: [] };

    const args: string[] = [];
    let current = "";
    let inQuotes = false;
    let quoteChar = "";

    for (let i = 0; i < trimmed.length; i++) {
      const char = trimmed[i];

      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = "";
      } else if (char === " " && !inQuotes) {
        if (current) {
          args.push(current);
          current = "";
        }
      } else {
        current += char;
      }
    }

    if (current) {
      args.push(current);
    }

    const command = args[0] || "";
    const commandArgs = args.slice(1);

    return { command, args: commandArgs };
  };

  // Output to terminal function
  const outputToTerminal = useCallback((text: string) => {
    setHistory((prev) => [...prev, text]);
  }, []);

  // Read from user function
  const readFromUser = useCallback(
    async (
      outputText: string = "",
      deleteOutputMessage: boolean = false,
      isPassword: boolean = false
    ): Promise<string> => {
      if (outputText) {
        outputToTerminal(outputText);
      }

      return new Promise((resolve) => {
        setPendingResolve(() => resolve);
        setInputPrompt("");
        setIsWaitingForInput(true);
        setShouldDeleteOutputMessage(deleteOutputMessage);
        setIsPasswordInput(isPassword);
        setInput("");
      });
    },
    [outputToTerminal]
  );

  // Handle command function
  const handleCommand = useCallback(
    async (cmd: string) => {
      const { command, args } = parseCommand(cmd);
      const commandName = command.toLowerCase();

      setHistory((prev) => [...prev, `${currentPath}>${cmd}`]);

      if (cmd.trim()) {
        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
      }

      if (commandName === "clear") {
        setHistory(() => []);
        return;
      }

      const commandObj = commands.find((cmd) =>
        cmd.name.some((name) => name.toLowerCase() === commandName)
      );

      if (commandObj) {
        setIsCommandRunning(true);
        try {
          const terminalInfo: TerminalInfo = {
            currentPath,
            sessionStartTime,
            setHistory,
            currentTheme,
            setCurrentTheme,
          };

          await commandObj.execute(
            outputToTerminal,
            readFromUser,
            terminalInfo,
            ...args
          );
        } catch (error) {
          outputToTerminal(`\x1b[31mError executing command:\x1b[0m ${error}`);
        } finally {
          setIsCommandRunning(false);
          outputToTerminal("");
        }
      } else {
        outputToTerminal(
          `'${command}' is not recognized as an internal or external command,\noperable program or batch file.`
        );
        outputToTerminal("");
      }
    },
    [
      currentPath,
      sessionStartTime,
      currentTheme,
      setCurrentTheme,
      outputToTerminal,
      readFromUser,
    ]
  );

  // Handle command queue
  useEffect(() => {
    if (!isCommandRunning && commandQueue.length > 0) {
      const nextCommand = commandQueue[0];
      setCommandQueue((prev) => prev.slice(1));
      (async () => {
        await handleCommand(nextCommand);
      })();
    }
  }, [isCommandRunning, commandQueue, handleCommand]);

  // Handle submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentInput = input;
    setInput("");

    // Handle readFromUser input first
    if (isWaitingForInput && pendingResolve) {
      setIsWaitingForInput(false);
      setInputPrompt("");

      if (!shouldDeleteOutputMessage) {
        setHistory((prev) => [...prev, currentInput]);
      }

      setShouldDeleteOutputMessage(false);
      setIsPasswordInput(false);
      pendingResolve(currentInput);
      setPendingResolve(null);
      return;
    }

    // If command is running but not waiting for input, queue the command
    if (isCommandRunning) {
      setCommandQueue((prev) => [...prev, currentInput]);
      return;
    }

    const trimmed = currentInput.trim();
    let inQuotes = false;
    let quoteChar = "";

    for (let i = 0; i < trimmed.length; i++) {
      const char = trimmed[i];
      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = "";
      }
    }

    if (inQuotes) {
      setInput(currentInput + "\n");
      return;
    }

    await handleCommand(currentInput);
  };

  // Handle key down function
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle terminal click
  const handleTerminalClick = (e: React.MouseEvent) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  // Focus input when not running command
  useEffect(() => {
    if (!isCommandRunning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCommandRunning]);

  // Shared props for both components
  const sharedProps: TerminalProps = {
    history,
    input,
    currentPath,
    sessionStartTime,
    isWaitingForInput,
    inputPrompt,
    pendingResolve,
    shouldDeleteOutputMessage,
    isPasswordInput,
    isCommandRunning,
    commandQueue,
    commandHistory,
    historyIndex,
    currentTheme,
    onHistoryChange: setHistory,
    onInputChange: handleInputChange,
    onCurrentPathChange: setCurrentPath,
    onSessionStartTimeChange: setSessionStartTime,
    onIsWaitingForInputChange: setIsWaitingForInput,
    onInputPromptChange: setInputPrompt,
    onPendingResolveChange: setPendingResolve,
    onShouldDeleteOutputMessageChange: setShouldDeleteOutputMessage,
    onIsPasswordInputChange: setIsPasswordInput,
    onIsCommandRunningChange: setIsCommandRunning,
    onCommandQueueChange: setCommandQueue,
    onCommandHistoryChange: setCommandHistory,
    onHistoryIndexChange: setHistoryIndex,
    onCurrentThemeChange: setCurrentTheme,
  };

  return (
    <div className="w-full h-full relative">
      {/* Terminal Components */}

      {/* {useTextBased ? (
        <TerminalTextBased
          {...sharedProps}
          inputRef={inputRef}
          terminalRef={terminalRef}
          onTerminalClick={handleTerminalClick}
          onKeyDown={handleKeyDown}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onScrollToBottom={scrollToBottom}
        />
      ) : (
        <TerminalWindow
          {...sharedProps}
          inputRef={inputRef}
          terminalRef={terminalRef}
          onTerminalClick={handleTerminalClick}
          onKeyDown={handleKeyDown}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onScrollToBottom={scrollToBottom}
        />
      )} */}
      <TerminalTextBased
        {...sharedProps}
        inputRef={inputRef}
        terminalRef={terminalRef}
        onTerminalClick={handleTerminalClick}
        onKeyDown={handleKeyDown}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onScrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default Terminal;
