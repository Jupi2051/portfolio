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
        fallback={<p className="text-sm text-haze-dim">Loading drag & drop board...</p>}
      >
        <ConstraintsBoard />
      </Suspense>

      <div className="flex flex-col gap-2">
        <p className="text-xs leading-4 font-semibold tracking-[0.14em] text-haze uppercase">
          All constraints
        </p>
        {constraintsQuery.isLoading ? (
          <p className="text-sm text-haze-dim">Loading constraints...</p>
        ) : constraints.length === 0 ? (
          <p className="text-sm text-haze-dim">No constraints yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {constraints.map((constraint) => (
              <li
                key={constraint.id}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/3 px-3.5 py-2.5 text-sm"
              >
                <span className="text-moon">
                  {constraint.playerA.displayName} & {constraint.playerB.displayName}
                  <span className="ml-2 text-xs text-haze-dim">
                    {TYPE_LABELS[constraint.type as "MUST_PAIR" | "MUST_SPLIT"]}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeConstraint.mutate({ id: constraint.id })}
                  disabled={removeConstraint.isPending}
                  className="flex h-7.5 cursor-pointer items-center rounded-lg border border-melon/30 px-2.5 text-xs font-medium text-[#ff8fa6] transition-colors duration-150 ease-out-strong hover:bg-melon hover:text-white"
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
