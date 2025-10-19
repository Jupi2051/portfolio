import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";

export function createContext({ req, res }: CreateExpressContextOptions): {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  prisma: typeof prisma;
  user?: { id: string; email: string };
} {
  let user: { id: string; email: string } | undefined;

  // Extract token from cookies
  const token = req.cookies?.authToken;

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { id: string; email: string };
      user = decoded;
    } catch (error) {
      // Token is invalid, user remains undefined
    }
  }

  return {
    req,
    res,
    prisma,
    user,
  };
}

export type Context = ReturnType<typeof createContext>;
