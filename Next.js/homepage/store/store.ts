import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import paginationReducer from "../features/pagination/paginationSlice";

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    pagination: paginationReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
