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
      hour12: true,
    });
    return timeString;
  };

  // Test data with different time strings to see the transition effect
  const testTimes = [
    "12:00",
    "12:01",
    "12:02",
    "12:03",
    "12:04",
    "12:05",
    "12:06",
    "12:07",
    "12:08",
    "12:09",
    "12:10",
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
    "12:00 AM",
    "12:01 AM",
    "12:02 AM",
    "12:03 AM",
    "12:04 AM",
    "12:05 AM",
    "12:06 AM",
    "12:07 AM",
    "12:08 AM",
    "12:09 AM",
    "12:10 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
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

  useEffect(() => {
    const IntervalContainer = setInterval(() => {
      if (isTesting) {
        setTestIndex((prevIndex) => (prevIndex + 1) % testTimes.length);
        setDayText(testDays[testIndex % testDays.length]);
        setDayNumber(testDayNumbers[testIndex % testDayNumbers.length]);
        setMonthName(testMonthNames[testIndex % testMonthNames.length]);
        setYear(testYears[testIndex % testYears.length]);
        setTimeWithAMPM(testTimesWithAMPM[testIndex]);
      } else {
        const now = new Date();
        setDayText(now.toLocaleDateString("en-US", { weekday: "long" }));
        setDayNumber(now.toLocaleDateString("en-US", { day: "2-digit" }));
        setMonthName(now.toLocaleDateString("en-US", { month: "long" }));
        setYear(now.toLocaleDateString("en-US", { year: "numeric" }));
        setTimeWithAMPM(formatTimeWithoutLeadingZero(now));
      }
    }, 2000);

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
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[120%] flex flex-col items-center justify-center text-center text-white"
        initial={{ opacity: 0, filter: "blur(40px)", scale: 0.5 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.h1 className="font-lato uppercase font-extrabold text-8.5xl leading-none">
            {dayText}
          </motion.h1>
          <motion.h1 className="flex gap-2 text-3xl">
            <span>{dayNumber}</span>
            <span className="uppercase">{monthName}</span>
            <span>{year}</span>
          </motion.h1>
          <motion.h1 className="text-3xl font-lato font-medium flex py-5 relative">
            <span className="absolute w-fit top-1/2 -translate-y-1/2 left-full translate-x-full text-left font-capirola font-extrabold">
              -
            </span>
            <span className="absolute w-fit top-1/2 -translate-y-1/2 right-full -translate-x-full font-capirola font-extrabold">
              -
            </span>
            {timeWithAMPM
              .split(" ")[0]
              .split("")
              .map((char, index) => (
                <motion.span
                  key={`${timeWithAMPM}-${index}`}
                  initial={{ opacity: 0, scale: 0.5, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 1.5, y: -30, rotateX: 90 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            <span className="ml-3">{timeWithAMPM.split(" ")[1]}</span>
          </motion.h1>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default DesktopTimeWidget;
