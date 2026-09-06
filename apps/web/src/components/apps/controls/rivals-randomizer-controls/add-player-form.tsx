import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"

export default function AddPlayerForm() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [discordId, setDiscordId] = useState("")

  const addPlayer = useMutation({
    ...trpc.rivalsRandomizer.players.add.mutationOptions(),
    onSuccess: () => {
      setDiscordId("")
      void queryClient.invalidateQueries(trpc.rivalsRandomizer.pathFilter())
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
      <input
        type="text"
        value={discordId}
        onChange={(event) => setDiscordId(event.target.value)}
        placeholder="Discord user ID"
        className="rounded-lg border border-ctp-surface1 bg-ctp-base px-3 py-1.5 text-sm text-ctp-text outline-none focus:border-ctp-lavender"
      />
      <button
        type="submit"
        disabled={addPlayer.isPending || !discordId.trim()}
        className="cursor-pointer rounded-lg bg-ctp-lavender px-4 py-1.5 text-sm font-medium text-ctp-crust transition hover:bg-ctp-mauve disabled:cursor-not-allowed disabled:opacity-60"
      >
        {addPlayer.isPending ? "Fetching from Discord..." : "Add player"}
      </button>
      {addPlayer.isError ? (
        <span className="text-xs text-ctp-red">{addPlayer.error.message}</span>
      ) : null}
    </form>
  )
}
