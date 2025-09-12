import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCProvider } from "./trpc";
import { AppRouter } from "@server/router";
import { httpBatchLink, createTRPCClient } from "@trpc/client";

const queryClient = new QueryClient();
const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
});

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
