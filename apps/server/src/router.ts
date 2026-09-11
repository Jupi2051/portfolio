import { router } from "./lib/trpc"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { blogRouter } from "./modules/blog/router"
import { pinboardRouter } from "./modules/pinboard/router"
import { usersRouter } from "./modules/users/router"
import { terminalRouter } from "./modules/terminal/router"
import { vicoRouter } from "./modules/vico/router"
import { rivalsRandomizerRouter } from "./modules/rivals-randomizer/router"
import { valorantRandomizerRouter } from "./modules/valorant-randomizer/router"

export const appRouter = router({
  blog: blogRouter,
  pinboard: pinboardRouter,
  users: usersRouter,
  terminal: terminalRouter,
  vico: vicoRouter,
  rivalsRandomizer: rivalsRandomizerRouter,
  valorantRandomizer: valorantRandomizerRouter,
})

export type AppRouter = typeof appRouter
export type AppRouterInput = inferRouterInputs<AppRouter>
export type AppRouterOutput = inferRouterOutputs<AppRouter>
