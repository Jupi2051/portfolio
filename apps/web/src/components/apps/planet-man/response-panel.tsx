import { useState } from "react";
import cn from "classnames";
import type { PlanetManResponse } from "./types";
import PlanetJsonBlock from "./planet-json-block";

type Tab = "body" | "headers";

type Props = {
  response: PlanetManResponse | null;
};

function statusTone(status: number): string {
  if (status >= 200 && status < 300) return "bg-ctp-green/20 text-ctp-green";
  if (status >= 300 && status < 400) return "bg-ctp-teal/20 text-ctp-teal";
  if (status >= 400 && status < 500) return "bg-ctp-yellow/20 text-ctp-yellow";
  if (status >= 500) return "bg-ctp-red/20 text-ctp-red";
  return "bg-ctp-surface1 text-ctp-subtext1";
}

export default function ResponsePanel({ response }: Props) {
  const [tab, setTab] = useState<Tab>("body");

  if (!response) {
    return (
      <div className="flex flex-1 items-center justify-center border border-ctp-surface1 border-dashed bg-ctp-mantle/40 p-6 text-center text-sm text-ctp-subtext0">
        Send a request to see status, headers, and body here.
      </div>
    );
  }

  const headersPretty = JSON.stringify(response.headers, null, 2);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col border border-ctp-surface1 bg-ctp-mantle/80">
      <div className="flex flex-wrap items-center gap-2 border-b border-ctp-surface1 bg-ctp-crust/90 px-2 py-2">
        <span
          className={cn(
            "rounded px-2 py-0.5 font-mono text-xs font-semibold",
            statusTone(response.status)
          )}
        >
          {response.status} {response.statusText}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-ctp-subtext0">
          {response.durationMs} ms
        </span>
        <div className="ml-auto flex">
          <button
            type="button"
            onClick={() => setTab("body")}
            className={cn(
              "cursor-pointer px-3 py-1.5 text-xs font-medium uppercase tracking-wide",
              tab === "body"
                ? "border-b-2 border-ctp-mauve text-ctp-text"
                : "text-ctp-subtext0 hover:text-ctp-text"
            )}
          >
            Body
          </button>
          <button
            type="button"
            onClick={() => setTab("headers")}
            className={cn(
              "cursor-pointer px-3 py-1.5 text-xs font-medium uppercase tracking-wide",
              tab === "headers"
                ? "border-b-2 border-ctp-mauve text-ctp-text"
                : "text-ctp-subtext0 hover:text-ctp-text"
            )}
          >
            Headers
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden text-xs">
        <PlanetJsonBlock
          content={tab === "body" ? response.body || "—" : headersPretty}
        />
      </div>
    </div>
  );
}
