import { router } from "@/lib/trpc";
import ping from "./ping";

export const terminalRouter = router({
  ping,
});
