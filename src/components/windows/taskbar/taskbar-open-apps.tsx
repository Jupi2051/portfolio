import { useDispatch, useSelector } from "react-redux";
import TaskBarApp from "./taskbar-app";
import { RootState } from "@/storage/store";
import { Reorder } from "framer-motion";
import { setTaskbarApplications } from "@/storage/slices/taskbar";

export type TaskbarOpenApplication = {
  Icon: string;
  id: number;
  AppId: number;
};

function OpenApps() {
  const TaskbarApplications = useSelector(
    (x: RootState) => x.taskbarState.TaskbarOpenApplications
  );
  const dispatch = useDispatch();

  function SetTaskbarItems(value: TaskbarOpenApplication[]) {
    dispatch(setTaskbarApplications(value));
  }

  return (
    <Reorder.Group
      className="flex items-center justify-center gap-0 rounded-t-lg list-none px-1 pt-1 w-fit z-[3] col-start-2 justify-self-center"
      values={TaskbarApplications}
      onReorder={SetTaskbarItems}
      axis="x"
    >
      <TaskBarApp
        Icon="/Imgs/Apps/Windows.png"
        HideStatusBar={true}
        isWindowsIcon={true}
        AppId={0}
      />
      {TaskbarApplications.map((taskbarApp) => (
        <Reorder.Item key={taskbarApp.id} value={taskbarApp}>
          <TaskBarApp
            Icon={taskbarApp.Icon}
            AppId={taskbarApp.AppId}
            key={taskbarApp.AppId}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default OpenApps;
