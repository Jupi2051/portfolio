import { publicProcedure, router } from "./trpc";
import { blogRouter } from "./modules/blog/router";
import { createUser, getUser, getAllUsers } from "./modules/users";

export const appRouter = router({
  blog: router({
    blogRouter,
  }),
  users: router({
    create: createUser,
    get: getUser,
    getAll: getAllUsers,
  }),
  dada: publicProcedure.query(() => {
    return {
      id: "1",
      title: "Hello",
      content: "World",
    };
  }),
});

export type AppRouter = typeof appRouter;
