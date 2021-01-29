import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import AppContext from "../Contexts/AppContext";
const Title = (props) => {
  const { classes } = useContext(AppContext);
  return (
    <>
      <Typography className={classes.typography} align="center" variant="h1">
        {props.name}
      </Typography>
      <Typography
        className={classes.subtitle}
        align="center"
        variant="subtitle2"
      >
        -Берём время с нами-
      </Typography>
    </>
  );
};

export default Title;
