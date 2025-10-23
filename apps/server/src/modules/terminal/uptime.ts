import { publicProcedure } from "@/lib/trpc";
import {
  getPortfolioComponentStatus,
  getPortfolioMonitorUptime,
} from "../instatus";

const uptime = publicProcedure.query(async () => {
  const portfolioMonitorUptime = await getPortfolioMonitorUptime(
    "cmh3bqodw02dn1ry9jld9owgh"
  );
  const portfolioComponentStatus = await getPortfolioComponentStatus(
    "cmh3bqodw02dn1ry9jld9owgh"
  );

  return {
    uptime: portfolioMonitorUptime,
    status: portfolioComponentStatus,
  };
});

export default uptime;
