import { useState } from "react"
import ControlsBackBar from "../aritcle-controls/controls-back-bar"
import PlayersTab from "./players-tab"
import ConstraintsTab from "./constraints-tab"

type Tab = "players" | "constraints"

type Props = {
  onBack: () => void
}

export default function ValorantRandomizerControlsPanel({ onBack }: Props) {
  const [tab, setTab] = useState<Tab>("players")

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-linear-to-br from-ctp-base to-ctp-mantle">
      <ControlsBackBar onBack={onBack} />

      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-capirola text-lg font-semibold text-ctp-text">
              Valorant Randomizer
            </h2>
            <div className="flex gap-1 rounded-lg border border-ctp-surface1 bg-ctp-mantle p-1">
              <button
                type="button"
                onClick={() => setTab("players")}
                className={`cursor-pointer rounded-md px-3 py-1 text-sm transition ${
                  tab === "players"
                    ? "bg-ctp-red text-ctp-crust"
                    : "text-ctp-subtext1 hover:text-ctp-text"
                }`}
              >
                Players
              </button>
              <button
                type="button"
                onClick={() => setTab("constraints")}
                className={`cursor-pointer rounded-md px-3 py-1 text-sm transition ${
                  tab === "constraints"
                    ? "bg-ctp-red text-ctp-crust"
                    : "text-ctp-subtext1 hover:text-ctp-text"
                }`}
              >
                Constraints
              </button>
            </div>
          </div>

          {tab === "players" ? <PlayersTab /> : <ConstraintsTab />}
        </div>
      </div>
    </div>
  )
}
