import { router } from "@/lib/trpc"
import getControlsOverview from "./overview"

export const controlsRouter = router({
  overview: getControlsOverview,
})
