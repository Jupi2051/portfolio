import { router } from "@/lib/trpc";
import createArticle from "./create";
import getArticle from "./get";

export const blogRouter = router({
  createArticle,
  getArticle,
});
