import { router } from "@/lib/trpc"
import { rivalsPlayersRouter } from "./players/router"
import { rivalsConstraintsRouter } from "./constraints/router"
import { rivalsHeroesRouter } from "./heroes/router"
import { rivalsRanksRouter } from "./ranks/router"
import { rivalsSettingsRouter } from "./settings/router"

export const rivalsRandomizerRouter = router({
  players: rivalsPlayersRouter,
  constraints: rivalsConstraintsRouter,
  heroes: rivalsHeroesRouter,
  ranks: rivalsRanksRouter,
  settings: rivalsSettingsRouter,
})
