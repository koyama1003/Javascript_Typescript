import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Image from "next/image";

interface Props {
  subTitle: string;
}

const Title: React.VFC<Partial<Props>> = ({ subTitle }) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        component="div"
        align="center"
        variant="h1"
        gutterBottom
        data-testid="TitleAll"
        className={classes.typography}
      >
        {subTitle}
      </Typography>
      <Box className={classes.titlebox}>
        <Image
          src="/Avatarimg.jpg"
          alt="Sojiro Koyama"
          width={100}
          height={100}
          className={classes.imageWrapper}
        />
        <br />
        <Typography
          component="div"
          align="center"
          variant="subtitle2"
          data-testid="TitleAll"
        >
          Sojiro Koyama
        </Typography>
        -Thank you for visiting!-
      </Box>
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    imageWrapper: {
      textAlign: "center",
      borderRadius: "50%",
    },
    subtext: {
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
      fontSize: 16,
    },
    titlebox: {
      textAlign: "center",
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
export default React.memo(Title);
