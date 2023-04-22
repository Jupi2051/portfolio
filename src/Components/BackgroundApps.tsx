import DateTime from "./BackgroundApps/DateTime";
import VolumeInternet from "./BackgroundApps/VolumeInternet";
import "../Styles/BackgroundApps.css";

function BackgroundApps()
{
    return(
        <div className="taskbar-container background-apps-container" id="background-apps">
            <DateTime />
            <VolumeInternet />
        </div>
    )
}

export default BackgroundApps;