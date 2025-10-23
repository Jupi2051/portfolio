import React, { useRef, useCallback, useEffect, useState } from "react";
import { getTheme } from "./themes";
import { useResizeObserver } from "usehooks-ts";
import { parseAnsiToTextLines } from "./utils";

interface LinkBounds {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
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
  const theme = getTheme(currentTheme);
  const [linkBounds, setLinkBounds] = useState<LinkBounds[]>([]);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // URL detection regex - only detect URLs with http:// or https://
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const detectUrls = useCallback(
    (text: string): Array<{ url: string; start: number; end: number }> => {
      const urls: Array<{ url: string; start: number; end: number }> = [];
      let match;

      while ((match = urlRegex.exec(text)) !== null) {
        const url = match[0];
        urls.push({
          url,
          start: match.index,
          end: match.index + match[0].length,
        });
      }

      return urls;
    },
    []
  );

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    const lineHeight = fontSize * 1;
    const charWidth = fontSize * 0.55;
    const padding = 24;
    const container = containerRef.current;
    if (!container) return;
    const containerWidth = container.clientWidth;

    if (containerWidth <= 0) {
      return;
    }

    const availableTextWidth = Math.max(0, containerWidth - padding * 2);
    const maxCharsPerLine = Math.max(
      1,
      Math.floor(availableTextWidth / charWidth)
    );
    const canvasWidth = containerWidth;
    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.style.width = `${canvasWidth}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";
    let totalContentHeight = 0;
    for (let i = 0; i < history.length; i++) {
      const line = history[i];
      if (line === undefined) continue;
      const parsedLines = parseAnsiToTextLines(line, theme.colors);
      for (const parsedLine of parsedLines) {
        const textLength = parsedLine.text.length;
        const wrappedLines = Math.ceil(textLength / maxCharsPerLine) || 1;
        totalContentHeight += wrappedLines * lineHeight;
      }
    }
    const canvasHeight = totalContentHeight + padding;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.height = `${canvasHeight}px`;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    let y = padding;
    const newLinkBounds: LinkBounds[] = [];

    for (let i = 0; i < history.length; i++) {
      const line = history[i];
      if (line === undefined) continue;
      const parsedLines = parseAnsiToTextLines(line, theme.colors);

      for (const parsedLine of parsedLines) {
        const text = parsedLine.text;
        const urls = detectUrls(text);
        let textStart = 0;

        while (textStart < text.length && maxCharsPerLine > 0) {
          const textEnd = Math.min(textStart + maxCharsPerLine, text.length);

          if (textEnd <= textStart) {
            break;
          }

          const textChunk = text.substring(textStart, textEnd);
          let x = padding;

          for (const style of parsedLine.styles) {
            const styleStart = Math.max(style.start, textStart);
            const styleEnd = Math.min(style.end, textEnd);
            if (styleStart < styleEnd) {
              const segmentStart = styleStart - textStart;
              const segmentEnd = styleEnd - textStart;
              const textSegment = textChunk.substring(segmentStart, segmentEnd);

              // Check if this segment contains any part of a URL
              const segmentUrls = urls.filter(
                (url) =>
                  // URL starts in this segment
                  (url.start >= styleStart && url.start < styleEnd) ||
                  // URL ends in this segment
                  (url.end > styleStart && url.end <= styleEnd) ||
                  // URL spans across this segment
                  (url.start < styleStart && url.end > styleEnd)
              );

              if (segmentUrls.length > 0) {
                // This segment contains part of a URL, render it as a link
                const linkUrl = segmentUrls[0].url;
                const isHovered = hoveredLink === linkUrl;

                if (style.backgroundColor) {
                  ctx.fillStyle = style.backgroundColor;
                  ctx.fillRect(
                    x,
                    y,
                    textSegment.length * charWidth,
                    lineHeight
                  );
                }

                // Use blue color for links, or cyan if hovered
                ctx.fillStyle = isHovered
                  ? theme.colors.cyan
                  : theme.colors.blue;
                ctx.font = `${
                  style.bold ? "bold" : "normal"
                } ${fontSize}px monospace`;
                ctx.fillText(textSegment, x, y);

                // Always underline links (override any existing underline)
                ctx.strokeStyle = isHovered
                  ? theme.colors.cyan
                  : theme.colors.blue;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, y + lineHeight - 8);
                ctx.lineTo(
                  x + textSegment.length * charWidth,
                  y + lineHeight - 8
                );
                ctx.stroke();

                // Track link bounds for click detection (in CSS coordinates)
                // Adjust y position to better match the visual text area
                newLinkBounds.push({
                  url: linkUrl,
                  x: x,
                  y: y - 6, // Shift up more to better align with text
                  width: textSegment.length * charWidth,
                  height: lineHeight + 2, // Minimal height adjustment
                });
              } else {
                // Regular text rendering
                if (style.backgroundColor) {
                  ctx.fillStyle = style.backgroundColor;
                  ctx.fillRect(
                    x,
                    y,
                    textSegment.length * charWidth,
                    lineHeight
                  );
                }
                ctx.fillStyle = style.color || theme.colors.foreground;
                ctx.font = `${
                  style.bold ? "bold" : "normal"
                } ${fontSize}px monospace`;
                ctx.fillText(textSegment, x, y);
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
              }
              x += textSegment.length * charWidth;
            }
          }
          y += lineHeight;
          textStart = textEnd;
        }
      }
    }

    setLinkBounds(newLinkBounds);
  }, [history, currentTheme, hoveredLink, detectUrls]);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if click is on a link (with small padding for easier clicking)
      for (const link of linkBounds) {
        const padding = 2;
        if (
          x >= link.x - padding &&
          x <= link.x + link.width + padding &&
          y >= link.y - padding &&
          y <= link.y + link.height + padding
        ) {
          window.open(link.url, "_blank", "noopener,noreferrer");
          return;
        }
      }
    },
    [linkBounds]
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let foundLink: string | null = null;

      // Check if mouse is over any link segment (with small padding for easier hovering)
      for (const link of linkBounds) {
        const padding = 2;
        if (
          x >= link.x - padding &&
          x <= link.x + link.width + padding &&
          y >= link.y - padding &&
          y <= link.y + link.height + padding
        ) {
          foundLink = link.url;
          break;
        }
      }

      if (foundLink !== hoveredLink) {
        setHoveredLink(foundLink);
        // Change cursor style
        canvas.style.cursor = foundLink ? "pointer" : "text";
        // Force redraw to update hover state for all segments of the same URL
        drawCanvas();
      }
    },
    [linkBounds, hoveredLink, drawCanvas]
  );

  const handleCanvasMouseLeave = useCallback(() => {
    setHoveredLink(null);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = "text";
    }
    // Force redraw to remove hover state from all link segments
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    window.addEventListener("resize", drawCanvas);
    return () => window.removeEventListener("resize", drawCanvas);
  }, [drawCanvas]);

  useResizeObserver({
    ref: containerRef,
    onResize: () => {
      if (!canvasRef.current) return;
      drawCanvas();
    },
  });

  return (
    <div ref={containerRef} style={{ width: "100%", height: "auto" }}>
      <canvas
        ref={canvasRef}
        className="cursor-text"
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          minHeight: "auto",
          maxHeight: "none",
        }}
      />
    </div>
  );
};

export default TerminalRenderer;
