import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitState = {
    zIndicesMap: zIndexUnit[]
}

type zIndexUnit = {
    id: number,
    zIndex: number
}

const InitialState: InitState = {
    zIndicesMap: [],
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
                return {id: element.id, zIndex: action.payload === element.id? 10 : 1};
            });
            return state;
        },
        unhandleZIndex: (state, action: PayloadAction<number>) => {
            state.zIndicesMap = state.zIndicesMap.filter((element) => element.id !== action.payload);
            return state;
        },
    }
});

export const { setZIndex, bringToFront, unhandleZIndex } = mainStateReducer.actions;

export default mainStateReducer.reducer;