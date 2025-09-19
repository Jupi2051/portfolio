import { useDispatch, useSelector } from "react-redux";
import TaskBarApp from "./taskbar-app";
import { RootState } from "@/storage/store";
import { AnimatePresence, Reorder } from "framer-motion";
import { setTaskbarApplications } from "@/storage/slices/taskbar";
import useStartMenu from "@/hooks/use-start-menu";

export type TaskbarOpenApplication = {
  Icon: string;
  id: number;
  AppId: number;
};

function OpenApps() {
  const { isRendered } = useStartMenu();
  const TaskbarApplications = useSelector(
    (x: RootState) => x.taskbarState.TaskbarOpenApplications
  );
  const dispatch = useDispatch();

  function SetTaskbarItems(value: TaskbarOpenApplication[]) {
    dispatch(setTaskbarApplications(value));
  }

  return (
    <Reorder.Group
      className="flex gap-0 rounded-t-lg list-none sm:pl-4 w-fit z-[3] grow justify-self-start"
      values={TaskbarApplications}
      onReorder={SetTaskbarItems}
      axis="x"
      as="ul"
    >
      <TaskBarApp
        Icon="/Imgs/Apps/Windows.webp"
        HideStatusBar={true}
        isWindowsIcon={true}
        AppId={0}
        forceHover={isRendered}
      />
      <TaskBarApp
        Icon="/Imgs/Apps/Search.webp"
        HideStatusBar={true}
        isCustomIcon={true}
        AppId={0}
        imageClassName="!max-w-6 !max-h-6 sm:!max-w-8 sm:!max-h-8"
      />
      <div className="w-0.5 h-6 sm:h-8 my-auto bg-white/40 ml-1 mr-3 sm:ml-4 sm:mr-12"></div>
      <AnimatePresence>
        {TaskbarApplications.map((taskbarApp) => (
          <Reorder.Item key={taskbarApp.id} value={taskbarApp}>
            <TaskBarApp Icon={taskbarApp.Icon} AppId={taskbarApp.AppId} />
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}

export default OpenApps;
