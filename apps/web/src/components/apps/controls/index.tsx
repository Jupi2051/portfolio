import { useState, lazy, Suspense } from "react"
import { useTRPC } from "@/lib/trpc/trpc"
import { useQuery } from "@tanstack/react-query"
import UserForm from "./user-form"
import ControlsLoadingScreen from "./controls-loading-screen"

const ControlsPanels = lazy(
  () => import("@/components/apps/controls/aritcle-controls/index"),
)

function Controls() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const trpc = useTRPC()

  const { data: isRegistered, isLoading: isCheckingRegistration } = useQuery(
    trpc.users.isRegistered.queryOptions(),
  )

  if (isCheckingRegistration) {
    return <ControlsLoadingScreen />
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-panel">
      {isAuthenticated ? (
        <Suspense fallback={<ControlsLoadingScreen />}>
          <ControlsPanels onLoggedOut={() => setIsAuthenticated(false)} />
        </Suspense>
      ) : (
        <UserForm
          type={isRegistered ? "login" : "register"}
          onSuccess={() => setIsAuthenticated(true)}
        />
      )}
    </div>
  )
}

export default Controls
