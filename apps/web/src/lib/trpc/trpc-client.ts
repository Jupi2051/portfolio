import { AppRouter } from "@server/router";
import { httpBatchLink, createTRPCClient } from "@trpc/client";

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include", // Important for cookies
        });
      },
    }),
  ],
});

export default trpcClient;
