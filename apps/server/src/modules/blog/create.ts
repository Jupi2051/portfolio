import { publicProcedure } from "@/trpc";
import { z } from "zod";

const createArticle = publicProcedure
  .input(
    z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      excerpt: z.string().optional(),
      category: z.string().default("general"),
      author: z.string().min(1),
    })
  )
  .mutation(({ input }) => {
    return {
      id: Math.random().toString(36).slice(2, 9),
      ...input,
      publishedAt: new Date().toISOString(),
      tags: [],
    };
  });

export default createArticle;
