import { publicProcedure, router } from "@/lib/trpc"

export const vicoRouter = router({
  ping: publicProcedure.query(() => ({ ok: true as const })),
})
