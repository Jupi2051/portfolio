import TaskBarApp from "./TaskBarApp";

function OpenApps()
{
    return(
        <div className="taskbar-container mid-grid-area center-grid">
            <TaskBarApp Icon="/Imgs/Apps/Windows.png" />
            <TaskBarApp Icon="/Imgs/Apps/Explorer.png" />
            <TaskBarApp Icon="/Imgs/Apps/Edge.png" />
            <TaskBarApp Icon="/Imgs/Apps/TaskManager.png" />
            <TaskBarApp Icon="/Imgs/Apps/Steam.png" />
            <TaskBarApp Icon="/Imgs/Apps/VSC.png" />
        </div>
    )
}

export default OpenApps;