import {
  setFocusedApp,
  setMinimizedState,
  setMouseMovementOffset,
} from "@/storage/slices/desktop";
import { closeTaskbarApplication } from "@/storage/slices/taskbar";
import { useDispatch } from "react-redux";
import { Dimensions2D } from ".";
import useMousePosition from "@/hooks/use-mouse-position";
import { Point } from "framer-motion";
import AppWindowHeaderButton from "./app-window-header-button";
import { useEventListener } from "usehooks-ts";
import useAppWindowControls from "@/hooks/use-app-window-data";
import useGlobalWindowsControls from "@/hooks/use-global-windows-controls";
import useMediaQuery from "@/hooks/use-media-query";

interface AppWindowHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  processName?: string;
  processIcon?: string;
  maximized: boolean;
  AppId: number;
  setMaximized: (maximized: boolean) => void;
  setMoveWindow: (moveWindow: boolean) => void;
  SetMinmizedDimensions: (newDimensions: Dimensions2D) => void;
  windowWidth: number;
  windowHeight: number;
  NewLocation: Point;
  hiddenButtons: ("minimize" | "maximize" | "close")[];
  disableMaximize?: boolean;
  disableMinimize?: boolean;
}

const AppWindowHeader = ({
  processName,
  processIcon,
  setMaximized,
  SetMinmizedDimensions,
  maximized,
  setMoveWindow,
  AppId,
  windowWidth,
  windowHeight,
  NewLocation,
  hiddenButtons,
  disableMaximize = false,
  disableMinimize = false,
}: AppWindowHeaderProps) => {
  const isPhone = useMediaQuery("sm");
  const dispatch = useDispatch();
  const { isFocused } = useAppWindowControls(AppId);
  const { unFocusAllWindows, closeApplication } = useGlobalWindowsControls();
  const CursorLocation = useMousePosition();

  const onDismissButton = () => {
    dispatch(setMinimizedState({ id: AppId, state: true }));
    dispatch(setFocusedApp(-1));
  };

  const onDoubleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isPhone) return;
    event.preventDefault();
    const newMaximizedState = !maximized;
    if (newMaximizedState && disableMaximize) return;
    if (!newMaximizedState && disableMinimize) return;
    setMaximized(!maximized);
  };

  const CloseApplication = () => {
    if (isFocused) unFocusAllWindows();

    closeApplication(AppId);
  };

  useEventListener("mouseup", () => setMoveWindow(false));

  function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const ClickedElement = event.target as HTMLDivElement;
    if (ClickedElement) {
      if (ClickedElement.classList.contains("window-header")) {
        dispatch(
          setMouseMovementOffset({
            x: NewLocation.x - (CursorLocation.x ?? 0),
            y: NewLocation.y - (CursorLocation.y ?? 0),
          })
        );
        setMoveWindow(true);
      }
    }
  }

  function MaximizeWindow() {
    const newMaximizedState = !maximized;

    if (newMaximizedState && disableMaximize) return;
    if (!newMaximizedState && disableMinimize) return;

    if (newMaximizedState)
      SetMinmizedDimensions({
        width: windowWidth ?? 0,
        height: windowHeight ?? 0,
      });

    setMaximized(newMaximizedState);
  }

  return (
    <div
      className="window-header flex text-center justify-end min-h-[30px] h-[30px] text-white bg-gradient-to-r from-ctp-blue-950 to-ctp-mauve-900/60 min-w-max"
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {processName !== undefined || processIcon !== undefined ? (
        <div className="h-full pointer-events-none px-2.5 flex items-center justify-center mr-auto font-segoe-ui-light text-xs select-none min-w-fit">
          <img src={processIcon} className="max-w-4 max-h-5" />
          <p className="mx-2.5 text-white font-thin">{processName}</p>
        </div>
      ) : null}
      <div className="w-fit flex flex-row-reverse items-center p-0 h-full">
        {!hiddenButtons.includes("close") && (
          <AppWindowHeaderButton onClick={CloseApplication} type="danger">
            ✕
          </AppWindowHeaderButton>
        )}
        {!hiddenButtons.includes("maximize") && (
          <AppWindowHeaderButton
            onClick={MaximizeWindow}
            className="hidden sm:flex"
          >
            <span className="block aspect-square w-2.5 border border-solid"></span>
          </AppWindowHeaderButton>
        )}
        {!hiddenButtons.includes("minimize") && (
          <AppWindowHeaderButton onClick={onDismissButton}>
            <span className="block aspect-square w-2.5 h-px bg-white" />
          </AppWindowHeaderButton>
        )}
      </div>
    </div>
  );
};

export default AppWindowHeader;
