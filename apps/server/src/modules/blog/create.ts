import { publicProcedure } from "@/trpc";
import { z } from "zod";

const createArticle = publicProcedure
  .input(
    z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      published: z.boolean().default(false),
      authorEmail: z.string().email(),
      authorName: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // Find or create the author
    let author = await ctx.prisma.user.findUnique({
      where: { email: input.authorEmail },
    });

    if (!author) {
      author = await ctx.prisma.user.create({
        data: {
          email: input.authorEmail,
          name: input.authorName || input.authorEmail.split('@')[0],
        },
      });
    }

    // Create the post
    const post = await ctx.prisma.post.create({
      data: {
        title: input.title,
        content: input.content,
        published: input.published,
        authorId: author.id,
      },
      include: { author: true },
    });

    return post;
  });

export default createArticle;
