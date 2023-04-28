import { DesktopAppsList } from "./ApplicationsContainer";
import "../Styles/WindowsSettingsApp.css";
import { useDispatch } from "react-redux";
import { openTaskbarApplication, setRenderWindowsSettings } from "../Storage/Slices/Taskbar";
import { openApplication, setZIndex } from "../Storage/Slices/Main";
import { setFocusedApp } from "../Storage/Slices/Desktop";

type PropTypes = {
    Icon: string,
    ApplicationName: string,
    App: DesktopAppsList
}

function WindowsSettingsApp(Props: PropTypes)
{
    const dispatch = useDispatch();

    function onClickApplication()
    {
        const id = +new Date();
        const appObject = {id, App: Props.App, processIcon: Props.Icon, processName: Props.ApplicationName};

        dispatch(setRenderWindowsSettings(false)); //
        
        dispatch(setZIndex({id: appObject.id, zindex: 1}));
        dispatch(openApplication(appObject));
        dispatch(setFocusedApp(appObject.id));

        dispatch(openTaskbarApplication({id, AppId: id, Icon: Props.Icon}));
    }

    return (
        <div className="settings-app-container" onClick={onClickApplication}>
            <img src={Props.Icon}/>
            <p>{Props.ApplicationName}</p>
        </div>
    )
}

export default WindowsSettingsApp;