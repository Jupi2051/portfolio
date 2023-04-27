import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import "../Styles/DesktopIcon.css";
import { OpenApplication } from "./Desktop";
import { useDispatch } from "react-redux";
import { openTaskbarApplication } from "../Storage/Slices/Taskbar";
import { DesktopAppsList } from "./ApplicationsContainer";

type PropTypes = {
    ApplicationName: string,
    Icon: string,
    id: number,
    Style?: {
        gridRow?: number,
        gridColumn?: number
    },
    Selected: boolean,
    OpenApp: OpenApplicationFunction,
    AppName: DesktopAppsList,
}

type OpenApplicationFunction = (ApplicationObject: OpenApplication) => void;

function DesktopIcon(Props: PropTypes)
{
    const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
    const IsSelected = Props.Selected;
    const dispatch = useDispatch();

    let ClassName = "Desktop-Icon-Container";
    if (IsSelected) ClassName += " Selected-Desktop-Icon-Container";

    function onClickApplication(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        if (event.detail !== 2) return;
        const id = +new Date();
        Props.OpenApp({id, App: Props.AppName, processIcon: Props.Icon, processName: Props.ApplicationName});
        dispatch(openTaskbarApplication({id, AppId: id, Icon: Props.Icon}));
    }

    return (
        <div style={{...Props.Style}} className={ClassName} data-id={Props.id} onClick={onClickApplication}>
            <img src={Props.Icon}/>
            <h1>{ApplicationName}</h1>
        </div>
    )
}

export default DesktopIcon;