import { router } from "@/lib/trpc"
import listActive from "./list-active"
import listAll from "./list-all"
import add from "./add"
import refresh from "./refresh"
import update from "./update"
import remove from "./remove"

export const rivalsPlayersRouter = router({
  listActive,
  listAll,
  add,
  refresh,
  update,
  remove,
})
