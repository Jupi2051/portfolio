import { DesktopAppsList } from "./ApplicationsContainer";
import "../Styles/WindowsSettingsApp.css";
import { useDispatch } from "react-redux";
import { openTaskbarApplication, setRenderWindowsSettings } from "../Storage/Slices/Taskbar";
import { openApplication, setZIndex } from "../Storage/Slices/Main";
import { setFocusedApp } from "../Storage/Slices/Desktop";
import { OpenApplication } from "./Desktop";

type PropTypes = {
    Icon: string,
    ApplicationName: string,
    App: DesktopAppsList,
    customTaskbarIcon?: string,
    processProps: Object
}

function WindowsSettingsApp(Props: PropTypes)
{
    const dispatch = useDispatch();

    function onClickApplication()
    {
        const id = +new Date();
        const appObject: OpenApplication = {id, App: Props.App, processIcon: Props.customTaskbarIcon?? Props.Icon, processName: Props.ApplicationName, processProps: Props.processProps};

        dispatch(setRenderWindowsSettings(false)); //
        
        dispatch(setZIndex({id: appObject.id, zindex: 1}));
        dispatch(openApplication(appObject));
        dispatch(setFocusedApp(appObject.id));

        dispatch(openTaskbarApplication({id, AppId: id, Icon: Props.Icon, CustomTaskbarIcon: Props.customTaskbarIcon}));
    }

    return (
        <div className="settings-app-container" onClick={onClickApplication}>
            <img src={Props.Icon}/>
            <p>{Props.ApplicationName}</p>
        </div>
    )
}

export default WindowsSettingsApp;