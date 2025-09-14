import { setFocusedApp } from "@/storage/slices/desktop";
import { useDispatch } from "react-redux";
import { OpenApplication } from "@/components/windows/desktop";
import {
  bringToFront,
  openApplication,
  closeApplication,
} from "@/storage/slices/main";
import { closeTaskbarApplication } from "@/storage/slices/taskbar";

const useGlobalWindowsControls = () => {
  const dispatch = useDispatch();

  const unFocusAllWindows = () => {
    dispatch(setFocusedApp(-1));
  };

  const openNewApplication = (application: Omit<OpenApplication, "id">) => {
    const newAppId = +new Date();

    const app: OpenApplication = {
      id: newAppId,
      ...application,
    };
    dispatch(openApplication(app));

    const appControls = {
      focusWindow: () => dispatch(setFocusedApp(newAppId)),
      bringWindowToFront: () => dispatch(bringToFront(newAppId)),
      isMinimized: false,
      isFocused: false,
      zIndexFront: 999,
    };

    return {
      app,
      ...appControls,
    };
  };

  const closeApplicationAbstraction = (appId: number) => {
    dispatch(closeApplication(appId));
    dispatch(closeTaskbarApplication(appId));
  };

  return {
    unFocusAllWindows,
    openNewApplication,
    closeApplication: closeApplicationAbstraction,
  };
};

export default useGlobalWindowsControls;
