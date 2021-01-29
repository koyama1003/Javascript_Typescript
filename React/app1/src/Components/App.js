import React from "react";
import AppContext from "../Contexts/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import Login from "./Login";
const useStyles = makeStyles((theme) => ({
  typography: {
    paddingTop: "40px",
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
  subtitle: {
    paddingBottom: "40px",
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
    fontSize: 20,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <AppContext.Provider value={{ classes }}>
      <Title name="Vremya" />
      <Login />
    </AppContext.Provider>
  );
};

export default App;
