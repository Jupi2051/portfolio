import { TRPCError } from "@trpc/server";
import axios from "axios";

const getPortfolioMonitorUptime = async (
  componentId: string
): Promise<string> => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);

  const response = await axios.get<{
    componentsUptime: Record<string, { uptime: string }>;
  }>(
    `https://api.instatus.com/public/jupi/uptime?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
  );

  const componentUptime = response.data.componentsUptime[componentId];

  if (!componentUptime) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Component ${componentId} not found`,
    });
  }

  return componentUptime.uptime;
};

export default getPortfolioMonitorUptime;
