import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
  isCapturing: boolean;
};

export default function VicoCaptureButton({
  onClick,
  isCapturing,
}: Props) {
  return (
    <button
      type="button"
      title="Capture canvas and publish"
      aria-label="Capture canvas and publish"
      disabled={isCapturing}
      className={cn(
        "absolute bottom-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ctp-surface1 bg-ctp-base text-ctp-lavender shadow-lg transition",
        "hover:border-ctp-lavender/50 hover:bg-ctp-surface0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-lavender/50",
        "disabled:cursor-wait disabled:opacity-70",
      )}
      onClick={onClick}
    >
      {isCapturing ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-ctp-lavender border-t-transparent"
          aria-hidden
        />
      ) : (
        <FontAwesomeIcon icon={faCamera} className="text-lg" />
      )}
    </button>
  );
}
