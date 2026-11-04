import cn from "classnames"
import { CameraIcon } from "@/components/ui/icons"

type Props = {
  onClick: () => void
  isCapturing: boolean
}

/** Studio header CTA — captures the canvas and opens the publish dialog. */
export default function VicoCaptureButton({ onClick, isCapturing }: Props) {
  return (
    <button
      type="button"
      title="Capture your sketch and publish it"
      disabled={isCapturing}
      onClick={onClick}
      className={cn(
        "flex h-9 shrink-0 cursor-pointer items-center gap-1.75 rounded-[10px] bg-holo pr-3.5 pl-3 text-[13px] leading-4 font-semibold text-ink-deep outline-none",
        "transition-[background-color,scale] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.97]",
        "focus-visible:shadow-[0_0_0_4px_rgba(140,142,255,0.3)] disabled:cursor-wait",
      )}
    >
      {isCapturing ? (
        <span
          className="size-3.75 animate-spin rounded-full border-2 border-ink-deep border-t-transparent"
          aria-hidden
        />
      ) : (
        <CameraIcon className="size-3.75" />
      )}
      <span>
        Publish<span className="hidden @md/appwindow:inline"> sketch</span>
      </span>
    </button>
  )
}
