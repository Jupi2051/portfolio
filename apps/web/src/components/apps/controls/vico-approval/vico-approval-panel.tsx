import { useState } from "react";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [cropTarget, setCropTarget] = useState<{
    imageId: string;
    title: string;
  } | null>(null);

  const approvedQuery = useQuery(trpc.vico.list.queryOptions());
  const pendingQuery = useQuery(trpc.vico.listUnapproved.queryOptions());

  const approveMutation = useMutation({
    ...trpc.vico.approve.mutationOptions(),
    onSuccess: () => {
      void approvedQuery.refetch();
      void pendingQuery.refetch();
    },
  });

  const deleteMutation = useMutation({
    ...trpc.vico.delete.mutationOptions(),
    onSuccess: (data) => {
      if (!data || !("ok" in data)) return;
      void approvedQuery.refetch();
      void pendingQuery.refetch();
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

  const handleCropSaved = () => {
    void approvedQuery.refetch();
    void pendingQuery.refetch();
  };

  const isPendingColumnBusy =
    approveMutation.isPending || deleteMutation.isPending;

  return (
    <div className="relative flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-linear-to-br from-ctp-base to-ctp-mantle p-4">
      <VicoApprovalHeader onBack={onBack} />

      <div className="grid min-h-0 flex-1 gap-4 overflow-hidden lg:grid-cols-2 lg:gap-6">
        <VicoPendingSketchesColumn
          pendingQuery={pendingQuery}
          pending={pending}
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
          imageUrl={getVicoSketchWebpUrl(cropTarget.imageId)}
          onClose={() => setCropTarget(null)}
          onSaved={handleCropSaved}
        />
      ) : null}
    </div>
  );
}
