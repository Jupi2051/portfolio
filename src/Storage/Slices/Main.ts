import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenApplication } from "../../Components/Desktop";

type zIndexUnit = {
    id: number,
    zIndex: number
}

type InitState = {
    zIndicesMap: zIndexUnit[],
    OpenApplications: OpenApplication[], // Open Application uses React node as a type, its an unserializable
}

const InitialState: InitState = {
    zIndicesMap: [],
    OpenApplications: [],
};

const mainStateReducer = createSlice({
    name: "mainState",
    initialState: InitialState,
    reducers: {
        setZIndex: (state, action: PayloadAction<{id: number, zindex: number}>) => {
            state.zIndicesMap = state.zIndicesMap.filter((element) => element.id !== action.payload.id);
            state.zIndicesMap = [...state.zIndicesMap, {id: action.payload.id, zIndex: action.payload.zindex}];
            return state;
        },
        bringToFront: (state, action: PayloadAction<number>) => {
            state.zIndicesMap = state.zIndicesMap.map((element) => {
                return {
                    id: element.id,
                    zIndex: action.payload === element.id? 10 : 1
                };
            });
            return state;
        },
        unhandleZIndex: (state, action: PayloadAction<number>) => {
            state.zIndicesMap = state.zIndicesMap.filter((element) => element.id !== action.payload);
            return state;
        },
        closeApplication: (state, action: PayloadAction<number>) => {
            state.OpenApplications = state.OpenApplications.filter((element) => element.id !== action.payload);
            state.zIndicesMap = state.zIndicesMap.filter((element) => element.id !== action.payload);
            return state;
        },
        openApplication: (state, action: PayloadAction<OpenApplication>) => {
            state.OpenApplications = [...state.OpenApplications, action.payload];
            state.zIndicesMap = state.zIndicesMap.filter((element) => element.id !== action.payload.id);
            state.zIndicesMap = [...state.zIndicesMap, {id: action.payload.id, zIndex: 999}];
            return state;
        },
    }
});

export const { setZIndex, bringToFront, unhandleZIndex, closeApplication, openApplication, } = mainStateReducer.actions;

export default mainStateReducer.reducer;