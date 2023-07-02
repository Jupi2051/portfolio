import { useDispatch } from "react-redux";
import "../../../Styles/DesktopIcon.css";
import { DesktopAppsList } from "../../ApplicationsContainer";
import { bringToFront, openApplication } from "../../../Storage/Slices/Main";
import { setFocusedApp } from "../../../Storage/Slices/Desktop";
import { openTaskbarApplication } from "../../../Storage/Slices/Taskbar";
import { OpenApplication } from "../../Desktop";

export interface ExplorerItemData {
    ApplicationName: string,
    Icon: string,
    id: number,
    customTaskbarIcon?: string,
    Selected?: boolean,
    AppName: DesktopAppsList,
    processProps?: Object
};

function ExplorerItem(Props: ExplorerItemData)
{
    const IsSelected = Props.Selected?? false;
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

    return <div className={ClassName} onClick={onClickApplication}>
        <img src={Props.Icon}/>
        <h1>{Props.ApplicationName}</h1>
    </div>
}

export default ExplorerItem;