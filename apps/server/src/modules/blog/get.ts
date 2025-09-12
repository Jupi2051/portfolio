import { publicProcedure } from "@/trpc";
import { z } from "zod";

const getArticle = publicProcedure.query(() => {
  return {
    id: Math.random().toString(36).slice(2, 9),
    publishedAt: new Date().toISOString(),
    tags: [],
  };
});

export default getArticle;
