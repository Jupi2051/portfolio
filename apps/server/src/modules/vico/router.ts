import { router } from "@/lib/trpc"
import getVicoSketchList from "./list"
import getVicoSketchListUnapproved from "./list-unapproved"
import toggleSketchApproval from "./approve"
import deleteVicoSketch from "./delete"
import cropSketchImage from "./crop-sketch-image"

export const vicoRouter = router({
  list: getVicoSketchList,
  listUnapproved: getVicoSketchListUnapproved,
  approve: toggleSketchApproval,
  delete: deleteVicoSketch,
  cropSketchImage,
})
