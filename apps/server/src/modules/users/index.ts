import { publicProcedure } from "@/trpc";
import { z } from "zod";

const createUser = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      name: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
    });
    return user;
  });

const getUser = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: input.id },
      include: { posts: true },
    });
    return user;
  });

const getAllUsers = publicProcedure.query(async ({ ctx }) => {
  const users = await ctx.prisma.user.findMany({
    include: { posts: true },
  });
  return users;
});

export { createUser, getUser, getAllUsers };
