type Props = {
  onBack: () => void;
  backLabel?: string;
};

export default function ControlsBackBar({
  onBack,
  backLabel = "← All controls",
}: Props) {
  return (
    <div className="shrink-0 border-b border-ctp-surface1 bg-ctp-mantle/90 px-4 py-2">
      <button
        type="button"
        onClick={onBack}
        className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-base px-3 py-1.5 text-xs font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text"
      >
        {backLabel}
      </button>
    </div>
  );
}
