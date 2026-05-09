import { useState, lazy, Suspense } from "react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useQuery } from "@tanstack/react-query";
import UserForm from "./user-form";
import AuthenticatedShell from "./authenticated-shell";
import ControlsLoadingScreen from "./controls-loading-screen";

const SettingsComponent = lazy(() =>
  import("@/components/apps/controls/aritcle-controls/index").then((module) => {
    return { default: module.default };
  }),
);

function Controls() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const trpc = useTRPC();

  const { data: isRegistered, isLoading: isCheckingRegistration } = useQuery(
    trpc.users.isRegistered.queryOptions(),
  );

  function handleAuthSuccess() {
    setIsAuthenticated(true);
  }

  if (isCheckingRegistration) {
    return <ControlsLoadingScreen />;
  }

  return (
    <div style={{ width: "100%", height: "100%", border: "none" }}>
      <div className="flex h-full w-full min-h-0 flex-col overflow-auto">
        {isAuthenticated ? (
          <AuthenticatedShell onLoggedOut={() => setIsAuthenticated(false)}>
            <Suspense fallback={<h1>DAMN ITS LOADING RN BOYS ITS LADING</h1>}>
              <SettingsComponent />
            </Suspense>
          </AuthenticatedShell>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <UserForm
              type={isRegistered ? "login" : "register"}
              onSuccess={handleAuthSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Controls;
