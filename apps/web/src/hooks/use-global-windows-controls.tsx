import { setFocusedApp } from "@/storage/slices/desktop";
import { useDispatch } from "react-redux";
import { OpenApplication } from "@/components/windows/desktop";
import {
  bringToFront,
  openApplication,
  closeApplication,
  setWindowFlashing,
} from "@/storage/slices/main";
import { closeTaskbarApplication } from "@/storage/slices/taskbar";
import { useRef } from "react";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";

const useGlobalWindowsControls = () => {
  const dispatch = useDispatch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const unFocusAllWindows = () => {
    dispatch(setFocusedApp(-1));
  };

  const focusWindowWithId = (appId: number) => {
    dispatch(setFocusedApp(appId));
    dispatch(bringToFront(appId));
  };

  const openNewApplication = (application: Omit<OpenApplication, "id">) => {
    const newAppId = +new Date();

    const app: OpenApplication = {
      id: newAppId,
      ...application,
    };
    dispatch(openApplication(app));

    const appName =
      DesktopAppsList[app.App as DesktopAppsList] ?? "UnknownApplication";

    const appControls = {
      focusWindow: () => {
        dispatch(setFocusedApp(newAppId));
        // do it in the next cycle otherwise it will delete the URL after loading.
        setTimeout(() => {
          history.replaceState(null, "", `?${appName}={}`);
        });
      },
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

  const flashWindow = (appId: number, durationMs: number) => {
    dispatch(setWindowFlashing({ id: appId, state: true }));
    if (timerRef.current) clearTimeout(timerRef.current);

    const timeout = setTimeout(() => {
      dispatch(setWindowFlashing({ id: appId, state: false }));
    }, durationMs);
    timerRef.current = timeout;
  };

  return {
    unFocusAllWindows,
    focusWindowWithId,
    openNewApplication,
    closeApplication: closeApplicationAbstraction,
    flashWindow,
  };
};

export default useGlobalWindowsControls;
