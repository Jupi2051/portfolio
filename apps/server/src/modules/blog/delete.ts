import { publicProcedure } from "@/lib/trpc";
import { z } from "zod";

const deleteArticle = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const posts = await ctx.prisma.blogPost.delete({
        where: { id: input.id },
      });

      return posts;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

export default deleteArticle;
