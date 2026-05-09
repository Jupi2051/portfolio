import { useMutation } from "@tanstack/react-query";
import { uploadVicoSketchImage } from "./vico-sketch-upload-api";

type UploadVars = {
  blob: Blob;
  title: string;
  author: string;
};

export function useVicoSketchUploadMutation() {
  return useMutation({
    mutationFn: (vars: UploadVars) => uploadVicoSketchImage(vars),
  });
}
