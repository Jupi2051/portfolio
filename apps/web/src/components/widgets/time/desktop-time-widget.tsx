import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DesktopTimeWidget() {
  // Helper function to format time without leading zero for single-digit hours
  const formatTimeWithoutLeadingZero = (date: Date) => {
    const timeString = date.toLocaleString("en-US", {
      hour: "numeric", // Use "numeric" instead of "2-digit" to remove leading zero
      minute: "2-digit",
      hour12: true,
    });
    return timeString;
  };

  // State variables for day, date components, and time with AM/PM
  const [dayText, setDayText] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );

  // Separate state variables for date components
  const [dayNumber, setDayNumber] = useState(
    new Date().toLocaleDateString("en-US", { day: "2-digit" })
  );

  const [monthName, setMonthName] = useState(
    new Date().toLocaleDateString("en-US", { month: "long" })
  );

  const [year, setYear] = useState(
    new Date().toLocaleDateString("en-US", { year: "numeric" })
  );

  const [timeWithAMPM, setTimeWithAMPM] = useState(
    formatTimeWithoutLeadingZero(new Date())
  );

  // Track previous time to compare changes
  const [previousTime, setPreviousTime] = useState(
    formatTimeWithoutLeadingZero(new Date())
  );

  useEffect(() => {
    const IntervalContainer = setInterval(() => {
      const now = new Date();
      setDayText(now.toLocaleDateString("en-US", { weekday: "long" }));
      setDayNumber(now.toLocaleDateString("en-US", { day: "2-digit" }));
      setMonthName(now.toLocaleDateString("en-US", { month: "long" }));
      setYear(now.toLocaleDateString("en-US", { year: "numeric" }));

      const newTime = formatTimeWithoutLeadingZero(now);
      setPreviousTime(timeWithAMPM);
      setTimeWithAMPM(newTime);
    }, 1000);

    return () => clearInterval(IntervalContainer);
  }, [timeWithAMPM]);

  return (
    <div className="w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
      <motion.div
        className="absolute bottom-2 right-4 sm:right-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-[120%] flex flex-col items-end sm:items-center sm:justify-center sm:text-center text-white"
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8, y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <AnimatePresence>
          <motion.h1
            className="font-lato uppercase font-extrabold text-3xl sm:text-8.5xl leading-none"
            key="dayText"
          >
            {dayText}
          </motion.h1>
          <motion.h1
            className="flex gap-2 text-xl sm:text-[1.775rem] font-anek-telugu font-extralight relative sm:top-4"
            key="dayNumber"
          >
            <span>{dayNumber}</span>
            <span className="uppercase">{monthName}</span>
            <span>{year}</span>
          </motion.h1>
          <motion.h1
            className="text-lg sm:text-3xl font-roboto font-light flex sm:py-5 relative"
            key="timeWithAMPM"
          >
            <span className="hidden sm:block absolute w-fit top-1/2 -translate-y-1/2 left-full translate-x-full text-left font-capirola text-sm font-thin">
              -
            </span>
            <span className="hidden sm:block absolute w-fit top-1/2 -translate-y-1/2 right-full -translate-x-full font-capirola text-sm font-thin">
              -
            </span>
            {timeWithAMPM
              .split(" ")[0]
              .split("")
              .map((char, index) => {
                const timePart = timeWithAMPM.split(" ")[0];
                const prevTimePart = previousTime.split(" ")[0];
                const hasChanged = timePart[index] !== prevTimePart[index];

                return (
                  <motion.span
                    key={`${timeWithAMPM}-${index}`}
                    initial={
                      hasChanged
                        ? { opacity: 0, scale: 0.5, y: 30, rotateX: -90 }
                        : undefined
                    }
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0 }}
                    transition={
                      hasChanged
                        ? {
                            duration: 0.3,
                            delay: index * 0.05,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }
                        : {}
                    }
                    style={{ display: "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            <span className="ml-3">{timeWithAMPM.split(" ")[1]}</span>
          </motion.h1>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default DesktopTimeWidget;
