import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/storage/store";
import { setRenderStartMenu } from "@/storage/slices/taskbar";
import { setFocusedApp, setMinimizedState } from "@/storage/slices/desktop";
import { bringToFront } from "@/storage/slices/main";
import cn from "classnames";

type PropTypes = {
  Icon: string;
  HideStatusBar?: boolean;
  isWindowsIcon?: boolean;
  AppId?: number;
};

const AnimationFrames: Variants = {
  init: { y: 50 },
  enterance: {
    y: 0,
    transition: { type: "spring", stiffness: 60, mass: 0.85 },
  },
  jump: {
    y: [0, -4, 0], // Go up and back down
    transition: {
      duration: 0.25,
      ease: ["easeOut", "easeIn"],
      times: [0, 1],
    },
  },
  drop: {
    y: [0, 3, 0],
    transition: { duration: 0.25, ease: ["easeOut", "easeIn"], times: [0, 1] },
  },
  tap: { scale: 0.825 },
};

function TaskBarApp(Props: PropTypes) {
  const MinimizedData = useSelector(
    (x: RootState) => x.desktopState.minimizedStates
  );
  const isMinimized =
    MinimizedData.find((element) => element.id === Props.AppId)?.minimized ??
    undefined; // its not minimized by default
  const Focused =
    useSelector((x: RootState) => x.desktopState.focusedAppId) === Props.AppId;
  const [isOpening, setIsOpening] = useState<boolean>();
  const RenderWindowsSettings = useSelector(
    (x: RootState) => x.taskbarState.RenderStartMenu
  );
  const dispatch = useDispatch();

  const OnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (Props.isWindowsIcon) {
      dispatch(setRenderStartMenu(!RenderWindowsSettings));
      return;
    }

    event.preventDefault();

    if (Props.AppId) {
      if (isMinimized === false && Focused === false) {
        dispatch(bringToFront(Props.AppId));
        dispatch(setFocusedApp(Props.AppId));
        setIsOpening(true);
      } else {
        const MinimizedState = !isMinimized;
        dispatch(
          setMinimizedState({
            id: Props.AppId,
            state: MinimizedState,
          })
        );

        if (!MinimizedState) {
          dispatch(setFocusedApp(Props.AppId));
          dispatch(bringToFront(Props.AppId));
        } else dispatch(setFocusedApp(-1));

        setIsOpening(!MinimizedState);
      }
    }
  };

  return (
    <motion.div
      className={cn(
        "w-10 h-10 flex items-center justify-center relative select-none",
        "before:content-[''] before:block before:absolute before:top-1/2 before:left-1/2 before:opacity-0 before:bg-white/5 before:w-10 before:h-10 before:rounded-md before:border-transparent before:border before:pointer-events-none transition-all before:-translate-1/2 before:scale-90 hover:before:scale-100 hover:before:opacity-100 before:transition-all before:duration-100 before:ease-in-out hover:before:border-white/5",
        "after:content-[''] after:block after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:-translate-y-full after:bg-[#93909f] after:rounded-md after:h-[3.34px] after:-mt-px after:border-transparent after:pointer-events-none after:ease-in after:transition-all",
        {
          "after:w-1": !Props.HideStatusBar,
          "after:bg-[#d0b3d5] after:w-[18px]": !Props.HideStatusBar && Focused,
          "active:rounded-sm active:filter-[hue-rotate(20deg)_brightness(80%)_saturate(3.5)]":
            Props.isWindowsIcon,
          "after:border-0": Props.HideStatusBar,
        }
      )}
      onClick={OnClickHandler}
      whileTap={"tap"}
      initial={Props.isWindowsIcon ? "enterance" : "init"}
      animate={
        isOpening === undefined ? "enterance" : isOpening ? "jump" : "drop"
      }
    >
      <motion.img
        variants={AnimationFrames}
        src={Props.Icon}
        className="max-w-[25px] pointer-events-none"
      />
    </motion.div>
  );
}

export default TaskBarApp;
