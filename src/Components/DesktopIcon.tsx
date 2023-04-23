import { useContext, useEffect, useMemo, useState } from "react";
import "../Styles/DesktopIcon.css";

let Timer: number | undefined = undefined;

type Point = {
    x: number,
    y: number
}

type PropTypes = {
    ApplicationName: string,
    Icon: string,
    id: number,
    Style?: {
        gridRow?: number,
        gridColumn?: number
    },
    Selected: boolean
}

function DesktopIcon(Props: PropTypes)
{
    const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
    const IsSelected = Props.Selected;
    
    let ClassName = "Desktop-Icon-Container";
    if (IsSelected) ClassName += " Selected-Desktop-Icon-Container";

    return (
        <div style={{...Props.Style}} className={ClassName} data-id={Props.id}>
            <img src={Props.Icon}/>
            <h1>{ApplicationName}</h1>
        </div>
    )
}

export default DesktopIcon;