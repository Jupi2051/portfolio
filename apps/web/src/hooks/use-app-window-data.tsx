import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/storage/store";
import { setFocusedApp } from "@/storage/slices/desktop";
import {
  bringToFront,
  setURLParams,
  deleteURLParams,
} from "@/storage/slices/main";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";

const useAppWindowControls = (appId: number = -1) => {
  const dispatch = useDispatch();

  const metaData = useSelector(
    (x: RootState) =>
      x.mainState.OpenApplications.find((element) => element.id === appId)
        ?.metaData
  );

  const appNameEnumValue = useSelector(
    (x: RootState) =>
      x.mainState.OpenApplications.find((element) => element.id === appId)?.App
  );

  const appName =
    DesktopAppsList[appNameEnumValue as DesktopAppsList] ??
    "UnknownApplication";

  const MinimizedData = useSelector(
    (x: RootState) => x.desktopState.minimizedStates
  );
  const zIndexFrontData = useSelector(
    (x: RootState) => x.mainState.zIndicesMap
  );

  const isFlashing = useSelector((x: RootState) =>
    x.mainState.flashingWindows.includes(appId)
  );

  const isFocused =
    useSelector((x: RootState) => x.desktopState.focusedAppId) === appId;

  const zIndexFront =
    zIndexFrontData.find((element) => element.id === appId)?.zIndex ?? 70;

  const isMinimized =
    MinimizedData.find((element) => element.id === appId)?.minimized ?? false; // its not minimized by default

  const URLParams = useSelector(
    (x: RootState) =>
      x.mainState.OpenApplications.find((element) => element.id === appId)
        ?.URLParams
  );

  const updateURLParams = (
    params: Record<string, string>,
    updateBrowserURL: boolean = true
  ) => {
    dispatch(setURLParams({ id: appId, params }));
    if (updateBrowserURL) {
      overrideBrowserURLParams(params);
    }
  };

  const deleteEveryURLParam = () => {
    dispatch(deleteURLParams(appId));
  };

  const overrideBrowserURLParams = (
    overrideParams?: Record<string, string>
  ) => {
    let objectParams: Record<string, string> = {};
    objectParams[appName ?? "UnknownApplication"] = JSON.stringify(
      overrideParams ?? URLParams ?? {}
    );

    history.replaceState(
      null,
      "",
      `?${Object.entries(objectParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`
    );
  };

  const focusWindow = () => {
    dispatch(setFocusedApp(appId));
    overrideBrowserURLParams();
  };

  const bringWindowToFront = () => {
    dispatch(bringToFront(appId));
  };

  const disablerApp = useSelector((x: RootState) =>
    x.mainState.OpenApplications.find((element) => {
      return (
        (element.metaData?.disableOtherAppsPointerEvents ?? false) === true &&
        element.id !== appId
      );
    })
  );

  return {
    isMinimized,
    zIndexFront,
    isFocused,
    focusWindow,
    bringWindowToFront,
    metaData,
    isDisabled: disablerApp !== undefined,
    disabledByOtherApp: disablerApp,
    isFlashing,
    URLParams,
    updateURLParams,
    deleteEveryURLParam,
    overrideBrowserURLParams,
  };
};

export default useAppWindowControls;
