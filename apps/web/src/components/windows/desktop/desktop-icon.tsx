import { useState } from "react";
import { OpenApplication } from "@/components/windows/desktop";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";
import cn from "classnames";
import { motion, Variants } from "framer-motion";
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
  isMovingAnIcon?: boolean;
};

const AnimationFrames: Variants = {
  hover: {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 10,
    },
  },
  selected: {
    y: [-0, -5, -0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  unselected: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

function DesktopIcon(Props: PropTypes) {
  const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
  const [hasInitialAnimationPlayed, setHasInitialAnimationPlayed] =
    useState(false);
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!isTouchDevice && !(event.detail === 2 || event.detail === 0)) return;
    openLinkedApplication();
  };

  return (
    <motion.button
      style={{ ...Props.Style }}
      className={cn(
        "Desktop-Icon-Container",
        "relative flex flex-col w-[90px] h-[90px] pb-4 items-center justify-center text-white select-none isolate",
        'after:content-[" "] after:pointer-events-none after:w-[98%] after:h-full after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-transparent after:z-[-1] after:blur-lg after:transition-opacity after:duration-200 hover:after:bg-[#00003A]/40 active:after:opacity-0',
        {
          "after:bg-gradient-to-tl after:from-[#00003A]/40 after:to-[#00003A]/40 after:blur-lg":
            Props.Selected,
        }
      )}
      data-id={Props.id}
      onClick={onClickApplication}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.3,
        delay: hasInitialAnimationPlayed ? 0 : (Props.index || 0) * 0.15,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      onAnimationComplete={() => {
        if (!hasInitialAnimationPlayed) setHasInitialAnimationPlayed(true);
      }}
      whileHover={"hover"}
      whileTap={"tap"}
    >
      <motion.img
        src={Props.Icon}
        className="pointer-events-none max-h-[50px] max-w-[55px]"
        variants={AnimationFrames}
        animate={Props.Selected ? "selected" : "unselected"}
      />
      <h1 className="absolute bottom-0 font-normal text-xs mt-1.5 select-none pointer-events-none uppercase text-center font-roboto-condensed">
        {ApplicationName}
      </h1>
    </motion.button>
  );
}

export default DesktopIcon;
