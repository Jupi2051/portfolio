import { router } from "@/lib/trpc"
import getVicoSketchList from "./list"
import getVicoSketchListUnapproved from "./list-unapproved"
import toggleSketchApproval from "./approve"

export const vicoRouter = router({
  list: getVicoSketchList,
  listUnapproved: getVicoSketchListUnapproved,
  approve: toggleSketchApproval,
})
