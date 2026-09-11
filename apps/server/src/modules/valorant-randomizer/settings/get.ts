import { publicProcedure } from "@/lib/trpc"

const SETTINGS_ID = "singleton"

const getValorantSettings = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.valorantSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID },
    update: {},
  })
})

export default getValorantSettings
