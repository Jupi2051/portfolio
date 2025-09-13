import { router } from "@/lib/trpc";
import createArticle from "./create";
import getArticle from "./get";
import deleteArticle from "./delete";
import getArticleList from "./get-list";

export const blogRouter = router({
  createArticle,
  getArticle,
  deleteArticle,
  getArticleList,
});
