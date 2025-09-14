import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/storage/store";
import { setFocusedApp } from "@/storage/slices/desktop";
import { bringToFront } from "@/storage/slices/main";

const useAppWindowControls = (appId: number = -1) => {
  const dispatch = useDispatch();

  const metaData = useSelector(
    (x: RootState) =>
      x.mainState.OpenApplications.find((element) => element.id === appId)
        ?.metaData
  );

  const MinimizedData = useSelector(
    (x: RootState) => x.desktopState.minimizedStates
  );
  const zIndexFrontData = useSelector(
    (x: RootState) => x.mainState.zIndicesMap
  );

  const isFocused =
    useSelector((x: RootState) => x.desktopState.focusedAppId) === appId;

  const zIndexFront =
    zIndexFrontData.find((element) => element.id === appId)?.zIndex ?? 70;

  const isMinimized =
    MinimizedData.find((element) => element.id === appId)?.minimized ?? false; // its not minimized by default

  const focusWindow = () => {
    dispatch(setFocusedApp(appId));
  };

  const bringWindowToFront = () => {
    dispatch(bringToFront(appId));
  };

  return {
    isMinimized,
    zIndexFront,
    isFocused,
    focusWindow,
    bringWindowToFront,
    metaData,
  };
};

export default useAppWindowControls;
