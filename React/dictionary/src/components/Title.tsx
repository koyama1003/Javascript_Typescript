import React, { useEffect, useState } from "react";
import { Fade, Typography, createStyles, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectTitle } from "../features/titleSlice";

const useStyles = makeStyles(() =>
  createStyles({
    typography: {
      fontFamily: "selif",
      paddingTop: "10%",
    },
  })
);

const Title: React.FC = () => {
  const classes = useStyles();
  const title = useSelector(selectTitle);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    setFade(true);
    return () => {
      setFade(false);
    };
  }, []);

  return (
    <Fade in={fade}>
      <Typography align="center" className={classes.typography} variant="h2">
        {title.name}
      </Typography>
    </Fade>
  );
};

export default Title;
