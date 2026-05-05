import { useState } from "react"
import cn from "classnames"
import type { PlanetManResponse } from "./types"
import PlanetJsonBlock from "./planet-json-block"
import ResponseStatusSummary from "./response-status-summary"

type Tab = "body" | "headers"

type Props = {
  response: PlanetManResponse | null
}

export default function ResponsePanel({ response }: Props) {
  const [tab, setTab] = useState<Tab>("body")

  if (!response) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center border border-ctp-surface1 border-dashed bg-ctp-mantle/40 p-6 text-center text-sm text-ctp-subtext0">
        Send a request to see status, headers, and body here.
      </div>
    )
  }

  const headersPretty = JSON.stringify(response.headers, null, 2)

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col border border-ctp-surface1 bg-ctp-mantle/80">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ctp-surface1 bg-ctp-crust/90 px-2 py-2">
        <ResponseStatusSummary
          status={response.status}
          statusText={response.statusText}
          durationMs={response.durationMs}
        />
        <div className="ml-auto flex shrink-0">
          <button
            type="button"
            onClick={() => setTab("body")}
            className={cn(
              "cursor-pointer px-3 py-1.5 text-xs font-medium uppercase tracking-wide",
              tab === "body"
                ? "border-b-2 border-ctp-mauve text-ctp-text"
                : "text-ctp-subtext0 hover:text-ctp-text",
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
                : "text-ctp-subtext0 hover:text-ctp-text",
            )}
          >
            Headers
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden text-xs">
        <PlanetJsonBlock
          content={tab === "body" ? response.body || "—" : headersPretty}
        />
      </div>
    </div>
  )
}
