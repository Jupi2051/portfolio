import { forwardRef } from "react";
import VicoImageCropper, {
  type VicoImageCropperHandle,
  vicoImageCropperChromeClassName,
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
        className={`mb-4 ${vicoImageCropperChromeClassName}`}
      />
    );
  },
);

export default VicoPublishPreview;
