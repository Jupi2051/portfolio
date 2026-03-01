import { publicProcedure } from "@/lib/trpc";
import axios from "axios";

const insult = publicProcedure.query(async () => {
  const response = await axios.get<string>(
    "https://insult.mattbas.org/api/insult"
  );
  return {
    insult: response.data,
  };
});

export default insult;
