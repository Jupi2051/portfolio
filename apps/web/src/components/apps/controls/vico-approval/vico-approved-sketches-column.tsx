import type { UseQueryResult } from "@tanstack/react-query";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrop } from "@fortawesome/free-solid-svg-icons";
import { getVicoSketchWebpUrl } from "@/components/apps/vico/gallery/public-image-url";
import type { SketchWithImage } from "./sketch-types";

type Props = {
  /** Passed to sketch image URLs so cached WebPs reload after server-side crop. */
  sketchImageCacheBust: number;
  approvedQuery: UseQueryResult<
    {
      id: string;
      title: string;
      author: string;
      createdAt: string;
      imageId: string | null;
    }[],
    unknown
  >;
  approved: SketchWithImage[];
  onRevokeApproval: (id: string) => void;
  onOpenCrop: (sketch: SketchWithImage) => void;
  isMutating: boolean;
};

export default function VicoApprovedSketchesColumn({
  sketchImageCacheBust,
  approvedQuery,
  approved,
  onRevokeApproval,
  onOpenCrop,
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
          Sketches visible in the gallery — use Remove to send back to pending,
          or Crop to adjust the image file.
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
              <li
                key={sketch.id}
                className="overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-base"
              >
                <div className="aspect-square w-full bg-ctp-crust">
                  <img
                      src={getVicoSketchWebpUrl(
                        sketch.imageId,
                        sketchImageCacheBust,
                      )}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2 p-2">
                  <p className="line-clamp-2 font-capirola text-xs font-medium text-ctp-text">
                    {sketch.title}
                  </p>
                  <p className="truncate text-[10px] text-ctp-subtext1">
                    {sketch.author}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      disabled={isMutating}
                      title="Crop image"
                      aria-label="Crop image"
                      onClick={() => onOpenCrop(sketch)}
                      className={cn(
                        "inline-flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-md border border-ctp-teal/45 bg-ctp-teal/10 px-2 py-1.5 text-[11px] font-medium text-ctp-teal transition",
                        "hover:bg-ctp-teal/20 disabled:cursor-not-allowed disabled:opacity-60",
                      )}
                    >
                      <FontAwesomeIcon icon={faCrop} className="text-[10px]" />
                      Crop
                    </button>
                    <button
                      type="button"
                      disabled={isMutating}
                      title="Remove from gallery — send back to pending approval"
                      onClick={() => onRevokeApproval(sketch.id)}
                      className={cn(
                        "inline-flex flex-1 cursor-pointer items-center justify-center rounded-md border border-ctp-peach/50 bg-ctp-peach/10 px-2 py-1.5 text-[11px] font-medium text-ctp-peach transition",
                        "hover:bg-ctp-peach/20 disabled:cursor-not-allowed disabled:opacity-60",
                      )}
                    >
                      Remove
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
