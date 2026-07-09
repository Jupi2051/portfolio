import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitState = {
  animateIntro: boolean
}

const InitialState: InitState = {
  animateIntro: false,
}

const AnimationsSignalsReducer = createSlice({
  name: "AnimationsSignalsState",
  initialState: InitialState,
  reducers: {
    setAnimateIntroDone: (state, action: PayloadAction<{ state: boolean }>) => {
      state.animateIntro = action.payload.state
      return state
    },
  },
})

export const { setAnimateIntroDone } = AnimationsSignalsReducer.actions

export default AnimationsSignalsReducer.reducer
