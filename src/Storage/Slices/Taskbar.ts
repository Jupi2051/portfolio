import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskbarOpenApplication } from "@/Components/OpenApps";

type InitState = {
  TaskbarOpenApplications: TaskbarOpenApplication[];
  RenderWindowsSettings: boolean;
};

const InitialState: InitState = {
  TaskbarOpenApplications: [],
  RenderWindowsSettings: false,
};

type OpenTaskbarAppPayload = {
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
    setRenderWindowsSettings: (state, action: PayloadAction<boolean>) => {
      state.RenderWindowsSettings = action.payload;
      return state;
    },
  },
});

export const {
  openTaskbarApplication,
  closeTaskbarApplication,
  setTaskbarApplications,
  setRenderWindowsSettings,
} = TaskbarStateReducer.actions;

export default TaskbarStateReducer.reducer;
