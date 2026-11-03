import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"
import { PlusIcon } from "@/components/ui/icons"
import { primaryButtonClassName } from "../controls-panel-header"

export default function AddPlayerForm() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [discordId, setDiscordId] = useState("")

  const addPlayer = useMutation({
    ...trpc.valorantRandomizer.players.add.mutationOptions(),
    onSuccess: () => {
      setDiscordId("")
      void queryClient.invalidateQueries(trpc.valorantRandomizer.pathFilter())
    },
  })

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = discordId.trim()
    if (!trimmed) return
    addPlayer.mutate({ discordId: trimmed })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <label className="flex h-9 w-60 items-center gap-2 rounded-[10px] border border-white/10 bg-white/4 px-3 transition-[border-color,box-shadow] duration-150 ease-out-strong focus-within:border-holo-soft/70 focus-within:shadow-[0_0_0_4px_rgba(140,142,255,0.12)]">
        <PlusIcon className="size-3.5 shrink-0 text-haze-dim" />
        <input
          type="text"
          value={discordId}
          onChange={(event) => setDiscordId(event.target.value)}
          placeholder="Discord user ID"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-moon outline-none placeholder:text-haze-dim"
        />
      </label>
      <button
        type="submit"
        disabled={addPlayer.isPending || !discordId.trim()}
        className={primaryButtonClassName}
      >
        {addPlayer.isPending ? "Fetching from Discord…" : "Add player"}
      </button>
      {addPlayer.isError ? (
        <span className="text-xs text-[#ffb3c2]">{addPlayer.error.message}</span>
      ) : null}
    </form>
  )
}
