import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "default name",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      //  console.log("setName");
      return Object.assign({}, state, { name: action.payload });
    },
    clearName: (state) => {
      return Object.assign({}, state, { name: "" });
    },
  },
});

export default slice.reducer;

// Action Creatorsをエクスポートする
export const { setName, clearName } = slice.actions;
