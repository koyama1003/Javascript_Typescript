import React, { useReducer } from "react";
import AppContext from "./AppContext";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import reducer from "../reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    awsImage: {
      maxWidth: "80%",
      paddingBottom: "40px",
      margin: 10,
    },
    box: {
      background: "linear-gradient(180deg, #F2F2F2 10%, #FFFFFF 90%)",
      border: 0,
      borderRadius: 10,
      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
      padding: "10px",
    },
    childContainer: {
      height: 300,
    },
    navbar: {
      width: "50%",
      position: "sticky",
      bottom: 10,
      background: "rgba(0,0,0,0)",
      flexGrow: 1,
    },
    paper: {
      margin: "5px",
      padding: "20px",
      textAlign: "center",
      fontSize: 20,
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
    paperbottom: {
      padding: "40px",
      marginBottom: "80px",
      textAlign: "center",
      fontSize: 20,
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
    paperWorks: {
      border: "solid 1px",
      margin: "10px",
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
    },

    player: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    playerWrapper: {
      position: "relative",
      paddingTop: "56.25%",
    },
    smallAvatar: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      color: "transparent",
      objectFit: "cover",
      textAlign: "center",
      borderRadius: "50%",
    },

    text: {
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
      fontSize: 14,
    },

    title: {
      fontSize: 18,
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
    },

    tree: {
      flexGrow: 1,
      maxWidth: 400,
      marginBottom: 20,
    },

    worksText: {
      fontFamily: `Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI`,
    },
  })
);

const AppContextProvider: React.FC = ({ children }) => {
  const initialState = {
    paginations: 1,
    navigations: 0,
  };
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ classes, state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
