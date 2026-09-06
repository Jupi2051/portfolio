import { router } from "@/lib/trpc"
import list from "./list"
import sync from "./sync"

export const rivalsHeroesRouter = router({
  list,
  sync,
})
