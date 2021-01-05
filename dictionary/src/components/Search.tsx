import React, { useState } from "react";
import axios from "axios";
import jishoApi from "unofficial-jisho-api";
import { Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { searchExample, searchPhrase } from "../features/wordSlice";
import { selectWord } from "../features/wordSlice";

const Search: React.FC = () => {
  const jisho = new jishoApi();
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const [word, setWord] = useState<string>("");
  const url_phrase = proxy + jisho.getUriForPhraseSearch(word);
  const url_example = proxy + jisho.getUriForExampleSearch(word);
  const list = useSelector(selectWord);
  const dispatch = useDispatch();
  console.log(list);
  const langCheck = (str: string) => {
    return str.match(
      /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/
    ) || str.match(/^[A-Za-z]+$/)
      ? true
      : false;
  };

  const getExample = async () => {
    try {
      if (langCheck(word)) {
        const resHtml = await axios.get(url_example);
        const res = jisho.parseExamplePageHtml(resHtml.data, word);
        console.log(res.results);
        dispatch(searchExample(res.results));
      } else {
        alert(`Боюсь,"The entered value - Incomplete."`);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const getPhrase = async () => {
    try {
      if (langCheck(word)) {
        const res = await axios.get(url_phrase);
        console.log(res.data.data);
        dispatch(searchPhrase(res.data.data));
      } else {
        alert(`Боюсь,"The entered value - Incomplete."`);
      }
    } catch (err) {
      alert(err.mesage);
    }
  };

  return (
    <div>
      <TextField
        color="secondary"
        variant="outlined"
        label="search"
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setWord(e.target.value);
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={getPhrase}
      >
        Phrase
      </Button>
      <Button
        variant="outlined"
        size="large"
        color="secondary"
        onClick={getExample}
      >
        Example
      </Button>
    </div>
  );
};

export default Search;
