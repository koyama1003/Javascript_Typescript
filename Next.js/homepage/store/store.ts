import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import paginationReducer from "../features/pagination/paginationSlice";
import gitReducer from "../features/git/gitSlice";
const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    pagination: paginationReducer,
    git: gitReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
