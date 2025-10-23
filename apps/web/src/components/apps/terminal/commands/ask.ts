import { CommandFunction } from "./types";

const ask: CommandFunction = async (
  outputToTerminal,
  readFromUser,
  terminalInfo,
  ...args
) => {
  if (args.length === 0) {
    outputToTerminal("\x1b[31mUsage: ask <question>\x1b[0m");
    outputToTerminal(
      "\x1b[36mAsk me anything and I'll give you a mystical answer!\x1b[0m"
    );
    outputToTerminal("\x1b[33mExample: ask Will I have a great day?\x1b[0m");
    return;
  }

  const question = args.join(" ");

  // Mystical responses
  const responses = [
    // Positive responses
    { text: "It is certain.", type: "positive" },
    { text: "It is decidedly so.", type: "positive" },
    { text: "Without a doubt.", type: "positive" },
    { text: "Yes definitely.", type: "positive" },
    { text: "You may rely on it.", type: "positive" },
    { text: "As I see it, yes.", type: "positive" },
    { text: "Most likely.", type: "positive" },
    { text: "Outlook good.", type: "positive" },
    { text: "Yes.", type: "positive" },
    { text: "Signs point to yes.", type: "positive" },

    // Neutral responses
    { text: "Reply hazy, try again.", type: "neutral" },
    { text: "Ask again later.", type: "neutral" },
    { text: "Better not tell you now.", type: "neutral" },
    { text: "Cannot predict now.", type: "neutral" },
    { text: "Concentrate and ask again.", type: "neutral" },

    // Negative responses
    { text: "Don't count on it.", type: "negative" },
    { text: "My reply is no.", type: "negative" },
    { text: "My sources say no.", type: "negative" },
    { text: "Outlook not so good.", type: "negative" },
    { text: "Very doubtful.", type: "negative" },
  ];

  // Select random response
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  outputToTerminal("");
  // Show the question
  outputToTerminal(
    `\x1b[33m❓ Your question:\x1b[0m \x1b[37m${question}\x1b[0m`
  );
  outputToTerminal("");

  // Show the answer with appropriate color
  let answerColor = "\x1b[37m"; // Default white
  let answerEmoji = "🔮";

  switch (randomResponse.type) {
    case "positive":
      answerColor = "\x1b[32m"; // Green
      answerEmoji = "✅";
      break;
    case "negative":
      answerColor = "\x1b[31m"; // Red
      answerEmoji = "❌";
      break;
    case "neutral":
      answerColor = "\x1b[33m"; // Yellow
      answerEmoji = "🤔";
      break;
  }

  outputToTerminal(
    `${answerEmoji} \x1b[36mAnswer:\x1b[0m ${answerColor}${randomResponse.text}\x1b[0m`
  );

  outputToTerminal("");
};

export default ask;
