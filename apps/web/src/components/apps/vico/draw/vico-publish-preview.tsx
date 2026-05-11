import { forwardRef } from "react";
import VicoImageCropper, {
  type VicoImageCropperHandle,
} from "@/components/apps/vico/shared/vico-image-cropper";

/** @deprecated Use VicoImageCropperHandle */
export type VicoPublishCropPreviewHandle = VicoImageCropperHandle;

type Props = {
  previewUrl: string;
  cropAspectWidth: number;
  cropAspectHeight: number;
  onCropperReady: (ready: boolean) => void;
};

const VicoPublishPreview = forwardRef<VicoImageCropperHandle, Props>(
  function VicoPublishPreview(
    { previewUrl, cropAspectWidth, cropAspectHeight, onCropperReady },
    ref,
  ) {
    return (
      <VicoImageCropper
        ref={ref}
        imageUrl={previewUrl}
        aspectWidth={cropAspectWidth}
        aspectHeight={cropAspectHeight}
        onCropperReady={onCropperReady}
        className="mb-4 w-full [&_.croppie-container]:mx-auto [&_.cr-slider-wrap]:mt-3 [&_.cr-slider-wrap]:px-1"
      />
    );
  },
);

export default VicoPublishPreview;
