import { router } from "@/lib/trpc"
import listActive from "./list-active"
import listAll from "./list-all"
import add from "./add"
import refresh from "./refresh"
import refreshAll from "./refresh-all"
import update from "./update"
import remove from "./remove"

export const valorantPlayersRouter = router({
  listActive,
  listAll,
  add,
  refresh,
  refreshAll,
  update,
  remove,
})
