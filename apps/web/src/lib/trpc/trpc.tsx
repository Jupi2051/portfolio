import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@/servertypes/router";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
