import { CommandFunction } from "./types";

const rainbow: CommandFunction = (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  // Join all arguments to get the text to rainbowify
  const text = args.join(" ");

  // If no text provided, show usage
  if (!text.trim()) {
    outputToTerminal("Usage: rainbow <text>");
    outputToTerminal("Example: rainbow Hello World");
    return;
  }

  // Catppuccin Frappe rainbow colors (RGB values)
  const colors = [
    "\x1b[38;2;231;130;132m", // Red
    "\x1b[38;2;239;159;118m", // Peach
    "\x1b[38;2;229;200;144m", // Yellow
    "\x1b[38;2;166;209;137m", // Green
    "\x1b[38;2;153;209;219m", // Sky
    "\x1b[38;2;140;170;238m", // Blue
    "\x1b[38;2;202;158;230m", // Mauve
    "\x1b[38;2;244;184;228m", // Pink
  ];

  const resetColor = "\x1b[0m";

  // Apply rainbow colors to each character
  let rainbowText = "";
  for (let i = 0; i < text.length; i++) {
    const colorIndex = i % colors.length;
    rainbowText += colors[colorIndex] + text[i] + resetColor;
  }

  outputToTerminal(rainbowText);
};

export default rainbow;
