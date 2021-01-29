import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import AppContext from "../contexts/AppContext";
const Title = (props) => {
  const { classes } = useContext(AppContext);
  return (
    <>
      <Typography
        className={classes.typography}
        style={{ paddingTop: "20px" }}
        align="center"
        variant="h1"
      >
        {props.name}
      </Typography>
      <Typography
        className={classes.subtitle}
        align="center"
        variant="subtitle2"
      >
        -Проверяем свой список дел-
      </Typography>
    </>
  );
};

export default Title;
