import { useSelector } from "react-redux";
import { RootState } from "@/storage/store";

const useAppWindowData = (appId: number) => {
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

  return {
    isMinimized,
    zIndexFront,
    isFocused,
  };
};

export default useAppWindowData;
