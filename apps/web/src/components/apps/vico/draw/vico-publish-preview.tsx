type Props = {
  previewUrl: string;
};

export default function VicoPublishPreview({ previewUrl }: Props) {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-crust">
      <img
        src={previewUrl}
        alt="Sketch preview"
        className="mx-auto max-h-48 w-full object-contain"
      />
    </div>
  );
}
