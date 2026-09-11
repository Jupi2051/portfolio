import { protectedProcedure } from "@/lib/trpc"
import { z } from "zod"

const removeValorantPlayer = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.valorantPlayer.delete({ where: { id: input.id } })
    return { id: input.id }
  })

export default removeValorantPlayer
