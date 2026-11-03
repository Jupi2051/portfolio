import { useEffect, useState } from "react"
import { format } from "date-fns"
import cn from "classnames"
import { VolumeIcon, WifiIcon } from "@/components/ui/icons"

function SystemTray({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={cn(
        "h-13 items-center gap-3.5 rounded-[18px] border border-white/12 bg-ink/58 pr-4.5 pl-4 backdrop-blur-xl select-none",
        "shadow-[0_16px_40px_rgba(8,7,20,0.4)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-lilac">
        <WifiIcon className="size-4.5" aria-label="Connected" />
        <VolumeIcon className="size-4.5" aria-label="Volume" />
      </div>
      <div className="h-5.5 w-px bg-white/14" />
      <div className="flex flex-col items-end">
        <span className="text-[13px] leading-4.25 font-medium text-moon tabular-nums">
          {format(now, "p")}
        </span>
        <span className="text-xs leading-3.75 text-haze">
          {format(now, "EEE d MMM")}
        </span>
      </div>
    </div>
  )
}

export default SystemTray
