import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCProvider } from "./trpc";
import trpcClient from "./trpc-client";

const queryClient = new QueryClient();

const provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export default provider;
