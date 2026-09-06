import { lazy, Suspense } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/lib/trpc/trpc"

const ConstraintsBoard = lazy(() => import("./constraints-board"))

const TYPE_LABELS = {
  MUST_PAIR: "Must be together",
  MUST_SPLIT: "Must be split up",
} as const

export default function ConstraintsTab() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const constraintsQuery = useQuery(trpc.rivalsRandomizer.constraints.listAll.queryOptions())
  const constraints = constraintsQuery.data ?? []

  const removeConstraint = useMutation({
    ...trpc.rivalsRandomizer.constraints.remove.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(trpc.rivalsRandomizer.pathFilter()),
  })

  return (
    <div className="flex flex-col gap-5">
      <Suspense
        fallback={<p className="text-sm text-ctp-subtext0">Loading drag & drop board...</p>}
      >
        <ConstraintsBoard />
      </Suspense>

      <div className="flex flex-col gap-2">
        <p className="font-jockey-one text-sm tracking-wide text-ctp-text">
          All constraints
        </p>
        {constraintsQuery.isLoading ? (
          <p className="text-sm text-ctp-subtext0">Loading constraints...</p>
        ) : constraints.length === 0 ? (
          <p className="text-sm text-ctp-subtext0">No constraints yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {constraints.map((constraint) => (
              <li
                key={constraint.id}
                className="flex items-center justify-between rounded-lg border border-ctp-surface1 bg-ctp-mantle px-3 py-2 text-sm"
              >
                <span className="text-ctp-text">
                  {constraint.playerA.displayName} & {constraint.playerB.displayName}
                  <span className="ml-2 text-xs text-ctp-subtext0">
                    {TYPE_LABELS[constraint.type as "MUST_PAIR" | "MUST_SPLIT"]}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeConstraint.mutate({ id: constraint.id })}
                  disabled={removeConstraint.isPending}
                  className="cursor-pointer rounded-lg border border-ctp-red/40 bg-ctp-base px-2.5 py-1 text-xs text-ctp-red transition hover:bg-ctp-red/10"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
