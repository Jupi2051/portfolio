import { configureStore } from "@reduxjs/toolkit";
import mainState from "./Slices/Main";

const store = configureStore({
    reducer: {
        mainState: mainState,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;