import { protectedProcedure } from "@/lib/trpc";
import { TRPCError } from "@trpc/server";

export const getCurrentUser = protectedProcedure.query(async ({ ctx }) => {
  // User is already available in context from the protected procedure
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return {
    id: ctx.user.id,
    email: ctx.user.email,
  };
});
