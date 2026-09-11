import { publicProcedure } from "@/lib/trpc"
import { listRanks } from "../rank-labels"

const getValorantRanks = publicProcedure.query(() => listRanks())

export default getValorantRanks
