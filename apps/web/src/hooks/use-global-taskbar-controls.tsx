import { useDispatch } from "react-redux";
import {
  openTaskbarApplication,
  OpenTaskbarAppPayload,
} from "@/storage/slices/taskbar";

const useGlobalTaskbarControls = () => {
  const dispatch = useDispatch();
  const openNewTaskbarApplication = (application: OpenTaskbarAppPayload) => {
    dispatch(
      openTaskbarApplication({
        id: application.AppId,
        AppId: application.AppId,
        Icon: application.Icon,
        CustomTaskbarIcon: application.CustomTaskbarIcon,
      })
    );
  };

  return {
    openNewTaskbarApplication,
  };
};

export default useGlobalTaskbarControls;
