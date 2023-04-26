import React, { useState } from "react";
import "../Styles/TaskbarApp.css"
import { Reorder, motion } from "framer-motion";
import { TaskbarOpenApplication } from "./OpenApps";

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
    const OnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
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
    {
        ClassListString = ClassListString + " Windows-Taskbar-Icon";
    }
    return (
        <div className={ClassListString} onClick={OnClickHandler}>
            <motion.img variants={AnimationFrames} initial="init" animate="enterance" src={Props.Icon} className="Taskbar-App-Main-Icon" />
        </div>
    )
}

export default TaskBarApp;