import { setFocusedApp } from "@/storage/slices/desktop";
import { useDispatch } from "react-redux";
import { OpenApplication } from "@/components/windows/desktop";
import { openApplication } from "@/storage/slices/main";
import useAppWindowControls from "./use-app-window-data";

const useGlobalWindowsControls = () => {
  const dispatch = useDispatch();
  const newAppId = +new Date();
  const newAppControls = useAppWindowControls(newAppId);

  const unFocusAllWindows = () => {
    dispatch(setFocusedApp(-1));
  };

  const openNewApplication = (application: Omit<OpenApplication, "id">) => {
    const app: OpenApplication = {
      id: newAppId,
      ...application,
    };
    dispatch(openApplication(app));

    return {
      app,
      ...newAppControls,
    };
  };

  return {
    unFocusAllWindows,
    openNewApplication,
  };
};

export default useGlobalWindowsControls;
