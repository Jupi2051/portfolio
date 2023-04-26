import React, { useState } from "react";
import "../Styles/TaskbarApp.css"
import { Reorder, motion } from "framer-motion";
import { TaskbarOpenApplication } from "./OpenApps";
import WindowsSettings from "./WindowsSettings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Store";
import { setRenderWindowsSettings } from "../Storage/Slices/Taskbar";
import { setMinimizedState } from "../Storage/Slices/Desktop";

type PropTypes = {
    Icon: string,
    HideStatusBar?: boolean,
    isWindowsIcon?: boolean,
    AppId?: number,
}

const AnimationFrames = {init: {y: 50}, enterance: {y: 0}};

function TaskBarApp(Props: PropTypes)
{

    const MinimizedData = useSelector((x: RootState) => x.desktopState.minimizedStates);
    const isMinimized = MinimizedData.find((element) => element.id === Props.AppId)?.minimized?? undefined; // its not minimized by default

    const [Open, SetOpen] = useState(true);
    const RenderWindowsSettings = useSelector((x: RootState) => x.taskbarState.RenderWindowsSettings);
    const dispatch = useDispatch();

    const OnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (Props.isWindowsIcon) {
            dispatch(setRenderWindowsSettings(!RenderWindowsSettings));
            return;
        }

        event.preventDefault();
        
        

        if (Props.AppId)
        {
            dispatch(setMinimizedState({
                id: Props.AppId,
                state: !isMinimized
            }));
        }
    };

    const Focused = !isMinimized;
    
    let ClassListString = "Taskbar-App";
    if (!Props.HideStatusBar)
    {
        if (Open) ClassListString = ClassListString + " Open-Taskbar-App";
        if (Open && Focused) ClassListString = ClassListString + " Focused-Taskbar-App"
    }
    if (Props.isWindowsIcon)
        ClassListString = ClassListString + " Windows-Taskbar-Icon";

    return (
        <>
            <div className={ClassListString} onClick={OnClickHandler}>
                <motion.img variants={AnimationFrames} initial="init" animate="enterance" src={Props.Icon} className="Taskbar-App-Main-Icon" />
            </div>
        </>
    )
}

export default TaskBarApp;