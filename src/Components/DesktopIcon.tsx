import { useState } from "react";
import "../Styles/DesktopIcon.css";
import { OpenApplication } from "./Desktop";
import { useDispatch } from "react-redux";
import { openTaskbarApplication } from "../Storage/Slices/Taskbar";
import { DesktopAppsList } from "./ApplicationsContainer";
import { bringToFront, openApplication } from "../Storage/Slices/Main";
import { setFocusedApp } from "../Storage/Slices/Desktop";

type PropTypes = {
    ApplicationName: string,
    Icon: string,
    id: number,
    customTaskbarIcon?: string,
    Style?: {
        gridRow?: number,
        gridColumn?: number
    },
    Selected: boolean,
    AppName: DesktopAppsList,
    processProps?: Object
}

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

        const ApplicationObject: OpenApplication = {id, App: Props.AppName, processIcon: Props.customTaskbarIcon?? Props.Icon, processName: Props.ApplicationName, processProps: Props.processProps};

        dispatch(openApplication(ApplicationObject));
        dispatch(setFocusedApp(ApplicationObject.id));
        dispatch(openTaskbarApplication({id, AppId: id, Icon: Props.Icon, CustomTaskbarIcon: Props.customTaskbarIcon}));
        dispatch(bringToFront(id));
    }

    return (
        <div style={{...Props.Style}} className={ClassName} data-id={Props.id} onClick={onClickApplication}>
            <img src={Props.Icon}/>
            <h1>{ApplicationName}</h1>
        </div>
    )
}

export default DesktopIcon;