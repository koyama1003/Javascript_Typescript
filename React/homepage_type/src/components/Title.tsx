import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box, Avatar } from "@material-ui/core";
import avatar from "../images/avatar.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    subtext: {
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
      fontSize: 16,
    },
    titlebox: {
      flexGrow: 1,
      padding: "10px",
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
      fontSize: 24,
    },
    typography: {
      paddingTop: "40px",
      flexGrow: 1,
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
      fontSize: 48,
    },
  })
);
const Title = () => {
  const classes = useStyles();

  return (
    <Typography
      component="div"
      align="center"
      variant="h1"
      gutterBottom
      data-testid="TitleAll"
      className={classes.typography}
    >
      My Portfolio
      <Box className={classes.titlebox}>-Thank you for visiting!-</Box>
      <Grid container justify="center">
        <Avatar
          alt="My Portfolio"
          src={avatar}
          className={classes.avatar}
          variant="circular"
        />
      </Grid>
    </Typography>
  );
};
export default Title;
