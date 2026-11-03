import React, { useEffect } from "react";
import { getTheme } from "./themes";
import { TerminalProps } from "./index";

const MAX_HISTORY_LINES = 50;

const TerminalTextBased: React.FC<TerminalProps> = ({
  history = [],
  input = "",
  currentPath = "C:\\Users\\Jupi",
  sessionStartTime = Date.now(),
  isWaitingForInput = false,
  inputPrompt = "",
  pendingResolve = null,
  shouldDeleteOutputMessage = false,
  isPasswordInput = false,
  isCommandRunning = false,
  commandQueue = [],
  commandHistory = [],
  historyIndex = -1,
  currentTheme = "default",
  onHistoryChange,
  onInputChange,
  onCurrentPathChange,
  onSessionStartTimeChange,
  onIsWaitingForInputChange,
  onInputPromptChange,
  onPendingResolveChange,
  onShouldDeleteOutputMessageChange,
  onIsPasswordInputChange,
  onIsCommandRunningChange,
  onCommandQueueChange,
  onCommandHistoryChange,
  onHistoryIndexChange,
  onCurrentThemeChange,
  inputRef,
  terminalRef,
  onTerminalClick,
  onKeyDown,
  onSubmit,
  onScrollToBottom,
}) => {
  useEffect(() => {
    if (!isCommandRunning && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isCommandRunning]);

  const handleTerminalClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }

    onTerminalClick?.(e);
  };

  const handleTerminalContextMenu = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      e.preventDefault();

      navigator.clipboard
        .writeText(selection.toString())
        .then(() => {
          selection.removeAllRanges();

          if (inputRef?.current) {
            inputRef.current.focus();
          }
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Call the parent's keyDown handler
    onKeyDown?.(e);
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
      "\x1b[5m": '<span class="animate-blink">',
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

  const theme = getTheme(currentTheme);

  // Theme colours flow in as CSS variables so selection, links and the
  // scrollbar can be styled with Tailwind instead of an injected <style> tag.
  const themeVars = {
    "--term-bg": theme.colors.background,
    "--term-fg": theme.colors.foreground,
    "--term-selection": theme.colors.selection,
    "--term-selection-text": theme.colors.selectionText,
    "--term-link": theme.colors.link,
    "--term-link-hover": theme.colors.linkHover,
    "--term-scrollbar": theme.colors.scrollbar,
    "--term-prompt": theme.colors.blue,
    "--term-muted": theme.colors.gray,
  } as React.CSSProperties;

  return (
    <div
      ref={terminalRef}
      className={[
        "h-full w-full overflow-y-auto [background:var(--term-bg)] px-4 py-3.5 font-mono text-[13px] leading-5 text-(--term-fg) @lg/appwindow:px-5 @lg/appwindow:py-4.5",
        "selection:bg-(--term-selection) selection:text-(--term-selection-text) **:selection:bg-(--term-selection) **:selection:text-(--term-selection-text)",
        "[&_a]:cursor-pointer [&_a]:text-(--term-link)! [&_a]:underline [&_a:hover]:text-(--term-link-hover)!",
        "[scrollbar-color:var(--term-scrollbar)_transparent] scrollbar-thin",
      ].join(" ")}
      style={themeVars}
      onClick={handleTerminalClick}
      onContextMenu={handleTerminalContextMenu}
    >
      <div className="wrap-break-word whitespace-pre-wrap">
        {history.slice(-MAX_HISTORY_LINES).map((line, i) => (
          <div
            key={i}
            dangerouslySetInnerHTML={{
              __html: line === "" ? "&nbsp;" : processEscapeSequences(line),
            }}
          />
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2"
        style={{ opacity: isCommandRunning && !isWaitingForInput ? 0 : 1 }}
      >
        {isWaitingForInput ? (
          inputPrompt && <span>{inputPrompt}</span>
        ) : (
          <span className="shrink-0 whitespace-pre">
            <span className="text-(--term-prompt)">jupi@desk</span>{" "}
            <span className="text-(--term-muted)">~ $</span>
          </span>
        )}
        <input
          ref={inputRef}
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent text-(--term-fg) caret-melon outline-none [caret-shape:block]"
          type={isPasswordInput ? "password" : "text"}
          value={input}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalTextBased;
