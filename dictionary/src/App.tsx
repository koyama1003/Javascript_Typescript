import React, { useState, useEffect } from "react";
import axios from "axios";
import jishoApi from "unofficial-jisho-api";

const App: React.FC = () => {
  const jisho = new jishoApi();
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const [word, setWord] = useState<string>("");
  const url_phrase = proxy + jisho.getUriForPhraseSearch(word);

  const url_example = proxy + jisho.getUriForExampleSearch("令");

  const searchExample = async () => {
    const res = await axios.get(url_example);

    const json = jisho.parseExamplePageHtml(res.data, "令");
    console.log(json.results);
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
      <button onClick={searchPhrase}>search</button>
      <button onClick={searchExample}>search</button>
    </div>
  );
};

export default App;
