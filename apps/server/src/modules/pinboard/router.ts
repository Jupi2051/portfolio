import { router } from "@/lib/trpc";
import createPinnedMessage from "./create";
import getPinnedMessageList from "./get-list";

export const pinboardRouter = router({
  createPinnedMessage,
  getPinnedMessageList,
});
