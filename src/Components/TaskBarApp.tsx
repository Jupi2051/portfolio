import React, { useState } from "react";
import "../Styles/TaskbarApp.css"
import { Reorder, motion } from "framer-motion";
import { TaskbarOpenApplication } from "./OpenApps";
import WindowsSettings from "./WindowsSettings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Store";
import { setRenderWindowsSettings } from "../Storage/Slices/Taskbar";

type PropTypes = {
    Icon: string,
    HideStatusBar?: boolean,
    isWindowsIcon?: boolean,
    AppId?: number,
}

function TaskBarApp(Props: PropTypes)
{
    const AnimationFrames = {
        init: {
            y: 50,
        },
        enterance: {
            y: 0,
        }
    };
    const [Open, SetOpen] = useState(false);
    const [Focused, SetFocused] = useState(false);
    const RenderWindowsSettings = useSelector((x: RootState) => x.taskbarState.RenderWindowsSettings);
    const dispatch = useDispatch();

    const OnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (Props.isWindowsIcon) {
            dispatch(setRenderWindowsSettings(!RenderWindowsSettings));
            return;
        }

        event.preventDefault();
        if (!Open)
        {
            SetOpen(true);
            SetFocused(true);
        }
        else
            SetFocused(!Focused);
    };

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