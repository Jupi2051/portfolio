import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenApplication } from "@/components/windows/desktop";

type zIndexUnit = {
  id: number;
  zIndex: number;
};

type InitState = {
  zIndicesMap: zIndexUnit[];
  OpenApplications: OpenApplication[]; // Open Application uses React node as a type, its an unserializable
  flashingWindows: number[];
};

const InitialState: InitState = {
  zIndicesMap: [],
  flashingWindows: [],
  OpenApplications: [],
};

const mainStateReducer = createSlice({
  name: "mainState",
  initialState: InitialState,
  reducers: {
    setZIndex: (
      state,
      action: PayloadAction<{ id: number; zindex: number }>
    ) => {
      state.zIndicesMap = state.zIndicesMap.filter(
        (element) => element.id !== action.payload.id
      );
      state.zIndicesMap = [
        ...state.zIndicesMap,
        { id: action.payload.id, zIndex: action.payload.zindex },
      ];
      return state;
    },
    setWindowFlashing: (
      state,
      action: PayloadAction<{ id: number; state: boolean }>
    ) => {
      if (
        action.payload.state &&
        !state.flashingWindows.includes(action.payload.id)
      ) {
        state.flashingWindows = [...state.flashingWindows, action.payload.id];
      } else {
        state.flashingWindows = state.flashingWindows.filter(
          (element) => element !== action.payload.id
        );
      }
      return state;
    },
    bringToFront: (state, action: PayloadAction<number>) => {
      state.zIndicesMap = state.zIndicesMap.map((element) => {
        return {
          id: element.id,
          zIndex: action.payload === element.id ? 10 : 1,
        };
      });
      return state;
    },
    unhandleZIndex: (state, action: PayloadAction<number>) => {
      state.zIndicesMap = state.zIndicesMap.filter(
        (element) => element.id !== action.payload
      );
      return state;
    },
    closeApplication: (state, action: PayloadAction<number>) => {
      const appToClose = state.OpenApplications.find(
        (element) => element.id === action.payload
      );
      if (!appToClose) return state;

      const childrenProcessIds =
        appToClose?.childrenProcess?.map((element) => element) ?? [];

      const allProcessIds = [...childrenProcessIds, action.payload];

      state.OpenApplications = state.OpenApplications.filter(
        (element) => !allProcessIds.includes(element.id)
      );
      state.zIndicesMap = state.zIndicesMap.filter(
        (element) => !allProcessIds.includes(element.id)
      );
      return state;
    },
    openApplication: (state, action: PayloadAction<OpenApplication>) => {
      state.OpenApplications = [...state.OpenApplications, action.payload];
      if (action.payload.parentProcess) {
        state.OpenApplications = state.OpenApplications.map((element) => {
          if (element.id === action.payload.parentProcess) {
            return {
              ...element,
              childrenProcess: [
                ...(element.childrenProcess ?? []),
                action.payload.id,
              ],
            };
          }
          return element;
        });
      }
      state.zIndicesMap = state.zIndicesMap.filter(
        (element) => element.id !== action.payload.id
      );
      state.zIndicesMap = [
        ...state.zIndicesMap,
        { id: action.payload.id, zIndex: 999 },
      ];

      return state;
    },
    setURLParams: (
      state,
      action: PayloadAction<{ id: number; params: Record<string, string> }>
    ) => {
      state.OpenApplications = state.OpenApplications.map((element) => {
        if (element.id === action.payload.id) {
          return {
            ...element,
            URLParams: action.payload.params,
          };
        }
        return element;
      });
      return state;
    },
    deleteURLParams: (state, action: PayloadAction<number>) => {
      state.OpenApplications = state.OpenApplications.map((element) => {
        if (element.id === action.payload) {
          return { ...element, URLParams: undefined };
        }
        return element;
      });
      return state;
    },
  },
});

export const {
  setZIndex,
  bringToFront,
  setWindowFlashing,
  unhandleZIndex,
  closeApplication,
  openApplication,
  setURLParams,
  deleteURLParams,
} = mainStateReducer.actions;

export default mainStateReducer.reducer;
