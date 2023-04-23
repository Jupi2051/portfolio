import { useContext, useEffect, useMemo, useState } from "react";
import "../Styles/DesktopIcon.css";
import { DesktopContext } from "./Desktop";

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
    }
    // ParentElement: HTMLDivElement | null
}

function DesktopIcon(Props: PropTypes)
{
    const ParentBox = useContext(DesktopContext);
    const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
    const [IsSelected, SetSelected] = useState(false);
    const [isHoldClicked, SetHoldClick] = useState(false);
    
    useEffect(() => {
        if (isHoldClicked)
            Timer = setInterval(OnHoldClick, 10);
        else
            onMouseUp();
    }, [isHoldClicked])

    function OnClickHandler()
    {
        SetSelected(!IsSelected);
    }

    function OnHoldClick()
    {
        // console.log(Props.ParentElement?.getBoundingClientRect());
    }

    function onMouseDown()
    {
        SetHoldClick(true);
        SetSelected(true);
    }

    function onMouseUp()
    {
        SetHoldClick(false);
        clearInterval(Timer);
    }

    let ClassName = "Desktop-Icon-Container";
    if (IsSelected) ClassName += " Selected-Desktop-Icon-Container";

    return (
        <div style={{...Props.Style}} className={ClassName} onClick={OnClickHandler} onMouseDown={onMouseDown} onMouseUp={onMouseUp} data-id={Props.id}>
            <img src={Props.Icon}/>
            <h1>{ApplicationName}</h1>
        </div>
    )
}

export default DesktopIcon;