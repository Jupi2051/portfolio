import { router } from "@/lib/trpc";
import ping from "./ping";
import uptime from "./uptime";

export const terminalRouter = router({
  ping,
  uptime,
});
