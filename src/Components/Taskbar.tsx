import "../Styles/Taskbar.css"
import BackgroundApps from "./BackgroundApps";
import OpenApps from "./OpenApps";

function Taskbar()
{
    return (
        <div id="taskbar-container">
            <OpenApps></OpenApps>
            <BackgroundApps></BackgroundApps>
        </div>
    )
}

export default Taskbar;