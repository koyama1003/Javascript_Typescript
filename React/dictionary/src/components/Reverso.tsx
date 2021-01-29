import React, { useEffect, useState } from "react";
import ReversoResult from "./ReversoResult";
import { useDispatch, useSelector } from "react-redux";
import { titleChange } from "../features/titleSlice";
import { selectUser } from "../features/userSlice";
import { searchReverso, selectWord } from "../features/wordSlice";
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

const Reverso = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const ReversoApi = require("reverso-api");
  const reverso = new ReversoApi();
  const result = useSelector(selectWord);
  const [word, setWord] = useState("");
  const [grow, setGrow] = useState(false);
  const [lang, setLang] = useState(["English", "Russian"]);

  const getContext = async () => {
    try {
      word.match(/^[А-Яа-я\s]+$/)
        ? setLang(["Russian", "English"])
        : setLang(["English", "Russian"]);
      console.log(lang);
      const res = await reverso.getContext(word, lang[0], lang[1]);
      dispatch(searchReverso(res));
      setWord("");
    } catch (err) {
      alert(err.mesage);
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

  const langCheck = (str: string) => {
    return str.match(/^[А-Яа-я\s]+$/) || str.match(/^[A-Za-z\s]+$/)
      ? true
      : false;
  };

  useEffect(() => {
    setGrow(langCheck(word));
  }, [word]);
  useEffect(() => {
    dispatch(titleChange("Reverso"));
  }, [dispatch]);

  console.log(result);
  console.log(word);
  console.log(langCheck(word));
  return (
    <>
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid item md={4} xs={6}>
          <TextField
            color="secondary"
            fullWidth
            variant="outlined"
            label="English/Русский"
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
              {result.reverso.text !== "" && word === "" ? (
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
                  Please input Engish or Russian.
                  <br /> Введите текст на русском или английском языке.
                </Typography>
              )}
            </Grow>
          ) : (
            <>
              <ButtonGroup
                className={classes.buttonGroup}
                variant="text"
                color="primary"
                size="large"
                aria-label="Search button group"
                fullWidth
              >
                <Button
                  onClick={() => {
                    getContext();
                    saveHistory();
                  }}
                >
                  Search
                </Button>
              </ButtonGroup>
            </>
          )}
        </Grid>
        <Grid item md={8} xs={10}>
          <ReversoResult />
        </Grid>
      </Grid>
    </>
  );
};

export default Reverso;
