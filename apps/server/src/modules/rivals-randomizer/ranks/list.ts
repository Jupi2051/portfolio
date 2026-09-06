import { publicProcedure } from "@/lib/trpc"
import { listRanks } from "../rank-labels"

const getRivalsRanks = publicProcedure.query(() => listRanks())

export default getRivalsRanks
