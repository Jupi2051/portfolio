import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskbarOpenApplication } from "@/components/windows/taskbar/taskbar-open-apps";

type InitState = {
  TaskbarOpenApplications: TaskbarOpenApplication[];
  RenderStartMenu: boolean;
};

const InitialState: InitState = {
  TaskbarOpenApplications: [],
  RenderStartMenu: false,
};

export type OpenTaskbarAppPayload = {
  AppId: number;
  id: number;
  Icon: string;
  CustomTaskbarIcon?: string;
};

const TaskbarStateReducer = createSlice({
  name: "TaskbarState",
  initialState: InitialState,
  reducers: {
    openTaskbarApplication: (
      state,
      action: PayloadAction<OpenTaskbarAppPayload>
    ) => {
      const processedApp: TaskbarOpenApplication = {
        AppId: action.payload.AppId,
        id: action.payload.id,
        Icon: action.payload.CustomTaskbarIcon ?? action.payload.Icon,
      };
      state.TaskbarOpenApplications = [
        ...state.TaskbarOpenApplications,
        processedApp,
      ];
      return state;
    },
    closeTaskbarApplication: (state, action: PayloadAction<number>) => {
      state.TaskbarOpenApplications = state.TaskbarOpenApplications.filter(
        (element) => element.id !== action.payload
      );
      return state;
    },
    setTaskbarApplications: (
      state,
      action: PayloadAction<TaskbarOpenApplication[]>
    ) => {
      state.TaskbarOpenApplications = action.payload;
      return state;
    },
    setRenderStartMenu: (state, action: PayloadAction<boolean>) => {
      state.RenderStartMenu = action.payload;
      return state;
    },
  },
});

export const {
  openTaskbarApplication,
  closeTaskbarApplication,
  setTaskbarApplications,
  setRenderStartMenu,
} = TaskbarStateReducer.actions;

export default TaskbarStateReducer.reducer;
