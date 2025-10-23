import { CommandFunction } from "./types";

const analyzePasswordStrength = (password: string) => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Use at least 8 characters");
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add lowercase letters");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add uppercase letters");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add numbers");
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add special characters");
  }

  if (password.length >= 16) {
    score += 1;
  }

  const commonPatterns = [
    /123|abc|qwe|asd/i,
    /password|admin|login/i,
    /111|222|333|444|555|666|777|888|999|000/,
  ];

  if (commonPatterns.some((pattern) => pattern.test(password))) {
    score -= 2;
    feedback.push("Avoid common patterns");
  }

  score = Math.max(0, Math.min(score, 7));

  let strength: string;
  let color: string;

  if (score <= 2) {
    strength = "Very Weak";
    color = "\x1b[31m";
  } else if (score <= 3) {
    strength = "Weak";
    color = "\x1b[31m";
  } else if (score <= 4) {
    strength = "Fair";
    color = "\x1b[33m";
  } else if (score <= 5) {
    strength = "Good";
    color = "\x1b[32m";
  } else {
    strength = "Strong";
    color = "\x1b[32m";
  }

  return { score, strength, color, feedback };
};

const password: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  ...args
) => {
  const password = await readFromUser(`Enter in a password:`, true, true);

  const analysis = analyzePasswordStrength(password);

  outputToTerminal(`\x1b[36mPassword Analysis:\x1b[0m`);
  outputToTerminal(`Length: ${password.length} characters`);
  outputToTerminal(
    `Strength: ${analysis.color}${analysis.strength}\x1b[0m (${analysis.score}/7)`
  );

  if (analysis.feedback.length > 0) {
    outputToTerminal(`\x1b[33mSuggestions:\x1b[0m`);
    analysis.feedback.forEach((suggestion) => {
      outputToTerminal(`  • ${suggestion}`);
    });
  } else {
    outputToTerminal(`\x1b[32m✓ Great password!\x1b[0m`);
  }
};

export default password;
