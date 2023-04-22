import { useState } from "react";
import "../Styles/DesktopIcon.css";

type PropTypes = {
    ApplicationName: string,
    Icon: string
}

function DesktopIcon(Props: PropTypes)
{
    const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
    const [IsSelected, SetSelected] = useState(false);

    let ClassName = "Desktop-Icon-Container";
    
    if (IsSelected)
        ClassName += " Selected-Desktop-Icon-Container";

    function OnClickHandler()
    {
        SetSelected(!IsSelected);
    }

    return (
        <div className={ClassName} onClick={OnClickHandler}>
            <img src={Props.Icon}/>
            <h1>{ApplicationName}</h1>
        </div>
    )
}

export default DesktopIcon;