import { protectedProcedure } from "@/lib/trpc"
import { z } from "zod"

const removeRivalsPlayer = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.rivalsPlayer.delete({ where: { id: input.id } })
    return { id: input.id }
  })

export default removeRivalsPlayer
