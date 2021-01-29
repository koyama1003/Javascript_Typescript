import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface titleState {
  title: {
    name: string;
  };
}
const initialState: titleState = { title: { name: "Slovari" } };
export const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    titleChange: (state, action) => {
      state.title.name = action.payload;
    },
  },
});
export const { titleChange } = titleSlice.actions;
export const selectTitle = (state: RootState) => state.title.title;
export default titleSlice.reducer;
