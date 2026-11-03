import { useApplicationData } from "@/context/app-context"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"

const SuccessNotification = () => {
  const app = useApplicationData()
  const { closeApplication } = useGlobalWindowsControls()

  return (
    <div className="flex size-full flex-col justify-between gap-3 bg-panel p-5">
      <div className="flex items-center gap-3.5">
        <img src="/Imgs/Chloe/Excited.webp" className="h-16 w-12 object-contain" alt="" />
        <p className="font-serif text-2xl text-moon-bright italic">Note pinned!</p>
      </div>
      <button
        type="button"
        className="flex h-9 w-full cursor-pointer items-center justify-center rounded-[10px] bg-holo text-[13px] font-semibold text-ink-deep transition-[background-color,scale] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.97]"
        onClick={() => closeApplication(app.AppId)}
      >
        Got it
      </button>
    </div>
  )
}

export default SuccessNotification
