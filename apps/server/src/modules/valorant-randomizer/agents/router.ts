import { router } from "@/lib/trpc"
import list from "./list"
import sync from "./sync"

export const valorantAgentsRouter = router({
  list,
  sync,
})
