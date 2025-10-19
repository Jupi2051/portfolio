import { publicProcedure } from "@/lib/trpc";

export const isRegistered = publicProcedure.query(async ({ ctx }) => {
  const userCount = await ctx.prisma.user.count();
  return userCount > 0;
});
