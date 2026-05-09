import { useMutation } from "@tanstack/react-query";
import { canvasToWebpBlob } from "./vico-canvas-capture";

export function useVicoCanvasWebpCapture() {
  return useMutation({
    mutationFn: (canvas: HTMLCanvasElement) => canvasToWebpBlob(canvas),
  });
}
