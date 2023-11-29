import { configureStore } from "@reduxjs/toolkit";
import mainState from "./Slices/Main";
import TaskbarState from "./Slices/Taskbar";
import DesktopState from "./Slices/Desktop";
import ControlsState from "./Slices/Controls";

const store = configureStore({
    reducer: {
        mainState: mainState,
        taskbarState: TaskbarState,
        desktopState: DesktopState,
        controlsState: ControlsState
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;