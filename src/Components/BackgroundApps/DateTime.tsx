import moment from "moment";
import { useEffect, useState } from "react";
import "../../Styles/BackgroundApps/DateTime.css";

function DateTime()
{
    const [DateTime, SetDateTime] = useState(new Date());


    useEffect(() => {
        const SecondTimer = setInterval(() => {
            SetDateTime(new Date());
        });
        return () => clearInterval(SecondTimer);
    }, [])

    return <div className="date-time-container">
        <p>{moment(DateTime).format("LT")}</p>
        <p>{moment(DateTime).format("l")}</p>
    </div>
}

export default DateTime;