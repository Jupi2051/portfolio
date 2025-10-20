import { configureStore } from "@reduxjs/toolkit";
import mainState from "@/storage/slices/main";
import TaskbarState from "@/storage/slices/taskbar";
import DesktopState from "@/storage/slices/desktop";

const store = configureStore({
  reducer: {
    mainState: mainState,
    taskbarState: TaskbarState,
    desktopState: DesktopState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // The desktop apps can carry React nodes in processData
        // to disable errors
        ignoredPaths: ["mainState.OpenApplications"],
        ignoredActions: [
          "mainState/openApplication",
          "mainState/bringToFront",
          "DesktopState/setFocusedApp",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
