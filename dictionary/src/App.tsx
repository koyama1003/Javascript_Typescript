import React, { useState } from "react";
import axios from "axios";
import jishoApi from "unofficial-jisho-api";
import { useSelector, useDispatch } from "react-redux";
import { searchExample, searchPhrase } from "./features/wordSlice";
import { selectWord } from "./features/wordSlice";
const App: React.FC = () => {
  const jisho = new jishoApi();
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const [word, setWord] = useState<string>("");
  const url_phrase = proxy + jisho.getUriForPhraseSearch(word);
  const url_example = proxy + jisho.getUriForExampleSearch(word);
  const words = useSelector(selectWord);
  const dispatch = useDispatch();

  const getExample = async () => {
    try {
      const resHtml = await axios.get(url_example);

      const res = jisho.parseExamplePageHtml(resHtml.data, word);
      console.log(res.results);
      dispatch(searchExample(res.results));
    } catch (err) {
      alert(err.message);
    }
  };

  const getPhrase = async () => {
    try {
      const res = await axios.get(url_phrase);
      console.log(res.data.data);
      dispatch(searchPhrase(res.data.data));
    } catch (err) {
      alert(err.mesage);
    }
  };

  return (
    <div>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setWord(e.target.value);
        }}
      />
      <button onClick={getPhrase}>Phrase</button>
      <button onClick={getExample}>Example</button>
    </div>
  );
};

export default App;
