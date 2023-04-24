import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import "../Styles/DesktopIcon.css";
import DummyApp from "./Apps/DummyApp";

let Timer: number | undefined = undefined;

type Point = {
    x: number,
    y: number
}

type OpenApplication = {
    id: number,
    App: ReactElement<{}>
}


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
    CloseApp: (id: number) => void,
    AppName: DesktopAppsList,
}

type OpenApplicationFunction = (ApplicationObject: OpenApplication) => void;

export enum DesktopAppsList {
    DummyApp
};

function DesktopIcon(Props: PropTypes)
{
    const [ApplicationName, SetAppName] = useState(Props.ApplicationName);
    const IsSelected = Props.Selected;
    
    let ClassName = "Desktop-Icon-Container";
    if (IsSelected) ClassName += " Selected-Desktop-Icon-Container";

    function onClickApplication(event: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        if (event.detail !== 2) return;
        const id = Math.random();
        switch(Props.AppName)
        {
            case DesktopAppsList.DummyApp: {
                Props.OpenApp({id, App: <DummyApp CloseApp={() => Props.CloseApp(id)}/>})
                break;
            }
        }
    }

    return (
        <div style={{...Props.Style}} className={ClassName} data-id={Props.id} onClick={onClickApplication}>
            <img src={Props.Icon}/>
            <h1>{ApplicationName}</h1>
        </div>
    )
}

export default DesktopIcon;