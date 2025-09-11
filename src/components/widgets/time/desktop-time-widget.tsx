import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DesktopTimeWidget() {
  const [isTesting, setIsTesting] = useState(false);
  const [testIndex, setTestIndex] = useState(0);

  // Helper function to format time without leading zero for single-digit hours
  const formatTimeWithoutLeadingZero = (date: Date) => {
    const timeString = date.toLocaleString("en-US", {
      hour: "numeric", // Use "numeric" instead of "2-digit" to remove leading zero
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return timeString;
  };

  // Test data with different time strings to see the transition effect
  const testTimes = [
    "12:00:00",
    "12:00:01",
    "12:00:02",
    "12:00:03",
    "12:00:04",
    "12:00:05",
    "12:00:06",
    "12:00:07",
    "12:00:08",
    "12:00:09",
    "12:00:10",
  ];

  // Test data for day names
  const testDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Test data for separate date components
  const testDayNumbers = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ];
  const testMonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];
  const testYears = [
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
    "2035",
  ];

  // Test data for AM/PM times (without leading zeros for single-digit hours)
  const testTimesWithAMPM = [
    "12:00:00 AM",
    "12:00:01 AM",
    "12:00:02 AM",
    "12:00:03 AM",
    "12:00:04 AM",
    "12:00:05 AM",
    "12:00:06 AM",
    "12:00:07 AM",
    "12:00:08 AM",
    "12:00:09 AM",
    "12:00:10 AM",
    "1:00:00 AM",
    "2:00:00 AM",
    "3:00:00 AM",
    "4:00:00 AM",
    "5:00:00 AM",
    "6:00:00 AM",
    "7:00:00 AM",
    "8:00:00 AM",
    "9:00:00 AM",
  ];

  // New state variables for day, date components, and time with AM/PM
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

  // Function to check which characters have changed
  const getChangedIndices = (current: string, previous: string) => {
    const changedIndices = new Set<number>();
    const maxLength = Math.max(current.length, previous.length);

    for (let i = 0; i < maxLength; i++) {
      if (current[i] !== previous[i]) {
        changedIndices.add(i);
      }
    }

    return changedIndices;
  };

  useEffect(() => {
    const IntervalContainer = setInterval(() => {
      if (isTesting) {
        setTestIndex((prevIndex) => (prevIndex + 1) % testTimes.length);
        setDayText(testDays[testIndex % testDays.length]);
        setDayNumber(testDayNumbers[testIndex % testDayNumbers.length]);
        setMonthName(testMonthNames[testIndex % testMonthNames.length]);
        setYear(testYears[testIndex % testYears.length]);

        const newTestTime = testTimesWithAMPM[testIndex];
        setPreviousTime(timeWithAMPM);
        setTimeWithAMPM(newTestTime);
      } else {
        const now = new Date();
        setDayText(now.toLocaleDateString("en-US", { weekday: "long" }));
        setDayNumber(now.toLocaleDateString("en-US", { day: "2-digit" }));
        setMonthName(now.toLocaleDateString("en-US", { month: "long" }));
        setYear(now.toLocaleDateString("en-US", { year: "numeric" }));

        const newTime = formatTimeWithoutLeadingZero(now);
        setPreviousTime(timeWithAMPM);
        setTimeWithAMPM(newTime);
      }
    }, 1000);

    return () => clearInterval(IntervalContainer);
  }, [
    isTesting,
    testIndex,
    testTimes,
    testDays,
    testDayNumbers,
    testMonthNames,
    testYears,
    testTimesWithAMPM,
  ]);

  return (
    <div className="w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
      <motion.div
        className="absolute bottom-2 right-4 sm:right-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-[120%] flex flex-col items-end sm:items-center sm:justify-center sm:text-center text-white"
        initial={{ opacity: 0, filter: "blur(40px)", scale: 0.5 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      >
        <AnimatePresence>
          <motion.h1
            className="font-lato uppercase font-extrabold text-3xl sm:text-8.5xl leading-none"
            key="dayText"
          >
            {dayText}
          </motion.h1>
          <motion.h1 className="flex gap-2 text-xl sm:text-3xl" key="dayNumber">
            <span>{dayNumber}</span>
            <span className="uppercase">{monthName}</span>
            <span>{year}</span>
          </motion.h1>
          <motion.h1
            className="text-lg sm:text-3xl font-lato font-medium flex sm:py-5 relative"
            key="timeWithAMPM"
          >
            <span className="hidden sm:block absolute w-fit top-1/2 -translate-y-1/2 left-full translate-x-full text-left font-capirola font-extrabold">
              -
            </span>
            <span className="hidden sm:block absolute w-fit top-1/2 -translate-y-1/2 right-full -translate-x-full font-capirola font-extrabold">
              -
            </span>
            {timeWithAMPM
              .split(" ")[0]
              .split("")
              .map((char, index) => {
                const timePart = timeWithAMPM.split(" ")[0];
                const prevTimePart = previousTime.split(" ")[0];
                const hasChanged = timePart[index] !== prevTimePart[index];

                // Check if this is the seconds part (last 2 characters)
                const isSeconds = index >= timePart.length - 2;

                if (isSeconds) {
                  return (
                    <span key={`${timeWithAMPM}-${index}`}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                }

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
