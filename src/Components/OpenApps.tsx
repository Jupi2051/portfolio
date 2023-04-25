import { useSelector } from "react-redux";
import TaskBarApp from "./TaskBarApp";
import { RootState } from "../Storage/Store";

export type TaskbarOpenApplication = {
    Icon: string,
    id: number,
    AppId: number
}

function OpenApps()
{
    const TaskbarApplications = useSelector((x: RootState) => x.taskbarState.TaskbarOpenApplications);

    return(
        <div className="taskbar-container mid-grid-area center-grid">
            <TaskBarApp Icon="/Imgs/Apps/Windows.png" HideStatusBar={true} isWindowsIcon={true} AppId={0}/>
            {
                TaskbarApplications.map((taskbarApp) =>
                    <TaskBarApp Icon={taskbarApp.Icon} AppId={taskbarApp.AppId} key={taskbarApp.AppId}/>
                )
            }
            {/* <TaskBarApp Icon="/Imgs/Apps/Explorer.png" />
            <TaskBarApp Icon="/Imgs/Apps/Edge.png" />
            <TaskBarApp Icon="/Imgs/Apps/TaskManager.png" />
            <TaskBarApp Icon="/Imgs/Apps/Steam.png" />
            <TaskBarApp Icon="/Imgs/Apps/VSC.png" /> */}
        </div>
    )
}

export default OpenApps;