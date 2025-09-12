import { publicProcedure } from "@/trpc";
import { z } from "zod";

const getArticle = publicProcedure
  .input(z.object({ id: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    if (input.id) {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
        include: { author: true },
      });
      return post;
    }
    
    const posts = await ctx.prisma.post.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
    
    return posts;
  });

export default getArticle;
