import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
interface TitleProps {
  name: string;
}

const Title: React.FC<TitleProps> = ({ name }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.typography} variant="h1">
      {name}
    </Typography>
  );
};

export default Title;
