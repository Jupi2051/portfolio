import { protectedProcedure } from "@/lib/trpc"
import { z } from "zod"

const SETTINGS_ID = "singleton"

const updateValorantSettings = protectedProcedure
  .input(
    z.object({
      useSkillLevel: z.boolean().optional(),
      useConstraints: z.boolean().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.valorantSettings.upsert({
      where: { id: SETTINGS_ID },
      create: { id: SETTINGS_ID, ...input },
      update: input,
    })
  })

export default updateValorantSettings
