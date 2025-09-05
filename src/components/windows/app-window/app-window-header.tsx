import {
  setFocusedApp,
  setMinimizedState,
  setMouseMovementOffset,
} from "@/storage/slices/desktop";
import { closeApplication } from "@/storage/slices/main";
import { closeTaskbarApplication } from "@/storage/slices/taskbar";
import { useDispatch } from "react-redux";
import { Dimensions2D } from ".";
import useMousePosition from "@/hooks/use-mouse-position";
import { Point } from "framer-motion";
import AppWindowHeaderButton from "./app-window-header-button";
import { useEventListener } from "usehooks-ts";

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
}: AppWindowHeaderProps) => {
  const dispatch = useDispatch();
  const CursorLocation = useMousePosition();

  const onDismissButton = () => {
    dispatch(setMinimizedState({ id: AppId, state: true }));
    dispatch(setFocusedApp(-1));
  };

  const onWindowClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.detail !== 2) return;
    setMaximized(!maximized);
  };

  const CloseApplication = () => {
    dispatch(closeApplication(AppId));
    dispatch(closeTaskbarApplication(AppId));
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
    const maximizationNewState = !maximized;

    if (maximizationNewState)
      SetMinmizedDimensions({
        width: windowWidth ?? 0,
        height: windowHeight ?? 0,
      });

    setMaximized(maximizationNewState);
  }

  return (
    <div
      className="window-header flex text-center justify-end h-[30px] text-white bg-gradient-to-r from-[#3f3550] min-w-max"
      onMouseDown={onMouseDown}
      onClick={onWindowClick}
    >
      {processName !== undefined || processIcon !== undefined ? (
        <div className="h-full pointer-events-none px-2.5 flex items-center justify-center mr-auto font-segoe-ui-light text-xs select-none min-w-fit">
          <img src={processIcon} className="max-w-4" />
          <p className="mx-2.5 text-white font-thin">{processName}</p>
        </div>
      ) : null}
      <div className="w-fit flex flex-row-reverse items-center p-0 h-full">
        <AppWindowHeaderButton onClick={CloseApplication} type="danger">
          ✕
        </AppWindowHeaderButton>
        <AppWindowHeaderButton onClick={MaximizeWindow}>
          <span className="block aspect-square w-2.5 border border-solid"></span>
        </AppWindowHeaderButton>
        <AppWindowHeaderButton onClick={onDismissButton}>
          <span className="block aspect-square w-2.5 h-px bg-white" />
        </AppWindowHeaderButton>
      </div>
    </div>
  );
};

export default AppWindowHeader;
