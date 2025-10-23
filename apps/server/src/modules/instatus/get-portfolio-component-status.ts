import { TRPCError } from "@trpc/server";
import axios from "axios";

type StatusType =
  | "OPERATIONAL"
  | "UNDERMAINTENANCE"
  | "DEGRADEDPERFORMANCE"
  | "PARTIALOUTAGE"
  | "MINOROUTAGE"
  | "MAJOROUTAGE";

const getPortfolioComponentStatus = async (
  componentId: string
): Promise<StatusType> => {
  const response = await axios.get<{
    components: { id: string; name: string; status: StatusType }[];
  }>(`https://status.jupi.dev/v2/components.json`);

  const component = response.data.components.find(
    (component) => component.id === componentId
  );

  if (!component) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Component ${componentId} not found`,
    });
  }

  return component.status as StatusType;
};

export default getPortfolioComponentStatus;
