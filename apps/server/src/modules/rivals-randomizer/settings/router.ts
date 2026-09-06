import { router } from "@/lib/trpc"
import get from "./get"
import update from "./update"

export const rivalsSettingsRouter = router({
  get,
  update,
})
