import cn from "classnames";
import { useEscapeKey } from "./use-escape-key";

type Props = {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
};

export default function VicoLeaveStudioDialog({
  open,
  onStay,
  onLeave,
}: Props) {
  useEscapeKey(open, onStay);

  if (!open) return null;

  return (
    <div
      className="absolute inset-0 z-45 flex items-center justify-center bg-ctp-crust/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vico-leave-studio-title"
      aria-describedby="vico-leave-studio-desc"
      onClick={onStay}
    >
      <div
        className={cn(
          "w-full max-w-md rounded-xl border border-ctp-surface1 bg-ctp-mantle p-5 shadow-xl ring-1 ring-black/20",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="vico-leave-studio-title"
          className="font-capirola text-lg font-semibold text-ctp-text"
        >
          Leave the studio?
        </h2>
        <p
          id="vico-leave-studio-desc"
          className="mt-2 text-sm leading-relaxed text-ctp-subtext1"
        >
          There is something on your canvas. Switch to the gallery anyway?
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-ctp-surface1 bg-ctp-base px-4 py-2 text-sm font-medium text-ctp-subtext1 transition hover:bg-ctp-surface0 hover:text-ctp-text"
            onClick={onStay}
          >
            Stay
          </button>
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-ctp-lavender/50 bg-ctp-lavender/20 px-4 py-2 text-sm font-medium text-ctp-lavender transition hover:bg-ctp-lavender/30"
            onClick={onLeave}
          >
            Go to gallery
          </button>
        </div>
      </div>
    </div>
  );
}
