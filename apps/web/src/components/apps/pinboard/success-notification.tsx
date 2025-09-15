import { useApplicationData } from "@/context/app-context";
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";

const SuccessNotification = () => {
  const app = useApplicationData();
  const { closeApplication } = useGlobalWindowsControls();

  return (
    <div className="flex flex-col items-center gap-2 p-4 w-full h-full bg-ctp-base">
      <div className="flex items-center gap-2 text-white">
        <img src="/Imgs/Chloe/Excited.webp" className="w-16" alt="Success" />
        <p className="font-capirola text-2xl">Message Pinned Successfully</p>
      </div>
      <button
        className="bg-ctp-surface0 py-2 px-4 w-full font-lato text-ctp-text border-2 cursor-pointer border-transparent hover:border-ctp-lavender-300 duration-200 transition-colors rounded-md self-end"
        onClick={() => closeApplication(app.AppId)}
      >
        Awesome
      </button>
    </div>
  );
};

export default SuccessNotification;
