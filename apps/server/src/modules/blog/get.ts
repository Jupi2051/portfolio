import { publicProcedure } from "@/lib/trpc";
import { z } from "zod";

const getArticle = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const posts = await ctx.prisma.blogPost.findUnique({
      where: { id: input.id, published: true },
    });

    return posts;
  });

export default getArticle;
