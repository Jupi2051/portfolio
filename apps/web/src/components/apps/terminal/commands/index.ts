import { Command } from "./types";
import help from "./help";
import about from "./about";
import projects from "./projects";
import colors from "./colors";
import clear from "./clear";
import echo from "./echo";
import ask from "./ask";
import password from "./password";

const commands: Command[] = [
  { name: ["help", "h", "?"], execute: help },
  { name: ["about", "info"], execute: about },
  { name: ["projects", "proj", "work"], execute: projects },
  { name: ["colors", "color", "theme"], execute: colors },
  { name: ["clear", "cls"], execute: clear },
  { name: ["echo", "print"], execute: echo },
  { name: ["ask", "question"], execute: ask },
  { name: ["password", "pass", "pwd"], execute: password },
];

export default commands;
