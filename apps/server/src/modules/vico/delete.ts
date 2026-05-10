import { protectedProcedure } from "@/lib/trpc"
import { z } from "zod"

const deleteVicoSketch = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const sketch = await ctx.prisma.vicoSketch.findUnique({
        where: { id: input.id },
      })

      if (!sketch) return { error: "Sketch not found" as const }

      await ctx.prisma.vicoSketch.update({
        where: { id: input.id },
        data: { deletedAt: new Date() },
      })

      return { ok: true as const }
    } catch (error) {
      console.log(error)
      return null
    }
  })

export default deleteVicoSketch
