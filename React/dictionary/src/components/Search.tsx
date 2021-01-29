import React, { useState } from "react";
import Google from "./Google";
import Jisho from "./Jisho";
import Reverso from "./Reverso";
import {
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    textField: { minWidth: 100, margin: 10 },
  })
);

const engines = [
  {
    value: 1,
    label: "Google",
  },
  {
    value: 2,
    label: "Reverso",
  },
  {
    value: 3,
    label: "Jisho.org",
  },
];

const Search: React.FC = () => {
  const classes = useStyles();
  const [view, setView] = useState(1);
  const viewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setView(Number(e.target.value));
  };
  const returnView = () => {
    switch (view) {
      case 1:
        return <Google />;
      case 2:
        return <Reverso />;
      case 3:
        return <Jisho />;
      default:
        return <Google />;
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={2}>
        <TextField
          fullWidth
          id="selectSearchEngine"
          select
          label="SearchEngine"
          value={view}
          onChange={viewChange}
          className={classes.textField}
        >
          {engines.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {returnView()}
    </Grid>
  );
};

export default Search;
