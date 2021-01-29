import React, { useState, useEffect, useReducer } from "react";
import AppContext from "./contexts/AppContext";
import reducer from "./reducers";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import { fade, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import MuiAlert from "@material-ui/lab/Alert";
import TopAppBar from "./components/TopAppBar";

//Style
const useStyles = makeStyles((theme) => ({
  autoCompleteCloseIcon: {
    opacity: 0.6,
    width: 18,
    height: 18,
  },

  autoCompleteColor: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2,
  },
  autoCompleteIconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2,
  },
  autoCompleteOption: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent",
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  autoCompletePaper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13,
  },
  autoCompleteText: {
    flexGrow: 1,
  },
  blackcell: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  bottomNav: {
    width: "100%",
    position: "fixed",
    bottom: 20,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  datepicker: {
    padding: "5px",
  },
  editModalPaper: {
    paddingTop: "20%",
    width: "70%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  inputBase: {
    padding: 10,
    width: "100%",
    borderBottom: "1px solid #dfe2e5",
    "& input": {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      border: "1px solid #ced4da",
      fontSize: 14,
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  modalPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  oddRow: {
    backgroundColor: theme.palette.action.hover,
  },
  paper: {
    padding: "5px",
    textAlign: "center",
    fontSize: 20,
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  popperDisablePortal: {
    position: "relative",
  },
  subtitle: {
    paddingBottom: "40px",
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
    fontSize: 20,
  },
  tag: {
    marginTop: 3,
    height: 20,
    padding: ".15em 4px",
    fontWeight: 600,
    lineHeight: "15px",
    borderRadius: 2,
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  tagList: {
    width: "20%",
    margin: "auto",
    padding: "20px",
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  tagListButton: {
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
    width: "100%",
    textAlign: "left",
    paddingBottom: 8,
    color: "#586069",
    fontWeight: 600,
    "&:hover,&:focus": {
      color: "#0366d6",
    },
    "& span": {
      width: "100%",
    },
    "& svg": {
      width: 16,
      height: 16,
    },
  },
  tagListHeader: {
    borderBottom: "1px solid #e1e4e8",
    textAlign: "center",
    padding: "8px 10px",
    fontWeight: 600,
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  tagListPopper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: "0 3px 12px rgba(27,31,35,.15)",
    borderRadius: 3,
    width: "30%",

    zIndex: 1,
    fontSize: 13,
    color: "#586069",
    backgroundColor: "#f6f8fa",
  },
  text: {
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  textField: {
    paddingBottom: "20px",
    width: "80%",
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  typography: {
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  todoCreate: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 100,
  },
  topAppBarText: {
    flexGrow: 1,
    fontFamily: [
      "	Times New Roman,Hiragino Mincho ProN,Helvetica,Yu Mincho,Meiryo UI",
    ].join(","),
  },
  wrapper: {
    position: "relative",
    margin: "auto",
  },
}));

//Alert for snackBar
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const App = () => {
  const classes = useStyles();
  const today = new Date();
  //Navigation bar status
  const initialState = {
    navigations: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //Login status
  const [loggedInStatus, setLoggedInStatus] = useState("Please Login");

  //Login user
  const [user, setUser] = useState({});
  const [todos, setTodos] = useState([]);

  //Get todos data
  const indexTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todos", {
        withCredentials: true,
      });

      setTodos(response.data);
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(`Error! HTTP Status:${user} ${status} ${statusText}`);
    }
  };
  //Login
  const handleLogin = (data) => {
    setUser(data.user);
  };
  //Automatic login after registration
  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data);
  };
  //Check login status
  useEffect(() => {
    checkLoginStatus();
  });
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/logged_in", {
        withCredentials: true,
      });
      if (response.data.user) {
        setLoggedInStatus("Hello!! " + response.data.user.name);
      }
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
  };

  // Logout
  const handleLogout = () => {
    setLoggedInStatus("Please Login");
    setUser({});
  };
  // Change Date to ISO8601
  const DateToIso = (date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      "T" +
      ("0" + date.getHours()).slice(-2) +
      ":00:00"
    );
  };
  return (
    <AppContext.Provider
      value={{
        classes,
        state,
        dispatch,
        loggedInStatus,
        handleLogin,
        handleSuccessfulAuthentication,
        handleLogout,
        Alert,
        DateToIso,
        today,
        todos,
        setTodos,
        indexTodos,
      }}
    >
      <BrowserRouter>
        <TopAppBar />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/dashboard"} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};
export default App;
