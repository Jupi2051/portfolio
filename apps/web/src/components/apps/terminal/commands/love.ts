import { CommandFunction } from "./types";

const love: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  // Check if a name was provided
  if (args.length === 0) {
    outputToTerminal("\x1b[31m❌ Error: Please provide a name!\x1b[0m");
    outputToTerminal("\x1b[36mUsage: love [name]\x1b[0m");
    outputToTerminal("\x1b[33mExample: love Sarah\x1b[0m");
    return;
  }

  const name = args.join(" ").trim();

  // Special case for jupi - 1000% love!
  if (name.toLowerCase() === "jupi") {
    const compatibility = 1000;

    // ASCII art heart
    outputToTerminal("\x1b[36m┌──────────────────────────────────┐\x1b[0m");
    outputToTerminal(
      "\x1b[36m│\x1b[0m \x1b[31m💕 LOVE COMPATIBILITY TESTER 💕 \x1b[0m \x1b[36m│\x1b[0m"
    );
    outputToTerminal("\x1b[36m└──────────────────────────────────┘\x1b[0m");
    outputToTerminal("");

    // Special message for jupi
    outputToTerminal(
      `\x1b[31m❤️ ${compatibility}% compatibility between you and \x1b[33m${name}\x1b[31m!\x1b[0m`
    );
    outputToTerminal("\x1b[32m🎉 I LOVE YOU TOO! :> 🎉\x1b[0m");
    outputToTerminal("");
    outputToTerminal("\x1b[32m🌟 YOU ARE ABSOLUTELY THE BEST! 🌟\x1b[0m");
    outputToTerminal("\x1b[32m✨ 1000% LOVE OVERFLOW! ✨\x1b[0m");
    outputToTerminal("\x1b[32m💖 PERFECT BEYOND PERFECTION! 💖\x1b[0m");
    outputToTerminal("\x1b[32m🎉 THE MOST AMAZING PERSON EVER! 🎉\x1b[0m");

    // Special progress bar for 1000%
    const barLength = 30;
    const bar = "█".repeat(barLength);
    outputToTerminal(`[\x1b[32m${bar}\x1b[0m] ${compatibility}%`);
    outputToTerminal("");
    outputToTerminal(
      "\x1b[35m💌 Disclaimer: This is just for fun! Real love is much more complex! 💌\x1b[0m"
    );
    return;
  }

  // Generate a random compatibility percentage (50/50 chance of good/bad)
  const compatibility =
    Math.random() < 0.5
      ? Math.floor(Math.random() * 50) + 1
      : Math.floor(Math.random() * 50) + 50;

  // ASCII art heart
  outputToTerminal("\x1b[36m┌──────────────────────────────────┐\x1b[0m");
  outputToTerminal(
    "\x1b[36m│\x1b[0m \x1b[31m💕 LOVE COMPATIBILITY TESTER 💕 \x1b[0m \x1b[36m│\x1b[0m"
  );
  outputToTerminal("\x1b[36m└──────────────────────────────────┘\x1b[0m");
  outputToTerminal("");

  // Main compatibility message
  outputToTerminal(
    `\x1b[31m❤️ ${compatibility}% compatibility between you and \x1b[33m${name}\x1b[31m!\x1b[0m`
  );
  outputToTerminal("");

  // Messages based on compatibility
  const positiveMessages = [
    "\x1b[32m✨ Perfect match! You two are meant to be! ✨\x1b[0m",
    "\x1b[32mTrue love detected! Cupid's arrow has struck!\x1b[0m",
    "\x1b[32m🌟 Soulmates alert! The stars have aligned! 🌟\x1b[0m",
    "\x1b[32mLove at first sight! This is destiny!\x1b[0m",
    "\x1b[32m🎯 Bullseye! You've found your perfect match! 🎯\x1b[0m",
    "\x1b[32mRainbow connection! Pure magic between you!\x1b[0m",
    "\x1b[32m🦄 Unicorn-level compatibility! This is rare! 🦄\x1b[0m",
    "\x1b[32mRomeo and Juliet have nothing on you two!\x1b[0m",
  ];

  const negativeMessages = [
    "\x1b[31m💔 Ouch! This might be a rough one... 💔\x1b[0m",
    "\x1b[31mMaybe stick to being friends?\x1b[0m",
    "\x1b[31m🔥 Sparks? More like sparks flying in the wrong direction! 🔥\x1b[0m",
    "\x1b[31mThis ship might not sail very far...\x1b[0m",
    "\x1b[31m💀 RIP to this potential relationship 💀\x1b[0m",
    "\x1b[31mThe chemistry lab called - they want their experiment back!\x1b[0m",
    "\x1b[31m🚨 Warning: High risk of awkwardness detected! 🚨\x1b[0m",
    "\x1b[31mThis compatibility is running on empty!\x1b[0m",
  ];

  const messages = compatibility >= 50 ? positiveMessages : negativeMessages;

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  outputToTerminal(randomMessage);
  outputToTerminal("");

  // Progress bar
  const barLength = 30;
  const filledLength = Math.round((compatibility / 100) * barLength);
  const barColor = compatibility >= 50 ? "\x1b[32m" : "\x1b[31m"; // Green for good, red for bad
  const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);
  outputToTerminal(`[${barColor}${bar}\x1b[0m] ${compatibility}%`);
  outputToTerminal("");
  outputToTerminal(
    "\x1b[35m💌 Disclaimer: This is just for fun! Real love is much more complex! 💌\x1b[0m"
  );
};

export default love;
