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
      title="Capture your sketch and publish it"
      aria-label="Capture canvas and publish sketch"
      disabled={isCapturing}
      className={cn(
        "z-20 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-xl transition",
        "border-2 border-ctp-lavender bg-ctp-lavender text-ctp-crust",
        "ring-4 ring-ctp-lavender/35 hover:ring-ctp-lavender/55",
        "hover:brightness-110 hover:shadow-[0_0_28px_rgba(186,187,241,0.5)] active:scale-[0.96]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ctp-lavender/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-mantle",
        "disabled:cursor-wait disabled:opacity-90",
      )}
      onClick={onClick}
    >
      {isCapturing ? (
        <span
          className="h-6 w-6 animate-spin rounded-full border-2 border-ctp-crust border-t-transparent"
          aria-hidden
        />
      ) : (
        <FontAwesomeIcon icon={faCamera} className="text-2xl" />
      )}
    </button>
  );
}
