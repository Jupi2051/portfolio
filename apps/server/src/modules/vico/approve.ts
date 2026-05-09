import { protectedProcedure } from "@/lib/trpc"
import { z } from "zod"

const toggleSketchApproval = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      approved: z.boolean().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const sketch = await ctx.prisma.vicoSketch.findUnique({
        where: { id: input.id },
      })

      if (!sketch) return { error: "Sketch not found" }

      await ctx.prisma.vicoSketch.update({
        where: { id: input.id },
        data: { approved: input.approved ?? !sketch.approved },
      })

      return { approved: sketch.approved }
    } catch (error) {
      console.log(error)
      return null
    }
  })

export default toggleSketchApproval
