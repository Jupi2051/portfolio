import { router } from "./lib/trpc";
import { blogRouter } from "./modules/blog/router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterInput = inferRouterInputs<AppRouter>;
export type AppRouterOutput = inferRouterOutputs<AppRouter>;
