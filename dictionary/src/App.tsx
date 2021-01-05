import React, { useState } from "react";
import axios from "axios";
import jishoApi from "unofficial-jisho-api";

const App: React.FC = () => {
  const jisho = new jishoApi();
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const [word, setWord] = useState<string>("");
  const url_phrase = proxy + jisho.getUriForPhraseSearch(word);
  const url_example = proxy + jisho.getUriForExampleSearch(word);

  const searchExample = async () => {
    try {
      const resHtml = await axios.get(url_example);

      const res = jisho.parseExamplePageHtml(resHtml.data, word);
      console.log(res.results);
    } catch (err) {
      alert(err.message);
    }
  };

  const searchPhrase = async () => {
    try {
      const res = await axios.get(url_phrase);
      console.log(res.data);
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
      <button onClick={searchPhrase}>Phrase</button>
      <button onClick={searchExample}>Example</button>
    </div>
  );
};

export default App;
