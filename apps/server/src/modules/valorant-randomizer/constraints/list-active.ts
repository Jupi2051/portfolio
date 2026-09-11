import { publicProcedure } from "@/lib/trpc"

/** Constraints between currently active players, shaped for the frontend balancer. */
const getValorantActiveConstraints = publicProcedure.query(async ({ ctx }) => {
  const constraints = await ctx.prisma.valorantPlayerConstraint.findMany({
    where: {
      playerA: { isActive: true },
      playerB: { isActive: true },
    },
    select: { type: true, playerAId: true, playerBId: true },
  })

  const mustPair: [string, string][] = []
  const mustSplit: [string, string][] = []

  for (const constraint of constraints) {
    const pair: [string, string] = [constraint.playerAId, constraint.playerBId]
    if (constraint.type === "MUST_PAIR") mustPair.push(pair)
    else mustSplit.push(pair)
  }

  return { mustPair, mustSplit }
})

export default getValorantActiveConstraints
