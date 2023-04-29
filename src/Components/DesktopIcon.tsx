import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import "../Styles/DesktopIcon.css";
import { OpenApplication } from "./Desktop";
import { useDispatch } from "react-redux";
import { openTaskbarApplication } from "../Storage/Slices/Taskbar";
import { DesktopAppsList } from "./ApplicationsContainer";
import { openApplication, setZIndex } from "../Storage/Slices/Main";
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

        const ApplicationObject = {id, App: Props.AppName, processIcon: Props.Icon, processName: Props.ApplicationName};

        dispatch(setZIndex({id: ApplicationObject.id, zindex: 1}));
        dispatch(openApplication(ApplicationObject));
        dispatch(setFocusedApp(ApplicationObject.id));

        dispatch(openTaskbarApplication({id, AppId: id, Icon: Props.Icon, CustomTaskbarIcon: Props.customTaskbarIcon}));
    }

    return (
        <div style={{...Props.Style}} className={ClassName} data-id={Props.id} onClick={onClickApplication}>
            <img src={Props.Icon}/>
            <h1>{ApplicationName}</h1>
        </div>
    )
}

export default DesktopIcon;