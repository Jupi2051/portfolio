import type { ReactNode } from "react"
import { useTRPC } from "@/lib/trpc/trpc"
import { useMutation } from "@tanstack/react-query"

type Props = {
  children: ReactNode
  onLoggedOut: () => void
}

export default function AuthenticatedShell({ children, onLoggedOut }: Props) {
  const trpc = useTRPC()
  const logoutUser = useMutation(trpc.users.logout.mutationOptions())

  function handleLogout() {
    logoutUser.mutate(undefined, {
      onSuccess: () => {
        onLoggedOut()
      },
    })
  }

  return (
    <div className="relative flex h-full w-full min-h-0 flex-col">
      <button
        type="button"
        onClick={handleLogout}
        className="absolute text-sm top-2.5 right-4 z-10 cursor-pointer rounded-lg bg-red-600 px-4 py-1 text-white transition-colors hover:bg-red-700"
      >
        Logout
      </button>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
