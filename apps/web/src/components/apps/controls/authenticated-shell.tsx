import type { ReactNode } from "react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
  onLoggedOut: () => void;
};

export default function AuthenticatedShell({ children, onLoggedOut }: Props) {
  const trpc = useTRPC();
  const logoutUser = useMutation(trpc.users.logout.mutationOptions());

  function handleLogout() {
    logoutUser.mutate(undefined, {
      onSuccess: () => {
        onLoggedOut();
      },
    });
  }

  return (
    <div className="relative flex h-full w-full min-h-0 flex-col">
      <div className="absolute right-4 flex justify-end p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col pt-14">{children}</div>
    </div>
  );
}
