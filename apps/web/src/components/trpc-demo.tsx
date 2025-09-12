import useTRPC from "@/lib/trpc/use-trpc";

export function TRPCDemo() {
  const trpc = useTRPC();
  const dada = trpc.blog.dada.useQuery();
  const dede = trpc.blog.getArticle.useQuery();

  console.log(dede.data);

  return <div className="p-4 bg-white rounded-lg shadow">amongus</div>;
}
