import type { UseQueryResult } from "@tanstack/react-query";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCrop, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getVicoSketchWebpUrl } from "@/components/apps/vico/gallery/public-image-url";

import type { SketchWithImage } from "./sketch-types";

type Props = {
  pendingQuery: UseQueryResult<
    {
      id: string;
      title: string;
      author: string;
      createdAt: string;
      imageId: string | null;
    }[],
    unknown
  >;
  pending: SketchWithImage[];
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenCrop: (sketch: SketchWithImage) => void;
  isBusy: boolean;
};

export default function VicoPendingSketchesColumn({
  pendingQuery,
  pending,
  onApprove,
  onDelete,
  onOpenCrop,
  isBusy,
}: Props) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-xl border-2 border-ctp-yellow/45 bg-ctp-mantle/90 shadow-inner",
      )}
      aria-labelledby="vico-pending-heading"
    >
      <div className="shrink-0 border-b border-ctp-yellow/25 bg-ctp-yellow/10 px-4 py-3">
        <h3
          id="vico-pending-heading"
          className="font-capirola text-base font-semibold text-ctp-yellow"
        >
          Pending approval
        </h3>
        <p className="mt-0.5 text-xs text-ctp-subtext1">
          Submissions waiting for review — approve to show them in the public
          gallery.
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {pendingQuery.isLoading ? (
          <p className="text-sm text-ctp-subtext0">Loading…</p>
        ) : pendingQuery.isError ? (
          <p className="rounded-lg border border-ctp-red/40 bg-ctp-red/10 px-3 py-2 text-sm text-ctp-red">
            Could not load pending sketches (check that you are logged in).
          </p>
        ) : pending.length === 0 ? (
          <p className="text-sm text-ctp-subtext1">
            Nothing in the queue right now.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {pending.map((sketch) => (
              <li
                key={sketch.id}
                className="overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-base"
              >
                <div className="aspect-video w-full bg-ctp-crust">
                  <img
                    src={getVicoSketchWebpUrl(sketch.imageId)}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="space-y-2 p-3">
                  <p className="font-capirola text-sm font-semibold text-ctp-text">
                    {sketch.title}
                  </p>
                  <p className="text-xs text-ctp-subtext1">{sketch.author}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => onApprove(sketch.id)}
                      className={cn(
                        "inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-ctp-green/50 bg-ctp-green/15 px-3 py-2 text-sm font-medium text-ctp-green transition",
                        "hover:bg-ctp-green/25 disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    >
                      <FontAwesomeIcon icon={faCheck} className="text-sm" />
                      Approve for gallery
                    </button>
                    <button
                      type="button"
                      disabled={isBusy}
                      title="Crop image"
                      aria-label="Crop image"
                      onClick={() => onOpenCrop(sketch)}
                      className={cn(
                        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-ctp-teal/45 bg-ctp-teal/10 px-3 py-2 text-sm font-medium text-ctp-teal transition",
                        "hover:bg-ctp-teal/20 disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    >
                      <FontAwesomeIcon icon={faCrop} className="text-sm" />
                      Crop
                    </button>
                    <button
                      type="button"
                      disabled={isBusy}
                      title="Delete sketch"
                      aria-label="Delete sketch"
                      onClick={() => onDelete(sketch.id)}
                      className={cn(
                        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-ctp-red/45 bg-ctp-red/10 px-3 py-2 text-sm font-medium text-ctp-red transition",
                        "hover:bg-ctp-red/20 disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
