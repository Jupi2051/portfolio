import { publicProcedure } from "@/lib/trpc";
import axios from "axios";

const advice = publicProcedure.query(async () => {
  const response = await axios.get<{ slip: { advice: string } }>(
    "https://api.adviceslip.com/advice"
  );
  return {
    advice: response.data.slip.advice,
  };
});

export default advice;
