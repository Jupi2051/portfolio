import { Command } from "./types";
import help from "./help";
import about from "./about";
import projects from "./projects";
import colors from "./colors";
import clear from "./clear";
import echo from "./echo";
import ask from "./ask";
import password from "./password";
import pwd from "./pwd";
import neofetch from "./neofetch";
import reboot from "./reboot";
import rm from "./rm";
import rainbow from "./rainbow";
import toast from "./toast";
import ping from "./ping";
import theme from "./theme";

const commands: Command[] = [
  { name: ["neofetch", "fetch", "info"], execute: neofetch },
  { name: ["help", "h", "?"], execute: help },
  { name: ["about", "info"], execute: about },
  { name: ["projects", "proj", "work"], execute: projects },
  { name: ["colors", "color"], execute: colors },
  { name: ["clear", "cls"], execute: clear },
  { name: ["echo", "print"], execute: echo },
  { name: ["ask", "question"], execute: ask },
  { name: ["password", "pass"], execute: password },
  { name: ["pwd", "currentdir"], execute: pwd },
  { name: ["reboot", "restart", "reload"], execute: reboot },
  { name: ["rm", "remove"], execute: rm },
  { name: ["rainbow", "rainbowtext", "gaytext", "gay"], execute: rainbow },
  { name: ["toast", "notify", "notification"], execute: toast },
  { name: ["ping", "pong"], execute: ping },
  { name: ["theme", "themes"], execute: theme },
];

export default commands;
