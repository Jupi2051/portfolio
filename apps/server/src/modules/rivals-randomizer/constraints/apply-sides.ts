import { protectedProcedure } from "@/lib/trpc"
import { z } from "zod"

type PendingConstraint = {
  type: "MUST_PAIR" | "MUST_SPLIT"
  playerAId: string
  playerBId: string
}

function pairKey(type: PendingConstraint["type"], a: string, b: string): PendingConstraint {
  const [playerAId, playerBId] = [a, b].sort()
  return { type, playerAId, playerBId }
}

/**
 * Derives constraints from a two-sided drag-and-drop layout: everyone on the
 * same side must play together, everyone across sides must be split up. Prior
 * constraints among the placed players are replaced with this new layout.
 */
const applyRivalsConstraintSides = protectedProcedure
  .input(
    z.object({
      sideA: z.array(z.string()),
      sideB: z.array(z.string()),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { sideA, sideB } = input
    const placedIds = [...sideA, ...sideB]

    const pending: PendingConstraint[] = []
    for (let i = 0; i < sideA.length; i++) {
      for (let j = i + 1; j < sideA.length; j++) {
        pending.push(pairKey("MUST_PAIR", sideA[i], sideA[j]))
      }
    }
    for (let i = 0; i < sideB.length; i++) {
      for (let j = i + 1; j < sideB.length; j++) {
        pending.push(pairKey("MUST_PAIR", sideB[i], sideB[j]))
      }
    }
    for (const a of sideA) {
      for (const b of sideB) {
        pending.push(pairKey("MUST_SPLIT", a, b))
      }
    }

    await ctx.prisma.$transaction([
      ctx.prisma.rivalsPlayerConstraint.deleteMany({
        where: {
          playerAId: { in: placedIds },
          playerBId: { in: placedIds },
        },
      }),
      ...pending.map((constraint) =>
        ctx.prisma.rivalsPlayerConstraint.create({ data: constraint }),
      ),
    ])

    return { constraintCount: pending.length }
  })

export default applyRivalsConstraintSides
