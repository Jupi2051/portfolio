import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Point2D = {
    x: number,
    y: number
}

type MinimizedState = {
    id: number,
    minimized: boolean,
}

type InitState = {
    minimizedStates: MinimizedState[],
    focusedAppId: number,
    mouseMovementOffset: Point2D
}

const InitialState: InitState = {
    minimizedStates: [],
    focusedAppId: -1,
    mouseMovementOffset: {x: 0, y: 0},
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
        setMouseMovementOffset: (state, action: PayloadAction<Point2D>) => {
            state.mouseMovementOffset = action.payload;
            return state;
        },
    }
});

export const { setMinimizedState, unsetMinimizedState, setFocusedApp, setMouseMovementOffset } = DesktopReducer.actions;

export default DesktopReducer.reducer;