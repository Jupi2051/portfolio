import { publicProcedure } from "@/lib/trpc";
import { z } from "zod";

const createUser = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return {
      id: "1",
      email: input.email,
      password: input.password,
      assigned: "1",
    };
  });

const getUser = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: input.id },
    });
    return user;
  });

const getAllUsers = publicProcedure.query(async ({ ctx }) => {
  return [];
});

export { createUser, getUser, getAllUsers };
