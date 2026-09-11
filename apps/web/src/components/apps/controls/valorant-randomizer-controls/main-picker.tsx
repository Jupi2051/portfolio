import { useMemo, useState } from "react"
import { valorantAgentIconUrl } from "./image-urls"

export type AgentOption = {
  id: string
  name: string
}

type Props = {
  agents: AgentOption[]
  selectedId: string | null
  disabled?: boolean
  onChange: (nextId: string | null) => void
}

/**
 * A wrap-grid of every agent's icon as a toggleable button, single-select
 * (mirrors Rivals' single `mainHero`). Clicking an unselected agent replaces
 * the current pick; clicking the selected one clears it.
 */
export default function MainPicker({ agents, selectedId, disabled, onChange }: Props) {
  const [search, setSearch] = useState("")

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedId) ?? null,
    [agents, selectedId],
  )

  const filteredAgents = useMemo(() => {
    if (!search.trim()) return agents
    const query = search.trim().toLowerCase()
    return agents.filter((agent) => agent.name.toLowerCase().includes(query))
  }, [agents, search])

  function toggleAgent(agentId: string) {
    if (disabled) return
    onChange(agentId === selectedId ? null : agentId)
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[0.65rem] text-ctp-subtext0">
        {selectedAgent ? `Main: ${selectedAgent.name}` : "No main selected."}
      </p>

      {agents.length > 8 ? (
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search agents..."
          className="w-full rounded-md border border-ctp-surface1 bg-ctp-base px-2 py-1 text-xs text-ctp-text outline-none focus:border-ctp-red"
        />
      ) : null}

      <div className="flex flex-wrap gap-1.5">
        {filteredAgents.map((agent) => {
          const isSelected = agent.id === selectedId

          return (
            <button
              key={agent.id}
              type="button"
              title={agent.name}
              disabled={disabled}
              onClick={() => toggleAgent(agent.id)}
              className={`h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-md ring-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${
                isSelected ? "ring-ctp-red" : "ring-transparent hover:ring-ctp-surface2"
              }`}
            >
              <img
                src={valorantAgentIconUrl(agent.id)}
                alt={agent.name}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
