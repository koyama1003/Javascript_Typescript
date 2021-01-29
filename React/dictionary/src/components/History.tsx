import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchExample, searchPhrase } from "../features/wordSlice";
import jishoApi from "unofficial-jisho-api";
import axios from "axios";
interface Props {
  word: string;
  timestamp: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    date: {
      fontFamily: "timesnewroman",
    },
  })
);

const History: React.FC<Props> = ({ word, timestamp }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const jisho = new jishoApi();
  const proxy = "https://cors-anywhere.herokuapp.com/";

  const url_phrase = proxy + jisho.getUriForPhraseSearch(`"${word}"`);
  const url_example = proxy + jisho.getUriForExampleSearch(`"${word}"`);
  const getExample = async () => {
    try {
      const resHtml = await axios.get(url_example);
      const res = jisho.parseExamplePageHtml(resHtml.data, word);

      dispatch(searchExample(res.results));
    } catch (err) {
      alert(err.message);
    }
  };

  const getPhrase = async () => {
    try {
      const res = await axios.get(url_phrase);
      dispatch(searchPhrase(res.data.data));
    } catch (err) {
      alert(err.mesage);
    }
  };

  const handleClick = (): void => {
    history.push(`search`);
    getExample();
    getPhrase();
  };
  return (
    <>
      <Typography align="center" variant="subtitle2" className={classes.date}>
        {timestamp}
      </Typography>
      <Typography align="center">
        <Button onClick={handleClick} variant="text" color="secondary">
          {word}
        </Button>
      </Typography>
    </>
  );
};

export default History;
