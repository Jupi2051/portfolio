import { router } from "@/lib/trpc";
import ping from "./ping";
import uptime from "./uptime";
import advice from "./advice";
import insult from "./insult";
import joke from "./joke";

export const terminalRouter = router({
  ping,
  uptime,
  advice,
  insult,
  joke,
});
