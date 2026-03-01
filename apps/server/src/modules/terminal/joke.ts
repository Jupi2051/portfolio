import { publicProcedure } from "@/lib/trpc";
import axios from "axios";

const joke = publicProcedure.query(async () => {
  const response = await axios.get<{ setup: string; punchline: string }>(
    "https://official-joke-api.appspot.com/random_joke"
  );

  return {
    joke: `${response.data.setup} ${response.data.punchline}`,
  };
});

export default joke;
