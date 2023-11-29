import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {password: string} = {
    password: ""
};

const ControlsStateReducer = createSlice({
    name: "ControlsState",
    initialState: initialState,
    reducers: {
        stateControlsUpdatePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
            return state;
        },
    }
});

export const { stateControlsUpdatePassword } = ControlsStateReducer.actions;

export default ControlsStateReducer.reducer;