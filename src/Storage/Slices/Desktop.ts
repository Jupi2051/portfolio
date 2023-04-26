import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MinimizedState = {
    id: number,
    minimized: boolean
}

type InitState = {
    minimizedStates: MinimizedState[],
    focusedAppId: number,
}

const InitialState: InitState = {
    minimizedStates: [],
    focusedAppId: -1,
};

const DesktopReducer = createSlice({
    name: "DesktopState",
    initialState: InitialState,
    reducers: {
        setMinimizedState: (state, action: PayloadAction<{id: number, state: boolean}>) => {
            state.minimizedStates = state.minimizedStates.filter((element) => element.id !== action.payload.id);
            state.minimizedStates = [...state.minimizedStates, {id: action.payload.id, minimized: action.payload.state}]
            return state;
        },
        unsetMinimizedState: (state, action: PayloadAction<number>) => {
            state.minimizedStates = state.minimizedStates.filter((element) => element.id !== action.payload);
            return state;
        },
        setFocusedApp: (state, action: PayloadAction<number>) => {
            state.focusedAppId = action.payload;
            return state;
        },
    }
});

export const { setMinimizedState, unsetMinimizedState, setFocusedApp } = DesktopReducer.actions;

export default DesktopReducer.reducer;