import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectWord } from "../features/wordSlice";
import { titleChange } from "../features/titleSlice";
import { searchGoogle } from "../features/wordSlice";
import {
  Button,
  ButtonGroup,
  createStyles,
  Grid,
  Grow,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import GTranslateIcon from "@material-ui/icons/GTranslate";

const useStyles = makeStyles(() =>
  createStyles({
    textField: { minHeight: 100 },
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

const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "ru",
    label: "Русский",
  },
  {
    value: "ja",
    label: "日本語",
  },
];

const Google: React.FC = () => {
  const word = useSelector(selectWord);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [lang, setLang] = useState("ja");
  const [target, setTarget] = useState("en");
  const [grow, setGrow] = useState(false);
  const langChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLang(e.target.value);
  };
  const targetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
  };
  const url = `https://script.google.com/macros/s/AKfycbywwPm15njoqqG12NQcNKUNPqkx2n146MtCUxtav8kK9yrjF6TUYntL/exec?text=${text}&source=${lang}&target=${target}`;

  const translateGoogle = async () => {
    if (lang !== target) {
      const res = await axios.get(url);
      dispatch(searchGoogle(res.data.text));
    } else {
      window.alert(
        `Input and Output languages are same!
        Выберите пару других языков!`
      );
    }
  };
  const title = "Translate/Переводчик";

  useEffect(() => {
    dispatch(titleChange(title));
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setGrow(true);
    }
    return () => {
      setGrow(false);
    };
  }, []);

  return (
    <Grid container spacing={1} justify="center">
      <Grid item sm={5} xs={8}>
        <TextField
          id="selectInputLanguage"
          fullWidth
          select
          label="Input Language"
          value={lang}
          onChange={langChange}
        >
          {languages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Grow
          in={grow}
          style={{ transformOrigin: "0 90 0" }}
          {...(grow ? { timeout: 800 } : {})}
        >
          <TextField
            multiline
            InputProps={{ classes: { input: classes.textField } }}
            placeholder="Input Text"
            color="secondary"
            variant="outlined"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setText(e.target.value);
            }}
            value={text}
          />
        </Grow>
      </Grid>
      <Grid item sm={5} xs={8}>
        <TextField
          id="standard-select-currency"
          fullWidth
          select
          label="Output Language"
          value={target}
          onChange={targetChange}
        >
          {languages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <Grow
          in={grow}
          style={{ transformOrigin: "23 40 21" }}
          {...(grow ? { timeout: 1400 } : {})}
        >
          <TextField
            variant="outlined"
            InputProps={{
              readOnly: true,
              classes: { input: classes.textField },
            }}
            fullWidth
            placeholder="Output"
            value={word.google}
            multiline
          />
        </Grow>
      </Grid>
      <Grid item xs={8}>
        <ButtonGroup
          className={classes.buttonGroup}
          variant="outlined"
          color="secondary"
          size="large"
          aria-label="Search button group"
          fullWidth
        >
          <Button
            variant="text"
            startIcon={<GTranslateIcon />}
            onClick={() => {
              translateGoogle();
            }}
          >
            Translate
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Google;
