import React, { useEffect } from "react";
import { getTheme } from "./themes";
import TerminalRenderer from "./terminal-renderer";
import { TerminalProps } from "./index";

const TerminalWindow: React.FC<TerminalProps> = ({
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "PageUp") {
      e.preventDefault();
      if (terminalRef?.current) {
        terminalRef.current.scrollTop -= 200;
      }
    } else if (e.key === "PageDown") {
      e.preventDefault();
      if (terminalRef?.current) {
        terminalRef.current.scrollTop += 200;
      }
    } else if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault();
      if (terminalRef?.current) {
        terminalRef.current.scrollTop = 0;
      }
    }

    // Call the parent's keyDown handler for other keys
    onKeyDown?.(e);
  };

  const theme = getTheme(currentTheme);

  return (
    <div
      ref={terminalRef}
      className="w-full h-full relative overflow-x-hidden overflow-y-auto pt-2"
      style={{
        background: theme.colors.background,
        minWidth: 0, // Allow shrinking below content width
      }}
      onClick={onTerminalClick}
    >
      <TerminalRenderer history={history} currentTheme={currentTheme} />

      <form
        onSubmit={onSubmit}
        className="px-6 py-0 relative bottom-[15px] min-w-0"
        style={{
          opacity: isCommandRunning && !isWaitingForInput ? 0 : 1,
        }}
      >
        <div className="flex items-center min-w-0">
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
              className="flex-1 bg-transparent outline-none font-mono text-base leading-4 min-w-0"
              style={{
                fontFamily: "monospace",
                fontSize: "16px",
                lineHeight: "16px",
                color: theme.colors.foreground,
                paddingLeft: "0",
                marginLeft: "0",
                minWidth: "0",
              }}
              type={isPasswordInput ? "password" : "text"}
              value={input}
              onChange={onInputChange}
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
