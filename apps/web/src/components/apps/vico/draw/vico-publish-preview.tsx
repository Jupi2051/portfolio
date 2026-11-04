import { forwardRef } from "react";
import cn from "classnames";
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

/** Croppie, restyled to the studio: dotted boundary, solid holo frame, dimmed outside. */
// `!` because croppie.css loads after Tailwind and uses equal specificity.
const cropperChrome = cn(
  "w-full",
  "[&_.croppie-container]:mx-auto [&_.croppie-container]:h-auto!",
  "[&_.cr-boundary]:overflow-hidden [&_.cr-boundary]:rounded-[14px] [&_.cr-boundary]:bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [&_.cr-boundary]:bg-size-[16px_16px]",
  "[&_.cr-viewport]:rounded-md! [&_.cr-viewport]:border-[1.5px]! [&_.cr-viewport]:border-solid! [&_.cr-viewport]:border-holo-soft! [&_.cr-viewport]:shadow-[0_0_0_999px_rgba(10,9,22,0.55)]!",
  "[&_.cr-slider-wrap]:mx-auto! [&_.cr-slider-wrap]:mt-3.5! [&_.cr-slider-wrap]:mb-0! [&_.cr-slider-wrap]:w-full! [&_.cr-slider-wrap]:px-1",
  "[&_.cr-slider]:w-full! [&_.cr-slider]:max-w-none! [&_.cr-slider]:cursor-pointer",
  "[&_.cr-slider::-webkit-slider-runnable-track]:bg-white/12! [&_.cr-slider::-moz-range-track]:bg-white/12!",
  "[&_.cr-slider::-webkit-slider-thumb]:bg-moon-bright! [&_.cr-slider::-moz-range-thumb]:bg-moon-bright! [&_.cr-slider::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(6,5,16,0.5)]",
);

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
        boundaryMaxHeightPx={300}
        className={cropperChrome}
      />
    );
  },
);

export default VicoPublishPreview;
