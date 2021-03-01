import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import useSWR from "swr";
import { RootState } from "../../store/store";

interface FetchData {
  id: number;
  repo: { name: string };
  created_at: Date;
  actor: { avatar_url: string };
  type: string;
  payload: { commits: { message: string }[] };
}
export interface Response extends FetchData {
  data: {
    slice: <T, U>(arg1: T, arg2: U) => Response[];
  };
}
type AsyncThunkConfig<T = unknown> = {
  state: RootState;
  dispatch: Dispatch;
  extra: any;
  rejectValue: T;
};

const initialState: Array<Response> = [];

export const gitFetch = createAsyncThunk<
  Response[],
  string,
  AsyncThunkConfig<{ errorMessage: string }>
>("git", async (args, thunkApi) => {
  const fetcher = (): Promise<Response> => axios.get(args);
  const { data } = useSWR(args, fetcher);
  const currentState = thunkApi.getState().git;
  const git = data?.data?.slice(0, 5);
  return [...currentState, ...git!];
});

export const gitSlice = createSlice({
  name: "git",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gitFetch.fulfilled, (state: Response[], action) => {
      if (action.payload) {
        state.push(...action.payload);
      }
    });
  },
});

export const gitStates = (state: RootState) => state.git;
export default gitSlice.reducer;
