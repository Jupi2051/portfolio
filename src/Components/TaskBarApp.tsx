import React, { useState } from "react";
import "../Styles/TaskbarApp.css"

type PropTypes = {
    Icon: string,
}

function TaskBarApp(Props: PropTypes)
{
    const [Open, SetOpen] = useState(false);
    const OnClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        SetOpen(!Open);
    };

    let ClassListString = "Taskbar-App";
    return (
    <div className={Open?
        (ClassListString + " Open-Taskbar-App")
        :
        ClassListString
        } onClick={OnClickHandler}>

        <img src={Props.Icon} className="Taskbar-App-Main-Icon" />
    </div>)
}

export default TaskBarApp;