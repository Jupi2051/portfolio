import { setAnimateIntroDone } from "@/storage/slices/animation-signals"
import { RootState } from "@/storage/store"
import { useDispatch, useSelector } from "react-redux"

const useAnimationsSignals = () => {
  const dispatch = useDispatch()
  const animateIntro = useSelector(
    (state: RootState) => state.animationsSignalsState.animateIntro,
  )

  return {
    setAnimateIntroDone: (state: boolean) => {
      dispatch(setAnimateIntroDone({ state }))
    },
    animateIntro,
  }
}

export default useAnimationsSignals
