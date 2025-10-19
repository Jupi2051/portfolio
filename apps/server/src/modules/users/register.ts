import { publicProcedure } from "@/lib/trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const registerUser = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // Check if there are any users in the database
    const userCount = await ctx.prisma.user.count();

    if (userCount > 0) {
      throw new Error("Users already exist in the database");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(input.password, 12);

    // Create the user
    const user = await ctx.prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
    });

    // Return user without password
    return {
      id: user.id,
      email: user.email,
    };
  });
