import { useDispatch, useSelector } from "react-redux";
import TaskBarApp from "./TaskBarApp";
import { RootState } from "../Storage/Store";
import { Reorder } from "framer-motion";
import { setTaskbarApplications } from "../Storage/Slices/Taskbar";

export type TaskbarOpenApplication = {
    Icon: string,
    id: number,
    AppId: number
}

function OpenApps()
{
    const TaskbarApplications = useSelector((x: RootState) => x.taskbarState.TaskbarOpenApplications);
    const dispatch = useDispatch();

    function SetTaskbarItems(value: TaskbarOpenApplication[])
    {
        dispatch(setTaskbarApplications(value));
    }

    return(
        <Reorder.Group className="taskbar-container mid-grid-area center-grid" values={TaskbarApplications} onReorder={SetTaskbarItems} axis="x">
            <TaskBarApp Icon="/Imgs/Apps/Windows.png" HideStatusBar={true} isWindowsIcon={true} AppId={0}/>
            {
                TaskbarApplications.map((taskbarApp) =>
                    <Reorder.Item key={taskbarApp.id} value={taskbarApp}>
                        <TaskBarApp Icon={taskbarApp.Icon} AppId={taskbarApp.AppId} key={taskbarApp.AppId}/>
                    </Reorder.Item>
                )
            }
            {/* <TaskBarApp Icon="/Imgs/Apps/Explorer.png" />
            <TaskBarApp Icon="/Imgs/Apps/Edge.png" />
            <TaskBarApp Icon="/Imgs/Apps/TaskManager.png" />
            <TaskBarApp Icon="/Imgs/Apps/Steam.png" />
            <TaskBarApp Icon="/Imgs/Apps/VSC.png" /> */}
        </Reorder.Group>
    )
}

export default OpenApps;