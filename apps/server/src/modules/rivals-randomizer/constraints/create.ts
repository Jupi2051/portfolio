import { protectedProcedure } from "@/lib/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

const createRivalsConstraint = protectedProcedure
  .input(
    z.object({
      type: z.enum(["MUST_PAIR", "MUST_SPLIT"]),
      playerAId: z.string(),
      playerBId: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (input.playerAId === input.playerBId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "A player can't be constrained with themself",
      })
    }

    // Store in a stable order so (A, B) and (B, A) collapse into one row.
    const [playerAId, playerBId] = [input.playerAId, input.playerBId].sort()

    const existing = await ctx.prisma.rivalsPlayerConstraint.findFirst({
      where: {
        playerAId,
        playerBId,
      },
    })
    if (existing) {
      if (existing.type === input.type) return existing
      throw new TRPCError({
        code: "CONFLICT",
        message: "These players already have the opposite constraint",
      })
    }

    return ctx.prisma.rivalsPlayerConstraint.create({
      data: { type: input.type, playerAId, playerBId },
    })
  })

export default createRivalsConstraint
