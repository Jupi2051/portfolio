import { setFocusedApp } from "@/storage/slices/desktop";
import { useDispatch } from "react-redux";
import { OpenApplication } from "@/components/windows/desktop";
import { openApplication } from "@/storage/slices/main";
import useAppWindowControls from "./use-app-window-data";

const useGlobalWindowsControls = () => {
  const dispatch = useDispatch();

  const unFocusAllWindows = () => {
    dispatch(setFocusedApp(-1));
  };

  const openNewApplication = (application: Omit<OpenApplication, "id">) => {
    const Id = +new Date();
    const app: OpenApplication = {
      id: Id,
      ...application,
    };
    dispatch(openApplication(app));

    return {
      app,
      ...useAppWindowControls(Id),
    };
  };

  return {
    unFocusAllWindows,
    openNewApplication,
  };
};

export default useGlobalWindowsControls;
