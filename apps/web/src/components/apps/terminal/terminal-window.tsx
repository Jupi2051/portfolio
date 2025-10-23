import React, { useState, useRef, useCallback, useEffect } from "react";
import commands from "./commands/index";
import { TerminalInfo } from "./commands/types";
import { getTheme } from "./themes";
import { loadTheme } from "./themes/persistence";
import TerminalRenderer from "./terminal-renderer";

const TerminalWindow = () => {
  const [currentTheme, setCurrentTheme] = useState(() => loadTheme());
  const [history, setHistory] = useState<string[]>([
    "\x1b[36mJupi Terminal [Version 1.0.0]\x1b[0m",
    "\x1b[36m(c) Jupi. All rights reserved.\x1b[0m",
    "",
    "\x1b[33mType 'help' to see available commands\x1b[0m",
    "",
  ]);
  const [input, setInput] = useState("");
  const [currentPath, _] = useState("C:\\Users\\Jupi");
  const [sessionStartTime] = useState(Date.now());
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

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const handleTerminalClick = (e: React.MouseEvent) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (!isCommandRunning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCommandRunning]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
    } else if (e.key === "PageUp") {
      e.preventDefault();
      if (terminalRef.current) {
        terminalRef.current.scrollTop -= 200;
      }
    } else if (e.key === "PageDown") {
      e.preventDefault();
      if (terminalRef.current) {
        terminalRef.current.scrollTop += 200;
      }
    } else if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault();
      if (terminalRef.current) {
        terminalRef.current.scrollTop = 0;
      }
    }
  };

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

  const outputToTerminal = useCallback((text: string) => {
    setHistory((prev) => [...prev, text]);
    setTimeout(scrollToBottom, 0);
  }, []);

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

  useEffect(() => {
    if (!isCommandRunning && commandQueue.length > 0) {
      const nextCommand = commandQueue[0];
      setCommandQueue((prev) => prev.slice(1));
      (async () => {
        await handleCommand(nextCommand);
      })();
    }
  }, [isCommandRunning, commandQueue, handleCommand]);

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

  const theme = getTheme(currentTheme);

  return (
    <div
      ref={terminalRef}
      className="w-full h-full relative overflow-auto pt-2"
      style={{
        background: theme.colors.background,
      }}
      onClick={handleTerminalClick}
    >
      <TerminalRenderer history={history} currentTheme={currentTheme} />

      <form
        onSubmit={handleSubmit}
        className="px-6 py-0 relative bottom-[15px]"
        style={{
          opacity: isCommandRunning && !isWaitingForInput ? 0 : 1,
        }}
      >
        <div className="flex items-center justify-center">
          {!isWaitingForInput && (
            <span
              className="font-mono text-base leading-4"
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                lineHeight: "16px",
                color: theme.colors.foreground,
              }}
            >
              {currentPath}&gt;
            </span>
          )}
          {
            <input
              ref={inputRef}
              className="flex-1 bg-transparent outline-none font-mono text-base leading-4"
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                lineHeight: "16px",
                color: theme.colors.foreground,
                paddingLeft: "0",
                marginLeft: "0",
              }}
              type={isPasswordInput ? "password" : "text"}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder=""
            />
          }
        </div>
      </form>
    </div>
  );
};

export default TerminalWindow;
