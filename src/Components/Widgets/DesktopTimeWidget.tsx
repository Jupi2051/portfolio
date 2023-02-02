// import "../Styles/Widgets/DesktopTimeWidget.css";
import { useEffect, useState } from "react";
import "../../Styles/Widgets/DesktopTimeWidget.css";

function DesktopTimeWidget()
{

    const [Time, SetTime] = useState((new Date().toLocaleString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true})).replace("AM", "").replace("PM", ""))

    useEffect(() => {
        const IntervalContainer = setInterval(() => {
            SetTime((new Date().toLocaleString("en-US", {hour: "2-digit", minute: "2-digit", hour12: true})).replace("AM", "").replace("PM", ""));
        }, 1000)

        return () => clearInterval(IntervalContainer);
    }, [])

    return (
        <div className="Desktop-Time-Widget">
            <h1>{Time}</h1>
        </div>
    )
}

export default DesktopTimeWidget;