import { useState, lazy, Suspense } from "react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserForm from "./user-form";
import { motion } from "framer-motion";

const SettingsComponent = lazy(() =>
  import("@/components/apps/controls/aritcle-controls/index").then((module) => {
    return { default: module.default };
  })
);

function Controls() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const trpc = useTRPC();
  const logoutUser = useMutation(trpc.users.logout.mutationOptions());

  // Check if any users are registered to determine form type
  const { data: isRegistered, isLoading: isCheckingRegistration } = useQuery(
    trpc.users.isRegistered.queryOptions()
  );

  function handleAuthSuccess() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    logoutUser.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false);
      },
    });
  }

  // Show loading while checking registration status
  if (isCheckingRegistration) {
    return (
      <div style={{ width: "100%", height: "100%", border: "none" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.h1
            className="text-6xl font-bold text-ctp-pink"
            style={{ fontFamily: "Caveat, cursive" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading
          </motion.h1>
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: "100%", border: "none" }}>
      <div className="overflow-auto w-full h-full flex items-center justify-center">
        {isAuthenticated ? (
          <div className="w-full h-full flex flex-col">
            <div className="flex justify-end p-4 absolute right-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <Suspense fallback={<h1>DAMN ITS LOADING RN BOYS ITS LADING</h1>}>
                <SettingsComponent />
              </Suspense>
            </div>
          </div>
        ) : (
          <UserForm
            type={isRegistered ? "login" : "register"}
            onSuccess={handleAuthSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default Controls;
