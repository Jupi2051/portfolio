import { useMutation } from "@tanstack/react-query";
import {
  captureCanvasForPublish,
  type VicoCanvasCaptureResult,
} from "./vico-canvas-capture";

export function useVicoCanvasWebpCapture() {
  return useMutation({
    mutationFn: (canvas: HTMLCanvasElement): Promise<VicoCanvasCaptureResult> =>
      captureCanvasForPublish(canvas),
  });
}
