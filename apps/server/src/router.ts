import { publicProcedure, router } from "./trpc";
import { blogRouter } from "./modules/blog/router";

export const appRouter = router({
  blog: blogRouter,
  dada: publicProcedure.query(() => {
    return {
      id: "1",
      title: "Hello",
      content: "World",
    };
  }),
});

export type AppRouter = typeof appRouter;
