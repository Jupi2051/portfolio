import { router } from "./lib/trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { blogRouter } from "./modules/blog/router";
import { pinboardRouter } from "./modules/pinboard/router";
import { usersRouter } from "./modules/users/router";

export const appRouter = router({
  blog: blogRouter,
  pinboard: pinboardRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;
