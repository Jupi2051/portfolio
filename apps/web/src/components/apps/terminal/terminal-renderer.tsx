import React, { useRef, useCallback, useEffect } from "react";
import { getTheme } from "./themes";
import { useResizeObserver } from "usehooks-ts";

interface TextLine {
  text: string;
  styles: TextStyle[];
}

interface TextStyle {
  start: number;
  end: number;
  color?: string;
  backgroundColor?: string;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
}

interface TerminalRendererProps {
  history: string[];
  currentTheme: string;
}

const TerminalRenderer: React.FC<TerminalRendererProps> = ({
  history,
  currentTheme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Canvas rendering functions
  const parseAnsiToTextLines = useCallback(
    (text: string): TextLine[] => {
      const theme = getTheme(currentTheme);
      const lines = text.split("\n");
      const parsedLines: TextLine[] = [];

      for (const line of lines) {
        const styles: TextStyle[] = [];
        let currentColor = theme.colors.foreground;
        let currentBgColor: string | undefined = undefined; // Don't set default background
        let currentBold = false;
        let currentUnderline = false;
        let currentItalic = false;

        // Process ANSI escape sequences including RGB colors
        const escapeMap: { [key: string]: () => void } = {
          "\x1b[0m": () => {
            currentColor = theme.colors.foreground;
            currentBgColor = undefined;
            currentBold = false;
            currentUnderline = false;
            currentItalic = false;
          },
          "\x1b[1m": () => {
            currentBold = true;
          },
          "\x1b[2m": () => {
            /* dim - not implemented */
          },
          "\x1b[4m": () => {
            currentUnderline = true;
          },
          "\x1b[5m": () => {
            /* blink - not implemented */
          },
          "\x1b[7m": () => {
            /* reverse - not implemented */
          },
          "\x1b[8m": () => {
            currentColor = theme.colors.background;
          },
          "\x1b[30m": () => {
            currentColor = theme.colors.black;
          },
          "\x1b[31m": () => {
            currentColor = theme.colors.red;
          },
          "\x1b[32m": () => {
            currentColor = theme.colors.green;
          },
          "\x1b[33m": () => {
            currentColor = theme.colors.yellow;
          },
          "\x1b[34m": () => {
            currentColor = theme.colors.blue;
          },
          "\x1b[35m": () => {
            currentColor = theme.colors.magenta;
          },
          "\x1b[36m": () => {
            currentColor = theme.colors.cyan;
          },
          "\x1b[37m": () => {
            currentColor = theme.colors.white;
          },
          "\x1b[90m": () => {
            currentColor = theme.colors.gray;
          },
          "\x1b[40m": () => {
            currentBgColor = theme.colors.bgBlack;
          },
          "\x1b[41m": () => {
            currentBgColor = theme.colors.bgRed;
          },
          "\x1b[42m": () => {
            currentBgColor = theme.colors.bgGreen;
          },
          "\x1b[43m": () => {
            currentBgColor = theme.colors.bgYellow;
          },
          "\x1b[44m": () => {
            currentBgColor = theme.colors.bgBlue;
          },
          "\x1b[45m": () => {
            currentBgColor = theme.colors.bgMagenta;
          },
          "\x1b[46m": () => {
            currentBgColor = theme.colors.bgCyan;
          },
          "\x1b[47m": () => {
            currentBgColor = theme.colors.bgWhite;
          },
          "\x1b[100m": () => {
            currentBgColor = theme.colors.bgGray;
          },
        };

        // Add RGB color handlers dynamically
        const addRgbHandler = (
          r: number,
          g: number,
          b: number,
          isBackground: boolean = false
        ) => {
          const escape = `\x1b[${isBackground ? "48" : "38"};2;${r};${g};${b}m`;
          escapeMap[escape] = () => {
            if (isBackground) {
              currentBgColor = `rgb(${r}, ${g}, ${b})`;
            } else {
              currentColor = `rgb(${r}, ${g}, ${b})`;
            }
          };
        };

        // Process escape sequences sequentially
        let cleanText = "";
        let lastStyleEnd = 0;

        // Find all escape sequences and their positions (including RGB colors)
        const escapeRegex = /\x1b\[[0-9;]*m/g;
        let match;
        const escapeMatches: Array<{ match: RegExpExecArray; escape: string }> =
          [];

        while ((match = escapeRegex.exec(line)) !== null) {
          const escape = match[0];

          // Handle RGB colors by adding them to escapeMap dynamically
          const rgbMatch = escape.match(/\x1b\[(38|48);2;(\d+);(\d+);(\d+)m/);
          if (rgbMatch) {
            const isBackground = rgbMatch[1] === "48";
            const r = parseInt(rgbMatch[2]);
            const g = parseInt(rgbMatch[3]);
            const b = parseInt(rgbMatch[4]);
            addRgbHandler(r, g, b, isBackground);
          }

          escapeMatches.push({ match, escape });
        }

        // Process text and escape sequences in order
        let textPos = 0;
        for (const { match, escape } of escapeMatches) {
          // Add text before this escape sequence
          if (match.index > textPos) {
            const textSegment = line.substring(textPos, match.index);
            cleanText += textSegment;

            // Add style for this text segment
            if (textSegment.length > 0) {
              styles.push({
                start: lastStyleEnd,
                end: lastStyleEnd + textSegment.length,
                color: currentColor,
                backgroundColor: currentBgColor,
                bold: currentBold,
                underline: currentUnderline,
                italic: currentItalic,
              });
              lastStyleEnd += textSegment.length;
            }
          }

          // Apply the escape sequence
          if (escapeMap[escape]) {
            escapeMap[escape]();
          }

          textPos = match.index + match[0].length;
        }

        // Add remaining text
        if (textPos < line.length) {
          const remainingText = line.substring(textPos);
          cleanText += remainingText;

          if (remainingText.length > 0) {
            styles.push({
              start: lastStyleEnd,
              end: lastStyleEnd + remainingText.length,
              color: currentColor,
              backgroundColor: currentBgColor,
              bold: currentBold,
              underline: currentUnderline,
              italic: currentItalic,
            });
          }
        }

        parsedLines.push({
          text: cleanText || " ",
          styles:
            styles.length > 0
              ? styles
              : [
                  {
                    start: 0,
                    end: cleanText.length || 1,
                    color: theme.colors.foreground,
                    backgroundColor: undefined,
                  },
                ],
        });
      }

      return parsedLines;
    },
    [currentTheme]
  );

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const theme = getTheme(currentTheme);
    const fontSize = 16;
    const lineHeight = fontSize * 1; // Reduce line spacing for tighter packing
    const charWidth = fontSize * 0.55; // Approximate monospace character width
    const padding = 24;

    // Get container from ref
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;

    // Calculate available width for text (container width minus padding on both sides)
    const availableTextWidth = containerWidth - padding * 2;
    const maxCharsPerLine = Math.floor(availableTextWidth / charWidth);

    // Set canvas size - always fit parent width
    const canvasWidth = containerWidth;

    // Set canvas size first so we can measure text properly
    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.style.width = `${canvasWidth}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set font for text measurements
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    // Calculate total content height by processing all lines
    let totalContentHeight = 0; // Start with no padding

    // Process all history lines to calculate total height
    for (let i = 0; i < history.length; i++) {
      const line = history[i];
      if (line === undefined) continue;

      const parsedLines = parseAnsiToTextLines(line);

      for (const parsedLine of parsedLines) {
        // Calculate how many lines this text will need when wrapped
        const textLength = parsedLine.text.length;
        const wrappedLines = Math.ceil(textLength / maxCharsPerLine) || 1;
        totalContentHeight += wrappedLines * lineHeight;
      }
    }

    // No bottom padding needed

    // Set final canvas height (only add top padding, no bottom padding)
    const canvasHeight = totalContentHeight + padding;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.height = `${canvasHeight}px`;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Start drawing from the top
    let y = padding;

    // Draw all history lines with text wrapping
    for (let i = 0; i < history.length; i++) {
      const line = history[i];
      if (line === undefined) continue;

      const parsedLines = parseAnsiToTextLines(line);

      for (const parsedLine of parsedLines) {
        const text = parsedLine.text;

        // Split text into chunks that fit within the available width
        let textStart = 0;
        while (textStart < text.length) {
          const textEnd = Math.min(textStart + maxCharsPerLine, text.length);
          const textChunk = text.substring(textStart, textEnd);

          let x = padding;

          // Find styles that apply to this chunk
          for (const style of parsedLine.styles) {
            const styleStart = Math.max(style.start, textStart);
            const styleEnd = Math.min(style.end, textEnd);

            if (styleStart < styleEnd) {
              const segmentStart = styleStart - textStart;
              const segmentEnd = styleEnd - textStart;
              const textSegment = textChunk.substring(segmentStart, segmentEnd);

              // Draw background if specified
              if (style.backgroundColor) {
                ctx.fillStyle = style.backgroundColor;
                ctx.fillRect(x, y, textSegment.length * charWidth, lineHeight);
              }

              // Set text style and draw text
              ctx.fillStyle = style.color || theme.colors.foreground;
              ctx.font = `${
                style.bold ? "bold" : "normal"
              } ${fontSize}px monospace`;
              ctx.fillText(textSegment, x, y);

              // Draw underline if needed
              if (style.underline) {
                ctx.strokeStyle = style.color || theme.colors.foreground;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, y + lineHeight - 2);
                ctx.lineTo(
                  x + textSegment.length * charWidth,
                  y + lineHeight - 2
                );
                ctx.stroke();
              }

              x += textSegment.length * charWidth;
            }
          }

          y += lineHeight;
          textStart = textEnd;
        }
      }
    }
  }, [history, currentTheme, parseAnsiToTextLines]);

  // Redraw canvas when dependencies change
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Small delay to ensure the canvas element has updated dimensions
      setTimeout(() => {
        drawCanvas();
      }, 10);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawCanvas]);

  // Use ResizeObserver on the container to detect size changes
  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      if (!canvasRef.current) return;
      // Force a redraw when the container resizes
      setTimeout(() => {
        drawCanvas();
      }, 0);
    },
  });

  return (
    <div ref={containerRef} style={{ width: "100%", height: "auto" }}>
      <canvas
        ref={canvasRef}
        className="cursor-text"
        style={{
          display: "block",
          width: "100%", // Always fit parent width
          height: "auto", // Let height be determined by canvas.height
          minHeight: "auto",
          maxHeight: "none",
        }}
      />
    </div>
  );
};

export default TerminalRenderer;
