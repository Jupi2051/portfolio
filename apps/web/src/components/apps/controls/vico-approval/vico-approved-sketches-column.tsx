import type { UseQueryResult } from "@tanstack/react-query";
import cn from "classnames";
import { getVicoSketchWebpUrl } from "@/components/apps/vico/gallery/public-image-url";
import type { SketchWithImage } from "./sketch-types";

type Props = {
  approvedQuery: UseQueryResult<
    {
      id: string;
      title: string;
      author: string;
      createdAt: string;
      imageId: string | null;
    }[],
    Error
  >;
  approved: SketchWithImage[];
  onRevokeApproval: (id: string) => void;
  isMutating: boolean;
};

export default function VicoApprovedSketchesColumn({
  approvedQuery,
  approved,
  onRevokeApproval,
  isMutating,
}: Props) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-xl border-2 border-ctp-green/40 bg-ctp-mantle/90 shadow-inner",
      )}
      aria-labelledby="vico-approved-heading"
    >
      <div className="shrink-0 border-b border-ctp-green/20 bg-ctp-green/10 px-4 py-3">
        <h3
          id="vico-approved-heading"
          className="font-capirola text-base font-semibold text-ctp-green"
        >
          Approved / live
        </h3>
        <p className="mt-0.5 text-xs text-ctp-subtext1">
          Sketches visible in the gallery — click one to send it back to pending
          approval.
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {approvedQuery.isLoading ? (
          <p className="text-sm text-ctp-subtext0">Loading…</p>
        ) : approvedQuery.isError ? (
          <p className="rounded-lg border border-ctp-red/40 bg-ctp-red/10 px-3 py-2 text-sm text-ctp-red">
            Could not load approved list.
          </p>
        ) : approved.length === 0 ? (
          <p className="text-sm text-ctp-subtext1">
            No approved sketches yet.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            {approved.map((sketch) => (
              <li key={sketch.id}>
                <button
                  type="button"
                  disabled={isMutating}
                  title="Remove from gallery — send back to pending approval"
                  onClick={() => onRevokeApproval(sketch.id)}
                  className={cn(
                    "w-full cursor-pointer overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-base text-left transition",
                    "hover:border-ctp-peach/60 hover:ring-2 hover:ring-ctp-peach/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-peach/50",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                >
                  <div className="aspect-square w-full bg-ctp-crust">
                    <img
                      src={getVicoSketchWebpUrl(sketch.imageId)}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2">
                    <p className="line-clamp-2 font-capirola text-xs font-medium text-ctp-text">
                      {sketch.title}
                    </p>
                    <p className="truncate text-[10px] text-ctp-subtext1">
                      {sketch.author}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
