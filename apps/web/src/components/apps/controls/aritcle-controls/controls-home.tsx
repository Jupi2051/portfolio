import cn from "classnames";

type Props = {
  onSelectArticles: () => void;
  onSelectVico: () => void;
};

export default function ControlsHome({
  onSelectArticles,
  onSelectVico,
}: Props) {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-8 bg-linear-to-br from-ctp-base to-ctp-mantle p-8">
      <div className="text-center">
        <h2 className="font-capirola text-2xl font-bold text-ctp-text">
          Controls
        </h2>
        <p className="mt-2 max-w-md text-sm text-ctp-subtext1">
          Choose what you want to manage.
        </p>
      </div>
      <div className="flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onSelectArticles}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-ctp-lavender/40 bg-ctp-mantle px-6 py-8 text-center shadow-lg transition",
            "hover:border-ctp-lavender hover:bg-ctp-surface0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-lavender/50",
          )}
        >
          <span className="text-3xl" aria-hidden>
            ✏️
          </span>
          <span className="font-capirola text-lg font-semibold text-ctp-text">
            Blog & editor
          </span>
          <span className="text-xs text-ctp-subtext1">
            Write and publish articles with the rich text editor.
          </span>
        </button>
        <button
          type="button"
          onClick={onSelectVico}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-ctp-peach/45 bg-ctp-mantle px-6 py-8 text-center shadow-lg transition",
            "hover:border-ctp-peach hover:bg-ctp-surface0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-peach/50",
          )}
        >
          <span className="text-3xl" aria-hidden>
            🖼️
          </span>
          <span className="font-capirola text-lg font-semibold text-ctp-text">
            Vico approvals
          </span>
          <span className="text-xs text-ctp-subtext1">
            Review sketches and approve them for the public gallery.
          </span>
        </button>
      </div>
    </div>
  );
}
