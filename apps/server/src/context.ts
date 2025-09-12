import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "./lib/prisma";

export function createContext({ req, res }: CreateExpressContextOptions): {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  prisma: typeof prisma;
} {
  return {
    req,
    res,
    prisma,
  };
}

export type Context = ReturnType<typeof createContext>;
