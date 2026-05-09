const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type VicoSketchUploadResult = {
  id: string;
  sketchId: string;
  fileName: string;
};

export async function uploadVicoSketchImage(input: {
  blob: Blob;
  title: string;
  author: string;
}): Promise<VicoSketchUploadResult> {
  const formData = new FormData();
  formData.append("image", input.blob, "sketch.webp");
  formData.append("title", input.title);
  formData.append("author", input.author);

  const res = await fetch(`${API_BASE}/vico/sketch-image`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    id?: string;
    sketchId?: string;
    fileName?: string;
  };

  if (!res.ok) {
    throw new Error(data.error ?? `Upload failed (${res.status})`);
  }

  if (!data.id || !data.sketchId || !data.fileName) {
    throw new Error("Invalid response from server");
  }

  return {
    id: data.id,
    sketchId: data.sketchId,
    fileName: data.fileName,
  };
}
