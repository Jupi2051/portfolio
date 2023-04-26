import { configureStore } from "@reduxjs/toolkit";
import mainState from "./Slices/Main";
import TaskbarState from "./Slices/Taskbar";
import DesktopState from "./Slices/Desktop";

const store = configureStore({
    reducer: {
        mainState: mainState,
        taskbarState: TaskbarState,
        desktopState: DesktopState
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;