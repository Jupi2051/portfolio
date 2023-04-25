import { configureStore } from "@reduxjs/toolkit";
import mainState from "./Slices/Main";
import TaskbarState from "./Slices/Taskbar";

const store = configureStore({
    reducer: {
        mainState: mainState,
        taskbarState: TaskbarState
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;