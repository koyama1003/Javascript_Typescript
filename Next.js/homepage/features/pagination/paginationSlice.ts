import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface paginationState {
  value: number;
  texts: string[];
  choiced: string;
}

const initialState: paginationState = {
  value: 1,
  texts: [
    "2020年7月　Pythonを学び始める。スクレイピングでwebより本日仲値を取得、計算結果を転記したメールを上司へ自動送付するプログラムをbatファイル化し運用していた。",
    "2020年9月 PythonとFlaskでwebアプリを作成。Ruby on Railsの学習開始",
    "2020年11月　TypescriptでのReact HooksとRedux,Firebaseの学習を一通り終わらせ、ポートフォリオ、webアプリ作成にとりかかる",
    "2021年1月　Express,typeorm,Nest.js,Next.jsを一通り学習しフロントもバックもJS,TSで実装ができるようになる。",
    "2021年2月現在　レガシー化した既存環境を置き換えるビジネスに向け、GraphQL、gRPCを学習予定",
  ],
  choiced:
    "2020年7月　Pythonを学び始める。スクレイピングでwebより本日仲値を取得、計算結果を転記したメールを上司へ自動送付するプログラムをbatファイル化し運用していた。",
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      state.choiced = state.texts[state.value - 1];
    },
  },
});
export const { changePage } = paginationSlice.actions;
export const paginationStates = (state: RootState) => state.pagination;
export default paginationSlice.reducer;
