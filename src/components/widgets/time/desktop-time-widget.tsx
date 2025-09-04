import { useEffect, useState } from "react";

function DesktopTimeWidget() {
  const [Time, SetTime] = useState(
    new Date()
      .toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace("AM", "")
      .replace("PM", "")
  );

  useEffect(() => {
    const IntervalContainer = setInterval(() => {
      SetTime(
        new Date()
          .toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace("AM", "")
          .replace("PM", "")
      );
    }, 1000);

    return () => clearInterval(IntervalContainer);
  }, []);

  return (
    <div className="w-fit absolute right-1/12 top-1/6">
      <h1 className="text-7xl text-black/50 font-open-sans">{Time}</h1>
    </div>
  );
}

export default DesktopTimeWidget;
