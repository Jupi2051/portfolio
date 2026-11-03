import { useApplicationData } from "@/context/app-context"
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls"
import { primaryButtonClassName } from "./controls-panel-header"

const SuccessNotification = () => {
  const app = useApplicationData()
  const { closeApplication } = useGlobalWindowsControls()
  const { processData } = useApplicationData<{
    notificationData: {
      title: string
    }
  }>()

  return (
    <div className="flex size-full flex-col justify-between gap-3 bg-panel p-5">
      <div className="flex items-center gap-3.5">
        <img
          src="/Imgs/Chloe/Excited.webp"
          alt=""
          className="h-16 w-12 shrink-0 object-contain"
        />
        <p className="text-[15px] leading-5.5 font-medium text-moon">
          {processData?.notificationData.title}
        </p>
      </div>
      <button
        type="button"
        className={`${primaryButtonClassName} w-full`}
        onClick={() => closeApplication(app.AppId)}
      >
        Got it
      </button>
    </div>
  )
}

export default SuccessNotification
