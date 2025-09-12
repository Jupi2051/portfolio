import { useTRPC } from "@/lib/trpc/trpc";

export function TRPCDemo() {
  const trpc = useTRPC();
  const { data } = trpc.blog.getArticle.useQuery();
  return <div className="p-4 bg-white rounded-lg shadow">amongus</div>;
}
