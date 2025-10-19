import { protectedProcedure } from "@/lib/trpc";

export const logoutUser = protectedProcedure.mutation(async ({ ctx }) => {
  // Clear the auth cookie
  ctx.res.clearCookie("authToken");

  return { success: true };
});
