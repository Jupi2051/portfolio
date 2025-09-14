import { publicProcedure } from "@/lib/trpc";
import { z } from "zod";

const createPinnedMessage = publicProcedure
  .input(
    z.object({
      content: z.string(),
      author: z.string(),
      color: z.string(),
      positionX: z.number(),
      positionY: z.number(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.pinnedMessage.create({
      data: input,
    });
  });

export default createPinnedMessage;
