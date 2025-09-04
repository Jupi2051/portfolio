import { motion } from "framer-motion";
import AppWindow from "@/components/windows/app-window";

type PropTypes = {
  AppId: number;
  processName: string;
  processIcon: string;
  processData: Object;
};

function Photos(Props: PropTypes) {
  const PassedData = Props.processData as any;

  return (
    <AppWindow
      AppId={Props.AppId}
      processIcon={Props.processIcon}
      processName={Props.processName}
    >
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <img
          className="max-w-10/12 max-h-10/12 select-none"
          src={PassedData.openedImage}
        />
      </div>
    </AppWindow>
  );
}

export default Photos;
