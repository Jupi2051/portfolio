import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req, res }: CreateExpressContextOptions): {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
} {
  return {
    req,
    res,
    // Add any additional context here (auth, database, etc.)
  };
}

export type Context = typeof createContext;
