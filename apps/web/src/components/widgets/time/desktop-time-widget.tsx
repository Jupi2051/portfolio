import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import useAnimationsSignals from "@/hooks/use-animations-signals"
import { EASE_OUT } from "@/lib/motion"

const formatTime = (date: Date) =>
  date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

const formatDate = (date: Date) => {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
  const day = date.toLocaleDateString("en-US", { day: "numeric" })
  const month = date.toLocaleDateString("en-US", { month: "long" })
  return `${weekday}, ${day} ${month}`
}

/** One digit that rolls up into place when its value changes. */
function Digit({ char }: { char: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={char}
          className="inline-block"
          initial={{ opacity: 0, y: reduceMotion ? 0 : "40%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : "-40%" }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function DesktopTimeWidget() {
  const { animateIntro } = useAnimationsSignals()
  const reduceMotion = useReducedMotion()
  const [now, setNow] = useState(() => new Date())
  const lastMinute = useRef(now.getMinutes())

  useEffect(() => {
    const timer = setInterval(() => {
      const next = new Date()
      if (next.getMinutes() === lastMinute.current) return
      lastMinute.current = next.getMinutes()
      setNow(next)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const [clock, meridiem] = formatTime(now).split(" ")
  const hidden = { opacity: 0, y: reduceMotion ? 0 : 12 }

  return (
    <motion.div
      className="absolute right-4 bottom-3 flex flex-col items-end gap-0.5 text-right select-none sm:top-11 sm:right-14 sm:bottom-auto"
      initial={hidden}
      animate={animateIntro ? { opacity: 1, y: 0 } : hidden}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <span className="font-serif text-lg leading-6 text-lilac italic [text-shadow:0_2px_12px_rgba(8,7,20,0.6)] sm:text-[30px] sm:leading-9">
        {formatDate(now)}
      </span>
      <div className="flex items-start gap-1.5 sm:gap-2">
        <span
          aria-label={formatTime(now)}
          className="flex text-[56px] leading-14 font-extralight tracking-[-0.045em] text-moon-bright tabular-nums [text-shadow:0_4px_30px_rgba(8,7,20,0.55)] sm:text-8.5xl sm:leading-28"
        >
          {clock.split("").map((char, index) => (
            <Digit key={index} char={char} />
          ))}
        </span>
        <span className="pt-2.5 text-xs leading-4 font-medium tracking-[0.14em] text-haze sm:pt-5.5 sm:text-[13px]">
          {meridiem}
        </span>
      </div>
    </motion.div>
  )
}

export default DesktopTimeWidget
