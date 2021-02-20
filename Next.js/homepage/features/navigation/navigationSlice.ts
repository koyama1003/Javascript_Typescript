import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface navigationState {
  value: number;
}

const initialState: navigationState = {
  value: 0,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    changeNav: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { changeNav } = navigationSlice.actions;
export const navigationStates = (state: RootState) => state.navigation;
export default navigationSlice.reducer;
