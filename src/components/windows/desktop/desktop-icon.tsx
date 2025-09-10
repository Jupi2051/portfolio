import { useState } from "react";
import { OpenApplication } from "@/components/windows/desktop";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";
import cn from "classnames";
import { motion } from "framer-motion";
import useGlobalTaskbarControls from "@/hooks/use-global-taskbar-controls";
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";
import { useTouchDevice } from "@/hooks/use-touch-device";

type PropTypes = {
  ApplicationName: string;
  Icon: string;
  id: number;
  customTaskbarIcon?: string;
  Style?: {
    gridRow?: number;
    gridColumn?: number;
  };
  Selected: boolean;
  AppName: DesktopAppsList;
  processData?: Object;
  index?: number;
};

function DesktopIcon(Props: PropTypes) {
  const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
  const { openNewApplication } = useGlobalWindowsControls();
  const { openNewTaskbarApplication } = useGlobalTaskbarControls();
  const isTouchDevice = useTouchDevice();

  const openLinkedApplication = () => {
    const id = +new Date();

    const ApplicationObject: OpenApplication = {
      id,
      App: Props.AppName,
      processIcon: Props.customTaskbarIcon ?? Props.Icon,
      processName: Props.ApplicationName,
      processData: Props.processData,
    };

    const { focusWindow, bringWindowToFront, app } =
      openNewApplication(ApplicationObject);
    focusWindow();
    bringWindowToFront();
    openNewTaskbarApplication({
      id: app.id,
      AppId: app.id,
      Icon: Props.Icon,
      CustomTaskbarIcon: Props.customTaskbarIcon,
    });
  };

  const onClickApplication = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isTouchDevice) {
      openLinkedApplication();
    } else if (event.detail === 2) {
      openLinkedApplication();
    }
  };

  return (
    <motion.div
      style={{ ...Props.Style }}
      className={cn(
        "Desktop-Icon-Container",
        "relative flex flex-col w-[90px] h-[90px] pb-4 items-center justify-center text-white select-none isolate",
        'after:content-[" "] after:pointer-events-none after:w-[98%] after:h-full after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-transparent after:z-[-1] hover:after:bg-white/15',
        { "after:bg-white/15": Props.Selected }
      )}
      data-id={Props.id}
      onClick={onClickApplication}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.3,
        delay: (Props.index || 0) * 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      <img src={Props.Icon} className="pointer-events-none max-h-[50px]" />
      <h1
        className="absolute bottom-1 font-segoe-ui-light font-thin text-xs mt-1.5 select-none pointer-events-none"
        style={{
          textShadow:
            "-1px -1px 1px #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          filter: "drop-shadow(0px 1px 2px #000)",
        }}
      >
        {ApplicationName}
      </h1>
    </motion.div>
  );
}

export default DesktopIcon;
