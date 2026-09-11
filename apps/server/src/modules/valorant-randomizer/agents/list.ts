import { publicProcedure } from "@/lib/trpc"

const getValorantAgents = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.valorantAgent.findMany({
    orderBy: { name: "asc" },
    select: { id: true, slug: true, name: true, color: true },
  })
})

export default getValorantAgents
