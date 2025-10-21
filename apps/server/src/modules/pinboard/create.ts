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
    // Add artificial delay of 1.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return ctx.prisma.pinnedMessage.create({
      data: input,
    });
  });

export default createPinnedMessage;
