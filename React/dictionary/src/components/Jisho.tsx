import React, { useState, useEffect } from "react";
import { selectUser } from "../features/userSlice";
import { selectWord } from "../features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jishoApi from "unofficial-jisho-api";
import { db } from "../firebase";
import firebase from "firebase/app";
import {
  Button,
  ButtonGroup,
  createStyles,
  Grid,
  Grow,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { searchExample, searchPhrase } from "../features/wordSlice";
import { titleChange } from "../features/titleSlice";
import JishoResult from "./JishoResult";

const useStyles = makeStyles(() =>
  createStyles({
    typography: {
      fontFamily: "selif",
      paddingTop: "20px",
    },
    buttonGroup: {
      marginTop: "10px",
      "&:hover": {
        opacity: "0.8",
      },
    },
  })
);

const Jisho = () => {
  const classes = useStyles();
  const jisho = new jishoApi();
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const user = useSelector(selectUser);
  const result = useSelector(selectWord);
  const [word, setWord] = useState("");
  const [grow, setGrow] = useState(false);
  const url_phrase = proxy + jisho.getUriForPhraseSearch(`"${word}"`);
  const url_example = proxy + jisho.getUriForExampleSearch(`"${word}"`);
  const dispatch = useDispatch();

  const langCheck = (str: string) => {
    return str.match(
      /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/
    ) ||
      str.match(/^[A-Za-z\s]+$/) ||
      str.match(/^"[A-Za-z\s]+"$/)
      ? true
      : false;
  };

  useEffect(() => {
    setGrow(langCheck(word));
    // eslint-disable-next-line
  }, [word]);

  useEffect(() => {
    dispatch(titleChange("Jisho.org"));
  }, [dispatch]);

  const getExample = async () => {
    try {
      const resHtml = await axios.get(url_example);
      const res = jisho.parseExamplePageHtml(resHtml.data, word);
      console.log(res.results);
      dispatch(searchExample(res.results));
      setWord("");
    } catch (err) {
      alert(err.message);
    }
  };
  const saveHistory = () => {
    if (user.uid) {
      db.collection("history").add({
        avatar: user.photoUrl,
        word: word,
        result: result,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      });
    }
  };

  const getPhrase = async () => {
    try {
      const res = await axios.get(url_phrase);
      console.log(res.data.data);
      dispatch(searchPhrase(res.data.data));
      setWord("");
    } catch (err) {
      alert(err.mesage);
    }
  };
  return (
    <>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item md={4} xs={6}>
          <TextField
            color="secondary"
            fullWidth
            variant="outlined"
            label="English/日本語"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setWord(e.target.value);
            }}
            value={word}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item md={8} xs={10}>
          {!langCheck(word) ? (
            <Grow
              in={!grow}
              style={{ transformOrigin: "90 90 0" }}
              {...(!grow ? { timeout: 1000 } : {})}
            >
              {(result.phrase[0] || result.example[0]) && word === "" ? (
                <Typography
                  className={classes.typography}
                  variant="h5"
                  align="center"
                >
                  Result
                </Typography>
              ) : (
                <Typography
                  className={classes.typography}
                  variant="body1"
                  align="center"
                >
                  Please input Engish or Japanese
                </Typography>
              )}
            </Grow>
          ) : (
            <>
              <ButtonGroup
                className={classes.buttonGroup}
                variant="text"
                color="secondary"
                size="large"
                aria-label="Search button group"
                fullWidth
              >
                <Button
                  onClick={() => {
                    saveHistory();
                    getExample();
                    getPhrase();
                  }}
                >
                  Search All
                </Button>
              </ButtonGroup>
              <ButtonGroup
                className={classes.buttonGroup}
                variant="text"
                color="primary"
                aria-label="Search button group"
                fullWidth
              >
                <Grow in={grow}>
                  <Button
                    onClick={() => {
                      saveHistory();
                      getPhrase();
                    }}
                  >
                    Phrase
                  </Button>
                </Grow>
                <Grow
                  in={grow}
                  style={{ transformOrigin: "0 0 0" }}
                  {...(grow ? { timeout: 1500 } : {})}
                >
                  <Button
                    onClick={() => {
                      saveHistory();
                      getExample();
                    }}
                  >
                    Example
                  </Button>
                </Grow>
              </ButtonGroup>
            </>
          )}
        </Grid>
        <Grid item md={8} xs={10}>
          <JishoResult />
        </Grid>
      </Grid>
    </>
  );
};

export default Jisho;
