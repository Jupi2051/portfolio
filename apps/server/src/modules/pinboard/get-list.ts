import { publicProcedure } from "@/lib/trpc";

const getPinnedMessageList = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.pinnedMessage.findMany();
});

export default getPinnedMessageList;
