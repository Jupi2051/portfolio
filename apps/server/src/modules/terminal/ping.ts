import { publicProcedure } from "@/lib/trpc";

const ping = publicProcedure.query(async () => {
  return {
    message: "Pong",
  };
});

export default ping;
