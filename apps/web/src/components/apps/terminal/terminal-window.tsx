import React, { useState, useRef, useCallback } from "react";
import commands from "./commands/index";
import { TerminalInfo } from "./commands/types";
import { getTheme } from "./themes";
import { loadTheme } from "./themes/persistence";

const MAX_HISTORY_LINES = 50;

const TerminalWindow = () => {
  const [currentTheme, setCurrentTheme] = useState(() => loadTheme());
  const [history, setHistoryState] = useState<string[]>([
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

  const setHistory = useCallback((updater: (prev: string[]) => string[]) => {
    setHistoryState((prev) => {
      const newHistory = updater(prev);
      if (newHistory.length > MAX_HISTORY_LINES) {
        return newHistory.slice(-MAX_HISTORY_LINES);
      }
      return newHistory;
    });
  }, []);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    if (!isCommandRunning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCommandRunning]);

  React.useEffect(() => {
    if (!isCommandRunning && commandQueue.length > 0) {
      const nextCommand = commandQueue[0];
      setCommandQueue((prev) => prev.slice(1));
      (async () => {
        await handleCommand(nextCommand);
      })();
    }
  }, [isCommandRunning, commandQueue]);

  const handleTerminalClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTerminalContextMenu = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      e.preventDefault();

      navigator.clipboard
        .writeText(selection.toString())
        .then(() => {
          selection.removeAllRanges();

          if (inputRef.current) {
            inputRef.current.focus();
          }
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
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
    }
  };

  const processEscapeSequences = (text: string) => {
    const theme = getTheme(currentTheme);

    // Escape HTML characters to prevent them from being interpreted as HTML tags
    let processed = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const escapeMap: { [key: string]: string } = {
      "\x1b[0m": "</span>",
      "\x1b[1m": '<span style="font-weight: bold">',
      "\x1b[2m": '<span style="opacity: 0.5">',
      "\x1b[4m": '<span style="text-decoration: underline">',
      "\x1b[5m": '<span style="animation: blink 1s infinite">',
      "\x1b[7m": `<span style="background-color: currentColor; color: ${theme.colors.background}">`,
      "\x1b[8m": '<span style="color: transparent">',

      "\x1b[30m": `<span style="color: ${theme.colors.black}">`, // Black
      "\x1b[31m": `<span style="color: ${theme.colors.red}">`, // Red
      "\x1b[32m": `<span style="color: ${theme.colors.green}">`, // Green
      "\x1b[33m": `<span style="color: ${theme.colors.yellow}">`, // Yellow
      "\x1b[34m": `<span style="color: ${theme.colors.blue}">`, // Blue
      "\x1b[35m": `<span style="color: ${theme.colors.magenta}">`, // Magenta
      "\x1b[36m": `<span style="color: ${theme.colors.cyan}">`, // Cyan
      "\x1b[37m": `<span style="color: ${theme.colors.white}">`, // White
      "\x1b[90m": `<span style="color: ${theme.colors.gray}">`, // Gray

      "\x1b[40m": `<span style="background-color: ${theme.colors.bgBlack}">`, // Black
      "\x1b[41m": `<span style="background-color: ${theme.colors.bgRed}">`, // Red
      "\x1b[42m": `<span style="background-color: ${theme.colors.bgGreen}">`, // Green
      "\x1b[43m": `<span style="background-color: ${theme.colors.bgYellow}">`, // Yellow
      "\x1b[44m": `<span style="background-color: ${theme.colors.bgBlue}">`, // Blue
      "\x1b[45m": `<span style="background-color: ${theme.colors.bgMagenta}">`, // Magenta
      "\x1b[46m": `<span style="background-color: ${theme.colors.bgCyan}">`, // Cyan
      "\x1b[47m": `<span style="background-color: ${theme.colors.bgWhite}">`, // White
      "\x1b[100m": `<span style="background-color: ${theme.colors.bgGray}">`, // Gray
    };

    processed = processed.replace(
      /\x1b\[38;2;(\d+);(\d+);(\d+)m/g,
      '<span style="color: rgb($1, $2, $3)">'
    );

    processed = processed.replace(
      /\x1b\[48;2;(\d+);(\d+);(\d+)m/g,
      '<span style="background-color: rgb($1, $2, $3)">'
    );

    Object.entries(escapeMap).forEach(([escape, replacement]) => {
      processed = processed.replace(
        new RegExp(escape.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
        replacement
      );
    });

    processed = processed.replace(/\n/g, "<br>");

    const urlRegex = /(?<!\\)(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
    processed = processed.replace(
      urlRegex,
      `<a href="$1" target="_blank" rel="noopener noreferrer" style="color: ${theme.colors.link}; text-decoration: underline;">$1</a>`
    );

    processed = processed.replace(
      /\\https?:\/\/[^\s<>"{}|\\^`[\]]+/g,
      (match) => match.substring(1)
    );

    const openSpans = (processed.match(/<span/g) || []).length;
    const closeSpans = (processed.match(/<\/span>/g) || []).length;
    processed += "</span>".repeat(openSpans - closeSpans);

    return processed;
  };

  React.useEffect(() => {
    const theme = getTheme(currentTheme);
    const style = document.createElement("style");
    style.textContent = `
      .terminal-selection ::selection {
        background-color: ${theme.colors.selection};
        color: ${theme.colors.selectionText};
      }
      .terminal-selection ::-moz-selection {
        background-color: ${theme.colors.selection};
        color: ${theme.colors.selectionText};
      }
      .terminal-selection a {
        color: ${theme.colors.link} !important;
        text-decoration: underline !important;
        cursor: pointer;
      }
      .terminal-selection a:hover {
        color: ${theme.colors.linkHover} !important;
        text-decoration: underline !important;
      }
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      .terminal-selection::-webkit-scrollbar {
        width: 8px;
      }
      .terminal-selection::-webkit-scrollbar-track {
        background: transparent;
      }
      .terminal-selection::-webkit-scrollbar-thumb {
        background: ${theme.colors.scrollbar};
        border-radius: 4px;
        border: none;
      }
      .terminal-selection::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.scrollbarHover};
      }
      .terminal-selection::-webkit-scrollbar-corner {
        background: transparent;
      }
      
      .terminal-selection {
        scrollbar-width: thin;
        scrollbar-color: ${theme.colors.scrollbar} transparent;
      }
      
      .terminal-selection div {
        margin: 0 !important;
        padding: 0 !important;
        line-height: 1 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [currentTheme]);

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

  const outputToTerminal = (text: string) => {
    setHistory((prev) => [...prev, text]);
    setTimeout(scrollToBottom, 0);
  };

  const readFromUser = async (
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
  };

  const handleCommand = async (cmd: string) => {
    const { command, args } = parseCommand(cmd);
    const commandName = command.toLowerCase();

    setHistory((prev) => [...prev, `${currentPath}>${cmd}`]);

    if (cmd.trim()) {
      setCommandHistory((prev) => {
        const newHistory = [...prev, cmd];
        if (newHistory.length > MAX_HISTORY_LINES) {
          return newHistory.slice(-MAX_HISTORY_LINES);
        }
        return newHistory;
      });
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentInput = input;
    setInput("");

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

    await handleCommand(currentInput);
  };

  const theme = getTheme(currentTheme);

  return (
    <div
      ref={terminalRef}
      className="w-full h-full font-roboto font-normal @lg/appwindow:p-6 p-3 overflow-y-auto terminal-selection"
      style={{
        background: theme.colors.background,
        color: theme.colors.foreground,
      }}
      onClick={handleTerminalClick}
      onContextMenu={handleTerminalContextMenu}
    >
      <div
        className="whitespace-pre-wrap break-words"
        style={{
          fontFamily: "monospace",
          fontSize: "16px",
          lineHeight: 1,
          margin: 0,
          padding: 0,
        }}
      >
        {history.map((line, i) => {
          const isColorSquareLine = line.includes("\x1b[48;2;");

          return (
            <div
              key={i}
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                lineHeight: 1,
                margin: 0,
                padding: 0,
                color: theme.colors.foreground,
              }}
              dangerouslySetInnerHTML={{
                __html: line === "" ? "&nbsp;" : processEscapeSequences(line),
              }}
            />
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center relative bottom-1"
        style={{ opacity: isCommandRunning ? 0 : 1 }}
      >
        <span
          style={{
            fontFamily: "monospace",
            color: theme.colors.foreground,
          }}
        >
          {isWaitingForInput ? inputPrompt : `${currentPath}>`}
        </span>
        <input
          ref={inputRef}
          className="bg-transparent outline-none flex-1 @lg/appwindow:text-[16px] text-xs"
          style={{
            fontFamily: "monospace",
            caretShape: "block",
            color: theme.colors.foreground,
          }}
          type={isPasswordInput ? "password" : "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalWindow;
