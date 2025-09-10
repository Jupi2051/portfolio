import {
  ReactNode,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Point, Variants, motion } from "framer-motion";
import useMousePosition from "@/hooks/use-mouse-position";
import { useSelector } from "react-redux";
import { RootState } from "@/storage/store";
import { useResizeDetector } from "react-resize-detector";
import cn from "classnames";
import AppWindowHeader from "./app-window-header";
import useAppWindowData from "@/hooks/use-app-window-data";
import { useResizeObserver } from "usehooks-ts";

type PropType = {
  children?: ReactNode;
  AppId: number;
  processName?: string;
  processIcon?: string;
  maximized?: boolean;
};

type WindowBorderBox = {
  Location: Point;
};

export type Dimensions2D = {
  width?: number;
  height?: number;
};

const exitAndOpenMainContainer: Variants = {
  exit: { opacity: 0 },
  init: { opacity: 1, scale: 1 },
};

let WindowLocatorData = new Map<number, WindowBorderBox>();

function AppWindow(props: PropType) {
  const [Maximized, SetMaximized] = useState(props.maximized ?? true);
  const [MoveWindow, SetMoveWindow] = useState(false);
  const CursorLocation = useMousePosition();
  const {
    isMinimized,
    zIndexFront,
    isFocused,
    focusWindow,
    bringWindowToFront,
  } = useAppWindowData(props.AppId);

  const WindowId = useMemo(() => +new Date(), []);
  const CursorOffset = useSelector(
    (x: RootState) => x.desktopState.mouseMovementOffset
  );
  const ref = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  const [MinimizedDimensions, SetMinmizedDimensions] = useState<Dimensions2D>({
    width: 500,
    height: 500,
  });

  let FoundObject = WindowLocatorData.get(WindowId);
  if (!FoundObject) {
    FoundObject = {
      Location: {
        x: Math.floor(Math.random() * 200),
        y: Math.floor(Math.random() * 200),
      },
    };
    WindowLocatorData.set(WindowId, FoundObject);
  }

  let NewLocation: Point = {
    x: FoundObject.Location.x,
    y: FoundObject.Location.y,
  };

  if (MoveWindow) {
    NewLocation = {
      x: CursorLocation.x === null ? 0 : CursorLocation.x + CursorOffset.x,
      y: CursorLocation.y === null ? 0 : CursorLocation.y + CursorOffset.y,
    };
    WindowLocatorData.delete(WindowId);
    WindowLocatorData.set(WindowId, { Location: NewLocation });
  }

  const exitAndOpen: Variants = {
    hidden: {
      scale: 0.9,
      filter: "blur(1px)",
      opacity: 0,
    },
    visible: {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      x: Maximized ? 0 : NewLocation.x,
      y: Maximized ? 0 : NewLocation.y,
      zIndex: zIndexFront,
      width: Maximized ? "100%" : "auto",
      height: Maximized ? "100%" : "auto",
      left: Maximized ? "0" : undefined,
      top: Maximized ? "0" : undefined,
    },
    minimized: {
      filter: "blur(1px)",
      x: Maximized ? 0 : NewLocation.x,
      y: Maximized ? 0 : NewLocation.y,
      left: "0%",
      top: "100%",
      scale: 0,
      opacity: 0,
      width: Maximized ? "100%" : "auto",
      height: Maximized ? "100%" : "auto",
      zIndex: zIndexFront,
    },
  };

  function onWindowMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    bringWindowToFront();
    const ClickedElement = event.target as HTMLDivElement;
    if (ClickedElement)
      if (ClickedElement.classList.contains("window-dismiss-button")) return; // don't set as focus if clicking on dismiss

    focusWindow();
  }

  const animateValue =
    isMinimized === undefined
      ? "visible"
      : isMinimized === true
      ? "minimized"
      : "visible";

  return (
    <motion.div
      variants={exitAndOpenMainContainer}
      exit="exit"
      transition={{ duration: 0.1 }}
      initial="init"
      animate="init"
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
      <motion.div
        className={cn(
          `absolute border border-black border-solid mx-auto rounded-md overflow-hidden box-shadow-[0px_0px_15px_0px_rgba(0,0,0,0.4)] user-select-none transition-[box-shadow,border] duration-200 isolate ease-in-out pointer-events-auto`,
          {
            "!border-none !rounded-none": Maximized,
            "select-auto border border-ctp-sky-400 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.7)]":
              isFocused,
            "user-select-none": MoveWindow,
          }
        )}
        variants={exitAndOpen}
        initial="hidden"
        animate={animateValue}
        transition={{
          duration: 0.1,
          width: { duration: 0.125 },
          height: { duration: 0.125 },
          x: { duration: 0 },
          y: { duration: 0 },
        }}
        onMouseDown={onWindowMouseDown}
      >
        <div
          className="relative bg-gradient-to-b from-[#1d1d1d] to-[#3d3d3d] resize-both overflow-hidden flex flex-col z-[-1] @container/appwindow"
          style={{
            width: Maximized ? "100%" : MinimizedDimensions.width ?? "auto",
            height: Maximized ? "100%" : MinimizedDimensions.height ?? "auto",
            resize: Maximized ? "none" : "both",
          }}
          ref={ref}
        >
          <AppWindowHeader
            processName={props.processName}
            processIcon={props.processIcon}
            setMaximized={SetMaximized}
            SetMinmizedDimensions={SetMinmizedDimensions}
            maximized={Maximized}
            setMoveWindow={SetMoveWindow}
            AppId={props.AppId}
            windowWidth={width ?? 0}
            windowHeight={height ?? 0}
            NewLocation={NewLocation}
          />
          <div className="flex flex-col w-full h-full border-none">
            {props.children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AppWindow;
