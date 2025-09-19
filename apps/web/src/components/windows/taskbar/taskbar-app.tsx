import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useDispatch } from "react-redux";
import { setMinimizedState } from "@/storage/slices/desktop";
import cn from "classnames";
import useAppWindowData from "@/hooks/use-app-window-data";
import useStartMenu from "@/hooks/use-start-menu";
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";

type PropTypes = {
  Icon: string;
  HideStatusBar?: boolean;
  isWindowsIcon?: boolean;
  isCustomIcon?: boolean;
  AppId?: number;
  forceHover?: boolean;
  imageClassName?: string;
};

const AnimationFrames: Variants = {
  init: { y: 50 },
  enterance: {
    y: 0,
    transition: { type: "spring", stiffness: 60, mass: 0.85 },
  },
  jump: {
    y: [0, -3, 0], // Go up and back down
    transition: {
      duration: 0.35,
      ease: "easeInOut",
      times: [0, 1],
    },
  },
  drop: {
    y: [0, 3, 0],
    transition: { duration: 0.35, ease: "easeInOut", times: [0, 1] },
  },
  tap: { scale: 0.825 },
  exit: { y: 100, transition: { ease: "easeIn", duration: 0.2 } },
};

function TaskBarApp(Props: PropTypes) {
  const { isMinimized, isFocused, focusWindow, bringWindowToFront } =
    useAppWindowData(Props.AppId);
  const { unFocusAllWindows } = useGlobalWindowsControls();
  const [isOpening, setIsOpening] = useState<boolean>();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { isRendered, setRenderStartMenu } = useStartMenu();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const OnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (Props.isWindowsIcon || Props.isCustomIcon) {
      unFocusAllWindows();
      if (Props.isWindowsIcon) setRenderStartMenu(!isRendered);
      return;
    }

    event.preventDefault();

    if (Props.AppId) {
      if (!isMinimized && !isFocused) {
        bringWindowToFront();
        focusWindow();
        setIsOpening(undefined);
      } else {
        const MinimizedState = !isMinimized;
        dispatch(
          setMinimizedState({
            id: Props.AppId,
            state: MinimizedState,
          })
        );

        if (!MinimizedState) {
          focusWindow();
          bringWindowToFront();
        } else unFocusAllWindows();

        setIsOpening(!MinimizedState);
      }
    }
  };

  return (
    <motion.div
      className={cn(
        "w-12 h-12 flex items-center justify-center relative select-none px-[2rem]",
        "before:content-[''] before:block before:absolute before:top-1/2 before:left-1/2 before:opacity-0 before:bg-white/5 before:w-[3.6rem] before:h-14 before:rounded-md before:border-transparent before:border before:pointer-events-none before:-translate-1/2 before:scale-90 hover:before:scale-100 hover:before:opacity-100 before:transition-all before:duration-100 before:ease-in-out hover:before:border-white/5",
        {
          "active:rounded-lg active:filter-[hue-rotate(10deg)_brightness(80%)_saturate(3.5)]":
            Props.isWindowsIcon,
        },
        {
          "before:!border-white/5 before:!scale-100 before:!opacity-100":
            Props.forceHover || isFocused,
        }
      )}
      onClick={OnClickHandler}
      whileTap={"tap"}
      initial={Props.isWindowsIcon ? "enterance" : "init"}
      animate={
        isOpening === undefined ? "enterance" : isOpening ? "jump" : "drop"
      }
      variants={{ exit: { width: 0 } }}
      exit="exit"
      data-is-windows-icon={Props.isWindowsIcon ? true : undefined}
      data-is-custom-icon={Props.isCustomIcon ? true : undefined}
    >
      <motion.img
        variants={AnimationFrames}
        src={Props.Icon}
        className={cn(
          "max-w-10 max-h-14 pointer-events-none",
          Props.imageClassName
        )}
      />
      <motion.span
        className={cn(
          "absolute block top-full left-1/2 -translate-x-1/2 bg-[#93909f] rounded-md h-[3.34px] -mt-px border-transparent pointer-events-none",
          {
            hidden: Props.HideStatusBar,
          }
        )}
        initial={{
          width: "0px",
          backgroundColor: "#93909f",
        }}
        animate={{
          backgroundColor:
            !Props.HideStatusBar && isFocused ? "#d0b3d5" : "#93909f",
          width: !Props.HideStatusBar && isFocused ? "1.125rem" : "0.4rem",
          transition: { delay: isInitialRender ? 0.4 : 0 },
        }}
      />
    </motion.div>
  );
}

export default TaskBarApp;
