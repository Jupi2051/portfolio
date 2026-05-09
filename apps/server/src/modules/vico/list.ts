import { publicProcedure } from "@/lib/trpc"

const getVicoSketchList = publicProcedure.query(async ({ ctx }) => {
  const sketches = await ctx.prisma.vicoSketch.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    include: {
      image: {
        select: {
          id: true,
        },
      },
    },
  })

  return sketches.map((sketch) => ({
    id: sketch.id,
    title: sketch.title,
    author: sketch.author,
    createdAt: sketch.createdAt.toISOString(),
    imageId: sketch.image?.id ?? null,
  }))
})

export default getVicoSketchList
