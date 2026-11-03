import Surface from "@/components/surface"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import LoadingScreen from "@/components/intro"
import useApplicationURLParams from "./hooks/use-application-url-params"
import useAnimationsSignals from "./hooks/use-animations-signals"

const INTRO_DURATION_MS = 3000
/**
 * How long after the intro starts fading the desktop begins its entrance.
 * The fade takes 450ms (see components/intro), so 0 starts it immediately and
 * 450 waits for the fade to fully finish.
 */
const DESKTOP_REVEAL_DELAY_MS = 200

function app() {
  const urlParams = useApplicationURLParams()
  const { setAnimateIntroDone } = useAnimationsSignals()
  // Deep links skip the intro entirely.
  const [showIntro, setShowIntro] = useState(urlParams.length === 0)

  const endIntro = () => {
    setShowIntro(false)
    setTimeout(() => setAnimateIntroDone(true), DESKTOP_REVEAL_DELAY_MS)
  }

  useEffect(() => {
    if (!showIntro) {
      setAnimateIntroDone(true)
      return
    }

    const timer = setTimeout(endIntro, INTRO_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className={"App"}>
        <Surface />
      </div>
      <AnimatePresence>
        {showIntro && (
          <LoadingScreen
            key="loading-screen"
            setLoaded={endIntro}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default app
