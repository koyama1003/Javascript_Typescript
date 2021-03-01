import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Dispatch,
} from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AppThunk, RootState } from "../../app/store";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export type AsyncThunkConfig<T = unknown> = {
  state: RootState;
  dispatch: Dispatch;
  extra: any;
  rejectValue: T;
};
const url = "https://api.github.com/users/koyama1003/events";

export const asyncIncrement = createAsyncThunk<
  AxiosResponse<any>,
  undefined,
  AsyncThunkConfig<{ errorMessage: string }>
>("asyncIncrement", async (_arg, _thunkAPI) => {
  const res = await axios.get(url);
  console.log(res);
  return res.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncIncrement.pending, (state, action) => {
      console.log("phase pending");
      console.log("action payload is " + action.payload);
    });
    builder.addCase(asyncIncrement.rejected, (state, action) => {
      console.log("rejected");
    });

    builder.addCase(asyncIncrement.fulfilled, (state, action) => {
      console.log("phase finished");
      console.log("action payload is " + action.payload);
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
