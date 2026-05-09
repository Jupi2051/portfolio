import { protectedProcedure } from "@/lib/trpc"

const getVicoSketchListUnapproved = protectedProcedure.query(
  async ({ ctx }) => {
    const sketches = await ctx.prisma.vicoSketch.findMany({
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
      imageId: sketch.image?.id,
    }))
  },
)

export default getVicoSketchListUnapproved
