import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/trpc";
import { getVicoSketchWebpUrl } from "@/components/apps/vico/gallery/public-image-url";
import VicoApprovalHeader from "./vico-approval-header";
import VicoPendingSketchesColumn from "./vico-pending-sketches-column";
import VicoApprovedSketchesColumn from "./vico-approved-sketches-column";
import VicoSketchCropModal from "./vico-sketch-crop-modal";

type Props = {
  onBack: () => void;
};

export default function VicoApprovalPanel({ onBack }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
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

  return (
    <div className="relative flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-linear-to-br from-ctp-base to-ctp-mantle p-4">
      <VicoApprovalHeader onBack={onBack} />

      <div className="grid min-h-0 flex-1 gap-4 overflow-hidden lg:grid-cols-2 lg:gap-6">
        <VicoPendingSketchesColumn
          pendingQuery={pendingQuery}
          pending={pending}
          sketchImageCacheBust={sketchImageCacheBust}
          onApprove={handleApprove}
          onDelete={handleDelete}
          onOpenCrop={(sketch) =>
            setCropTarget({ imageId: sketch.imageId, title: sketch.title })
          }
          isBusy={isPendingColumnBusy}
        />
        <VicoApprovedSketchesColumn
          approvedQuery={approvedQuery}
          approved={approved}
          sketchImageCacheBust={sketchImageCacheBust}
          onRevokeApproval={handleRevokeApproval}
          onOpenCrop={(sketch) =>
            setCropTarget({ imageId: sketch.imageId, title: sketch.title })
          }
          isMutating={isPendingColumnBusy}
        />
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
