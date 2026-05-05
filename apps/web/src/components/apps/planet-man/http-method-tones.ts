import type { HttpMethod } from "./types";

/** Catppuccin accent per verb — GET uses green */
export const HTTP_METHOD_TONE: Record<
  HttpMethod,
  {
    text: string;
    triggerBg: string;
    listItemSelected: string;
    listBorderSelected: string;
  }
> = {
  GET: {
    text: "text-ctp-green",
    triggerBg: "bg-ctp-green/15",
    listItemSelected: "bg-ctp-green/20",
    listBorderSelected: "border-l-ctp-green",
  },
  POST: {
    text: "text-ctp-pink",
    triggerBg: "bg-ctp-pink/15",
    listItemSelected: "bg-ctp-pink/20",
    listBorderSelected: "border-l-ctp-pink",
  },
  PUT: {
    text: "text-ctp-yellow",
    triggerBg: "bg-ctp-yellow/15",
    listItemSelected: "bg-ctp-yellow/20",
    listBorderSelected: "border-l-ctp-yellow",
  },
  PATCH: {
    text: "text-ctp-peach",
    triggerBg: "bg-ctp-peach/15",
    listItemSelected: "bg-ctp-peach/20",
    listBorderSelected: "border-l-ctp-peach",
  },
  DELETE: {
    text: "text-ctp-red",
    triggerBg: "bg-ctp-red/15",
    listItemSelected: "bg-ctp-red/20",
    listBorderSelected: "border-l-ctp-red",
  },
  HEAD: {
    text: "text-ctp-teal",
    triggerBg: "bg-ctp-teal/15",
    listItemSelected: "bg-ctp-teal/20",
    listBorderSelected: "border-l-ctp-teal",
  },
  OPTIONS: {
    text: "text-ctp-sapphire",
    triggerBg: "bg-ctp-sapphire/15",
    listItemSelected: "bg-ctp-sapphire/20",
    listBorderSelected: "border-l-ctp-sapphire",
  },
};
