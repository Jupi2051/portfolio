import { publicProcedure } from "@/lib/trpc";

const getArticle = publicProcedure.query(async ({ ctx }) => {
  const posts = await ctx.prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return posts;
});

export default getArticle;
