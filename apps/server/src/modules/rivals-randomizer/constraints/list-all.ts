import { protectedProcedure } from "@/lib/trpc"

const getRivalsConstraints = protectedProcedure.query(async ({ ctx }) => {
  const constraints = await ctx.prisma.rivalsPlayerConstraint.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      playerA: { select: { id: true, displayName: true } },
      playerB: { select: { id: true, displayName: true } },
    },
  })

  return constraints.map((constraint) => ({
    id: constraint.id,
    type: constraint.type,
    playerA: constraint.playerA,
    playerB: constraint.playerB,
  }))
})

export default getRivalsConstraints
