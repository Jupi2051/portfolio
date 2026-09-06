import { publicProcedure } from "@/lib/trpc"

const getRivalsHeroes = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.rivalsMainHero.findMany({
    orderBy: { name: "asc" },
    select: { id: true, slug: true, name: true, color: true },
  })
})

export default getRivalsHeroes
