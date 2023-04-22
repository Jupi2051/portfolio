import { MouseEventHandler } from "react";
import "../Styles/Desktop.css"
import DesktopIcon from "./DesktopIcon";
import DesktopTimeWidget from "./Widgets/DesktopTimeWidget";


function Desktop()
{

    function OnClickDesktop(event: React.MouseEvent<HTMLInputElement>)
    {
        const DesktopIconElement = event.target as Element;
        if (DesktopIconElement.classList.contains("Desktop-Icon-Container"))
        {
            console.log(event.target);
        }
    }

    return (
        <div id="Desktop" onClick={(e: React.MouseEvent<HTMLInputElement>) => {OnClickDesktop(e);}}>
            <div id="Desktop-Widgets">
                <DesktopTimeWidget />
            </div>
            <DesktopIcon ApplicationName="This PC" Icon="Imgs/DesktopApps/ThisPC.webp"/>
            <DesktopIcon ApplicationName="Recycle Bin" Icon="Imgs/DesktopApps/RecycleBin.webp"/>
        </div>
    )
}

export default Desktop;