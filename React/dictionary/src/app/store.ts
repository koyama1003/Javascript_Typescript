import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import wordReducer from "../features/wordSlice";
import titleReducer from "../features/titleSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    word: wordReducer,
    title: titleReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
