import { protectedProcedure } from "@/lib/trpc"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { RIVALS_RANK_ORDER } from "../rank-labels"
import { roleSkillsSchema } from "../validators"

const MAX_ACTIVE_PLAYERS = 12

const updateRivalsPlayer = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      rank: z.enum(RIVALS_RANK_ORDER).optional(),
      mainHeroId: z.string().nullable().optional(),
      skillLevel: z.number().min(0).max(1).optional(),
      roleSkills: roleSkillsSchema.optional(),
      isActive: z.boolean().optional(),
      order: z.number().int().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { id, ...changes } = input

    if (changes.isActive) {
      const activeCount = await ctx.prisma.rivalsPlayer.count({
        where: { isActive: true, id: { not: id } },
      })
      if (activeCount >= MAX_ACTIVE_PLAYERS) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Only ${MAX_ACTIVE_PLAYERS} players can be active at once`,
        })
      }
    }

    if (changes.mainHeroId) {
      const hero = await ctx.prisma.rivalsMainHero.findUnique({
        where: { id: changes.mainHeroId },
      })
      if (!hero) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown hero" })
      }
    }

    return ctx.prisma.rivalsPlayer.update({
      where: { id },
      data: changes,
    })
  })

export default updateRivalsPlayer
