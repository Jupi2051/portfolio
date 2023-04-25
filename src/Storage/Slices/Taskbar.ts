import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskbarOpenApplication } from "../../Components/OpenApps";

type InitState = {
    TaskbarOpenApplications: TaskbarOpenApplication[]
}

const InitialState: InitState = {
    TaskbarOpenApplications: []
};

const TaskbarStateReducer = createSlice({
    name: "TaskbarState",
    initialState: InitialState,
    reducers: {
        openTaskbarApplication: (state, action: PayloadAction<TaskbarOpenApplication>) => {
            state.TaskbarOpenApplications = [...state.TaskbarOpenApplications, action.payload]
            return state;
        },
        closeTaskbarApplication: (state, action: PayloadAction<number>) => {
            state.TaskbarOpenApplications = state.TaskbarOpenApplications.filter((element) => element.id !== action.payload);
            return state;
        }
    }
});

export const { openTaskbarApplication, closeTaskbarApplication } = TaskbarStateReducer.actions;

export default TaskbarStateReducer.reducer;