import Surface from "@/components/surface"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import LoadingScreen from "@/components/intro"
import useApplicationURLParams from "./hooks/use-application-url-params"
import useAnimationsSignals from "./hooks/use-animations-signals"

function app() {
  const urlParams = useApplicationURLParams()
  const { animateIntro, setAnimateIntroDone } = useAnimationsSignals()

  useEffect(() => {
    if (urlParams.length > 0) {
      setAnimateIntroDone(true)
      return
    }

    setTimeout(() => setAnimateIntroDone(true), 3000)
  }, [])

  return (
    <AnimatePresence>
      <div className={"App"}>
        <Surface key={"surfaces"} />
      </div>
      {!animateIntro && (
        <LoadingScreen key={"loading-screen"} setLoaded={setAnimateIntroDone} />
      )}
    </AnimatePresence>
  )
}

export default app
