import useTRPC from "@/lib/trpc/use-trpc";

export function TRPCDemo() {
  const trpc = useTRPC();
  const dada = trpc.users.getAll.useQuery();

  return <div className="p-4 bg-white rounded-lg shadow">amongus</div>;
}
