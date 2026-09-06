import { publicProcedure } from "@/lib/trpc"

const SETTINGS_ID = "singleton"

const getRivalsSettings = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.rivalsSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID },
    update: {},
  })
})

export default getRivalsSettings
