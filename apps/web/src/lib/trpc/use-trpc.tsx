import { trpc } from "./trpc";

const useTRPC = () => {
  const {
    Provider,
    useQueries,
    useSuspenseQueries,
    useUtils,
    createClient,
    ...rest
  } = trpc;
  return rest;
};

export default useTRPC;
