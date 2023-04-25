import React, { useState } from "react";
import "../Styles/TaskbarApp.css"

type PropTypes = {
    Icon: string,
    HideStatusBar?: boolean,
    isWindowsIcon?: boolean,
    AppId?: number,
}

function TaskBarApp(Props: PropTypes)
{
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
        <img src={Props.Icon} className="Taskbar-App-Main-Icon" />
    </div>)
}

export default TaskBarApp;