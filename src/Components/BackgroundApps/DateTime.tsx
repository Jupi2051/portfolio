import moment from "moment";
import { useEffect, useState } from "react";

function DateTime() {
  const [DateTime, SetDateTime] = useState(new Date());

  useEffect(() => {
    const SecondTimer = setInterval(() => {
      SetDateTime(new Date());
    });
    return () => clearInterval(SecondTimer);
  }, []);

  return (
    <div className="text-white font-segoe-ui flex-col items-center text-xs -tracking-tight select-none">
      <p className="text-right select-none">{moment(DateTime).format("LT")}</p>
      <p className="text-right select-none">{moment(DateTime).format("l")}</p>
    </div>
  );
}

export default DateTime;
