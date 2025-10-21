import { publicProcedure } from "@/lib/trpc";
import { z } from "zod";

const createPinnedMessage = publicProcedure
  .input(
    z.object({
      content: z.string().min(10).max(100),
      author: z.string().min(1).max(50),
      color: z.enum([
        "white",
        "black",
        "blue",
        "green",
        "red",
        "pink",
        "yellow",
        "gray",
        "purple",
      ]),
      positionX: z.number().min(0).max(Number.MAX_SAFE_INTEGER),
      positionY: z.number().min(0).max(Number.MAX_SAFE_INTEGER),
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
