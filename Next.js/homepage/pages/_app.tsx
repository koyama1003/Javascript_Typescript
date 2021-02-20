import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Component className={classes.background} {...pageProps} />
    </Provider>
  );
};
const URL = "https://source.unsplash.com/random";
const useStyles = makeStyles(() =>
  createStyles({
    background: {
      backgroundImage: `url(${URL})`,
    },
  })
);

export default MyApp;
