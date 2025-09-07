import { setFocusedApp } from "@/storage/slices/desktop";
import { useDispatch } from "react-redux";
import { OpenApplication } from "@/components/windows/desktop";
import { bringToFront, openApplication } from "@/storage/slices/main";
import useAppWindowControls from "./use-app-window-data";

const useGlobalWindowsControls = () => {
  const dispatch = useDispatch();

  const unFocusAllWindows = () => {
    dispatch(setFocusedApp(-1));
  };

  const openNewApplication = (application: Omit<OpenApplication, "id">) => {
    const newAppId = +new Date(); // Generate new ID for each call

    const app: OpenApplication = {
      id: newAppId,
      ...application,
    };
    dispatch(openApplication(app));

    // Create controls for this specific app
    const appControls = {
      focusWindow: () => dispatch(setFocusedApp(newAppId)),
      bringWindowToFront: () => dispatch(bringToFront(newAppId)),
      isMinimized: false, // New apps are not minimized
      isFocused: false, // New apps are not focused initially
      zIndexFront: 999, // New apps get highest z-index
    };

    return {
      app,
      ...appControls,
    };
  };

  return {
    unFocusAllWindows,
    openNewApplication,
  };
};

export default useGlobalWindowsControls;
