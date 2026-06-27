import { format } from "date-fns"
import { useEffect, useState } from "react"
import BackgroundAppWrapper from "./background-app-wrapper"

function DateTime() {
  const [DateTime, SetDateTime] = useState(new Date())

  useEffect(() => {
    const SecondTimer = setInterval(() => {
      SetDateTime(new Date())
    })
    return () => clearInterval(SecondTimer)
  }, [])

  return (
    <BackgroundAppWrapper>
      <div className="text-white font-segoe-ui flex-col items-center text-sm tracking-wide select-none">
        <p className="text-right select-none">
          {format(DateTime, "p")}
        </p>
        <p className="text-right select-none">{format(DateTime, "P")}</p>
      </div>
    </BackgroundAppWrapper>
  )
}

export default DateTime
