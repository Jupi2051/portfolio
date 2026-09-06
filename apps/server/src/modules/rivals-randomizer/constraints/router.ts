import { router } from "@/lib/trpc"
import listAll from "./list-all"
import listActive from "./list-active"
import create from "./create"
import remove from "./remove"
import applySides from "./apply-sides"

export const rivalsConstraintsRouter = router({
  listAll,
  listActive,
  create,
  remove,
  applySides,
})
