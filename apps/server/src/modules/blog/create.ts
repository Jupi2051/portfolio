import { publicProcedure } from "@/lib/trpc";
import { z } from "zod";

const createArticle = publicProcedure
  .input(
    z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      published: z.boolean().default(false),
      description: z.string().min(1),
      authorName: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const post = await ctx.prisma.blogPost.create({
      data: {
        description: input.description,
        title: input.title,
        content: input.content,
        published: input.published,
      },
    });

    console.log("THIS BLOG IS ON FIREE");

    return post;
  });

export default createArticle;
