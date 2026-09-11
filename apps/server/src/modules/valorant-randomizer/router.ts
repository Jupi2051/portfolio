import { router } from "@/lib/trpc"
import { valorantPlayersRouter } from "./players/router"
import { valorantConstraintsRouter } from "./constraints/router"
import { valorantAgentsRouter } from "./agents/router"
import { valorantRanksRouter } from "./ranks/router"
import { valorantSettingsRouter } from "./settings/router"

export const valorantRandomizerRouter = router({
  players: valorantPlayersRouter,
  constraints: valorantConstraintsRouter,
  agents: valorantAgentsRouter,
  ranks: valorantRanksRouter,
  settings: valorantSettingsRouter,
})
