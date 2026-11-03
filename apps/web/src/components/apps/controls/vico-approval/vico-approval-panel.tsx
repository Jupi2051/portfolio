import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/trpc";
import { getVicoSketchWebpUrl } from "@/components/apps/vico/gallery/public-image-url";
import ControlsPanelHeader, { ControlsTabs } from "../controls-panel-header";
import { ArrowRightIcon } from "@/components/ui/icons";
import VicoPendingSketchesColumn from "./vico-pending-sketches-column";
import VicoApprovedSketchesColumn from "./vico-approved-sketches-column";
import VicoSketchCropModal from "./vico-sketch-crop-modal";

type Tab = "waiting" | "gallery";

export default function VicoApprovalPanel() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("waiting");
  const [cropTarget, setCropTarget] = useState<{
    imageId: string;
    title: string;
  } | null>(null);
  /** Bumped after crop so `<img src>` URLs change and the browser does not show a cached WebP. */
  const [sketchImageCacheBust, setSketchImageCacheBust] = useState(0);

  const approvedQuery = useQuery(trpc.vico.list.queryOptions());
  const pendingQuery = useQuery(trpc.vico.listUnapproved.queryOptions());

  const invalidateVicoQueries = useCallback(async () => {
    await queryClient.invalidateQueries(trpc.vico.pathFilter());
  }, [queryClient, trpc]);

  const approveMutation = useMutation({
    ...trpc.vico.approve.mutationOptions(),
    onSuccess: () => {
      void invalidateVicoQueries();
    },
  });

  const deleteMutation = useMutation({
    ...trpc.vico.delete.mutationOptions(),
    onSuccess: (data) => {
      if (!data || !("ok" in data)) return;
      void invalidateVicoQueries();
    },
  });

  const approved =
    approvedQuery.data?.filter((s): s is typeof s & { imageId: string } =>
      Boolean(s.imageId),
    ) ?? [];

  const pending =
    pendingQuery.data?.filter((s): s is typeof s & { imageId: string } =>
      Boolean(s.imageId),
    ) ?? [];

  const handleApprove = (id: string) => {
    approveMutation.mutate({ id, approved: true });
  };

  const handleRevokeApproval = (id: string) => {
    approveMutation.mutate({ id, approved: false });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const handleCropSaved = useCallback(async () => {
    setSketchImageCacheBust((n) => n + 1);
    await invalidateVicoQueries();
  }, [invalidateVicoQueries]);

  const isPendingColumnBusy =
    approveMutation.isPending || deleteMutation.isPending;

  const openCrop = (sketch: { imageId: string; title: string }) =>
    setCropTarget({ imageId: sketch.imageId, title: sketch.title });

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <ControlsPanelHeader
        title="Vico approvals"
        actions={
          <ControlsTabs
            value={tab}
            onChange={setTab}
            tabs={[
              {
                value: "waiting",
                label: "Waiting",
                badge:
                  pending.length > 0 ? (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-melon px-1.25 text-2xs leading-3 font-bold text-white">
                      {pending.length}
                    </span>
                  ) : null,
              },
              {
                value: "gallery",
                label: "In gallery",
                badge: (
                  <span className="text-xs font-medium text-haze-dim">
                    {approved.length}
                  </span>
                ),
              },
            ]}
          />
        }
      />

      <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-6 py-6 [scrollbar-color:rgba(255,255,255,0.14)_transparent] scrollbar-thin @2xl/appwindow:px-8">
        <p className="text-[13px] leading-4.5 text-haze">
          {tab === "waiting"
            ? "Approved sketches show up in the public Vico gallery."
            : "Live in the public gallery — hide one to send it back for review."}
        </p>

        {tab === "waiting" ? (
          <>
            <VicoPendingSketchesColumn
              pendingQuery={pendingQuery}
              pending={pending}
              sketchImageCacheBust={sketchImageCacheBust}
              onApprove={handleApprove}
              onDelete={handleDelete}
              onOpenCrop={openCrop}
              isBusy={isPendingColumnBusy}
            />
            {approved.length > 0 && (
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-white/6 bg-white/3 py-3 pr-3.5 pl-4">
                <div className="flex items-center gap-3.5">
                  <span className="text-xs leading-4 font-semibold tracking-[0.14em] text-haze uppercase">
                    Recently approved
                  </span>
                  <div className="flex gap-1.5">
                    {approved.slice(0, 5).map((sketch) => (
                      <img
                        key={sketch.id}
                        src={getVicoSketchWebpUrl(sketch.imageId, sketchImageCacheBust)}
                        alt={sketch.title}
                        className="size-10 rounded-[9px] border border-white/12 bg-paper object-cover"
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTab("gallery")}
                  className="flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-holo-soft transition-colors duration-150 hover:text-moon"
                >
                  See all {approved.length}
                  <ArrowRightIcon className="size-3.25" />
                </button>
              </div>
            )}
          </>
        ) : (
          <VicoApprovedSketchesColumn
            approvedQuery={approvedQuery}
            approved={approved}
            sketchImageCacheBust={sketchImageCacheBust}
            onRevokeApproval={handleRevokeApproval}
            onOpenCrop={openCrop}
            isMutating={isPendingColumnBusy}
          />
        )}
      </div>

      {cropTarget ? (
        <VicoSketchCropModal
          open
          imageId={cropTarget.imageId}
          title={cropTarget.title}
          imageUrl={getVicoSketchWebpUrl(
            cropTarget.imageId,
            sketchImageCacheBust,
          )}
          onClose={() => setCropTarget(null)}
          onSaved={handleCropSaved}
        />
      ) : null}
    </div>
  );
}
