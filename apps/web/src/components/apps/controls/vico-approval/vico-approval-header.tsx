type Props = {
  onBack: () => void;
};

export default function VicoApprovalHeader({ onBack }: Props) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-mantle px-3 py-1.5 text-sm font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text"
      >
        ← Controls home
      </button>
      <h2 className="font-capirola text-lg font-semibold text-ctp-text">
        Vico sketches
      </h2>
    </div>
  );
}
