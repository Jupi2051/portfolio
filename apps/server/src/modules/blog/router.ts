import { publicProcedure, router } from "@/trpc";
import createArticle from "./create";
import getArticle from "./get";

export const blogRouter = router({
  createArticle: createArticle,
  getArticle: getArticle,
  dada: publicProcedure.query(() => {
    return {
      id: "1",
      title: "Hello",
      content: "World",
    };
  }),
});
