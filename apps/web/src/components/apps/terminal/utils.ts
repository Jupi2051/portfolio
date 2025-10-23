import { getTheme } from "./themes";

export interface TextStyle {
  start: number;
  end: number;
  color?: string;
  backgroundColor?: string;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
}

export interface TextLine {
  text: string;
  styles: TextStyle[];
}

export interface ThemeColors {
  foreground: string;
  background: string;
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
  gray: string;
  bgBlack: string;
  bgRed: string;
  bgGreen: string;
  bgYellow: string;
  bgBlue: string;
  bgMagenta: string;
  bgCyan: string;
  bgWhite: string;
  bgGray: string;
}

export const parseAnsiToTextLines = (
  text: string,
  theme: ThemeColors
): TextLine[] => {
  const lines = text.split("\n");
  const parsedLines: TextLine[] = [];

  for (const line of lines) {
    const styles: TextStyle[] = [];
    let currentColor = theme.foreground;
    let currentBgColor: string | undefined = undefined;
    let currentBold = false;
    let currentUnderline = false;
    let currentItalic = false;

    const escapeMap: { [key: string]: () => void } = {
      "\x1b[0m": () => {
        currentColor = theme.foreground;
        currentBgColor = undefined;
        currentBold = false;
        currentUnderline = false;
        currentItalic = false;
      },
      "\x1b[1m": () => {
        currentBold = true;
      },
      "\x1b[2m": () => {},
      "\x1b[4m": () => {
        currentUnderline = true;
      },
      "\x1b[5m": () => {},
      "\x1b[7m": () => {},
      "\x1b[8m": () => {
        currentColor = theme.background;
      },
      "\x1b[30m": () => {
        currentColor = theme.black;
      },
      "\x1b[31m": () => {
        currentColor = theme.red;
      },
      "\x1b[32m": () => {
        currentColor = theme.green;
      },
      "\x1b[33m": () => {
        currentColor = theme.yellow;
      },
      "\x1b[34m": () => {
        currentColor = theme.blue;
      },
      "\x1b[35m": () => {
        currentColor = theme.magenta;
      },
      "\x1b[36m": () => {
        currentColor = theme.cyan;
      },
      "\x1b[37m": () => {
        currentColor = theme.white;
      },
      "\x1b[90m": () => {
        currentColor = theme.gray;
      },
      "\x1b[40m": () => {
        currentBgColor = theme.bgBlack;
      },
      "\x1b[41m": () => {
        currentBgColor = theme.bgRed;
      },
      "\x1b[42m": () => {
        currentBgColor = theme.bgGreen;
      },
      "\x1b[43m": () => {
        currentBgColor = theme.bgYellow;
      },
      "\x1b[44m": () => {
        currentBgColor = theme.bgBlue;
      },
      "\x1b[45m": () => {
        currentBgColor = theme.bgMagenta;
      },
      "\x1b[46m": () => {
        currentBgColor = theme.bgCyan;
      },
      "\x1b[47m": () => {
        currentBgColor = theme.bgWhite;
      },
      "\x1b[100m": () => {
        currentBgColor = theme.bgGray;
      },
    };

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

    let cleanText = "";
    let lastStyleEnd = 0;

    const escapeRegex = /\x1b\[[0-9;]*m/g;
    let match;
    const escapeMatches: Array<{ match: RegExpExecArray; escape: string }> = [];

    while ((match = escapeRegex.exec(line)) !== null) {
      const escape = match[0];

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

    let textPos = 0;
    for (const { match, escape } of escapeMatches) {
      if (match.index > textPos) {
        const textSegment = line.substring(textPos, match.index);
        cleanText += textSegment;

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

      if (escapeMap[escape]) {
        escapeMap[escape]();
      }

      textPos = match.index + match[0].length;
    }

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
                color: theme.foreground,
                backgroundColor: undefined,
              },
            ],
    });
  }

  return parsedLines;
};
