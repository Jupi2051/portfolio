import { protectedProcedure } from "@/lib/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { VALORANT_RANK_ORDER } from "../rank-labels"

const MAX_ACTIVE_PLAYERS = 10

const updateValorantPlayer = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      rank: z.enum(VALORANT_RANK_ORDER).optional(),
      mainAgentId: z.string().nullable().optional(),
      skillLevel: z.number().min(0).max(1).optional(),
      isActive: z.boolean().optional(),
      order: z.number().int().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { id, ...changes } = input

    if (changes.isActive) {
      const activeCount = await ctx.prisma.valorantPlayer.count({
        where: { isActive: true, id: { not: id } },
      })
      if (activeCount >= MAX_ACTIVE_PLAYERS) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Only ${MAX_ACTIVE_PLAYERS} players can be active at once`,
        })
      }
    }

    if (changes.mainAgentId) {
      const agent = await ctx.prisma.valorantAgent.findUnique({
        where: { id: changes.mainAgentId },
      })
      if (!agent) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown agent" })
      }
    }

    return ctx.prisma.valorantPlayer.update({
      where: { id },
      data: changes,
    })
  })

export default updateValorantPlayer
