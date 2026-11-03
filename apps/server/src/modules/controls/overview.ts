import { protectedProcedure } from "@/lib/trpc"

/**
 * Everything the Controls overview needs in one round-trip: what's waiting
 * for review, plus headline counts for each managed area.
 */
const getControlsOverview = protectedProcedure.query(async ({ ctx }) => {
  const [
    articleCount,
    latestArticle,
    pendingSketchCount,
    pendingSketches,
    rivalsTotal,
    rivalsActive,
    valorantTotal,
    valorantActive,
  ] = await Promise.all([
    ctx.prisma.blogPost.count({ where: { published: true, deletedAt: null } }),
    ctx.prisma.blogPost.findFirst({
      where: { published: true, deletedAt: null },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
    ctx.prisma.vicoSketch.count({ where: { approved: false, deletedAt: null } }),
    ctx.prisma.vicoSketch.findMany({
      where: { approved: false, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        author: true,
        createdAt: true,
        image: { select: { id: true } },
      },
    }),
    ctx.prisma.rivalsPlayer.count(),
    ctx.prisma.rivalsPlayer.count({ where: { isActive: true } }),
    ctx.prisma.valorantPlayer.count(),
    ctx.prisma.valorantPlayer.count({ where: { isActive: true } }),
  ])

  const newest = pendingSketches[0]

  return {
    articles: {
      count: articleCount,
      lastPublishedAt: latestArticle?.createdAt.toISOString() ?? null,
    },
    vico: {
      pendingCount: pendingSketchCount,
      newestAuthor: newest?.author ?? null,
      newestAt: newest?.createdAt.toISOString() ?? null,
      previewImageIds: pendingSketches
        .map((sketch) => sketch.image?.id)
        .filter((id): id is string => Boolean(id)),
    },
    rivals: { total: rivalsTotal, active: rivalsActive },
    valorant: { total: valorantTotal, active: valorantActive },
  }
})

export default getControlsOverview
