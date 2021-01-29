import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface PhraseResult {
  japanese: { word: string; reading: string }[];
  senses: { english_definitions: string[]; parts_of_speech: string[] }[];
}
interface ExampleResult {
  english: string;
  kana: string;
  kanji: string;
  pieces: { lifted: string; unlifted: string }[];
}

export interface wordState {
  word: {
    phrase: PhraseResult[];
    example: ExampleResult[];
    google: string;
    reverso: {
      text: string;
      from: string;
      to: string;
      translation: string[];
      examples: { from: string; to: string }[];
    };
  };
}
const initialState: wordState = {
  word: {
    phrase: [],
    example: [],
    google: "",
    reverso: {
      text: "",
      from: "",
      to: "",
      translation: [],
      examples: [{ from: "", to: "" }],
    },
  },
};
export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    searchExample: (state, action) => {
      state.word.example = action.payload;
    },
    searchPhrase: (state, action) => {
      state.word.phrase = action.payload;
    },
    searchGoogle: (state, action) => {
      state.word.google = action.payload;
    },
    searchReverso: (state, action) => {
      state.word.reverso = action.payload;
    },
  },
});

export const {
  searchExample,
  searchPhrase,
  searchGoogle,
  searchReverso,
} = wordSlice.actions;
export const selectWord = (state: RootState) => state.word.word;
export default wordSlice.reducer;
