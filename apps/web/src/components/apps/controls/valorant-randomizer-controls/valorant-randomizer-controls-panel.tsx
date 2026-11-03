import { useState } from "react"
import ControlsPanelHeader, { ControlsTabs } from "../controls-panel-header"
import PlayersTab from "./players-tab"
import ConstraintsTab from "./constraints-tab"

type Tab = "players" | "constraints"

export default function ValorantRandomizerControlsPanel() {
  const [tab, setTab] = useState<Tab>("players")

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <ControlsPanelHeader
        title="Valorant randomizer"
        aside={
          <ControlsTabs
            value={tab}
            onChange={setTab}
            tabs={[
              { value: "players", label: "Players" },
              { value: "constraints", label: "Constraints" },
            ]}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 [scrollbar-color:rgba(255,255,255,0.14)_transparent] scrollbar-thin @2xl/appwindow:px-8">
        {tab === "players" ? <PlayersTab /> : <ConstraintsTab />}
      </div>
    </div>
  )
}
