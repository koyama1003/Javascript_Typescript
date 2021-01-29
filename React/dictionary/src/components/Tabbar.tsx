import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { login, logout, selectUser } from "../features/userSlice";
import { auth, provider } from "../firebase";
import Home from "./Home";
import Search from "./Search";
import {
  Avatar,
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Snackbar,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CameraIcon from "@material-ui/icons/Camera";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { SnackbarCloseReason } from "@material-ui/core/Snackbar/Snackbar";

const useStyles = makeStyles(() =>
  createStyles({
    tabs: { flexGrow: 1 },

    tab: {
      "&:hover": {
        opacity: "0.4",
      },
    },
    button: {
      marginRight: "10px",
      "&:hover": {
        opacity: "0.5",
      },
    },
  })
);
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Tabbar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signIn = async () => {
    await auth
      .signInWithPopup(provider)
      .catch((err: Error) => alert(err.message));
    setSnackbar(true);
  };
  const signOut = async () => {
    await auth.signOut();
    setSnackbar(true);
  };
  const [snackbar, setSnackbar] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  const [value, setValue] = useState("/");
  const handleChange = (e: React.ChangeEvent<{}>, newValue: string): void => {
    e.preventDefault();
    setValue(newValue);
    history.push(`${newValue}`);
  };

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/mypage" component={Search} />
      <AppBar color="transparent" position="fixed">
        <Toolbar>
          <Tabs
            variant="fullWidth"
            className={classes.tabs}
            indicatorColor="secondary"
            textColor="secondary"
            value={value}
            onChange={handleChange}
          >
            <Tab
              label="home"
              className={classes.tab}
              icon={<HomeIcon />}
              value="/"
            />
            <Tab
              label="search"
              className={classes.tab}
              icon={<SearchIcon />}
              value="/search"
            />
            <Tab
              label="mypage"
              className={classes.tab}
              icon={<MenuBookIcon />}
              value="/mypage"
            />
          </Tabs>
          {user.uid ? (
            <Button
              className={classes.button}
              startIcon={<ExitToAppIcon />}
              onClick={signOut}
              color="secondary"
            >
              Signout
            </Button>
          ) : (
            <Button
              className={classes.button}
              startIcon={<CameraIcon />}
              onClick={signIn}
              color="primary"
            >
              Signin
            </Button>
          )}
          <Avatar alt="avatar" src={user.photoUrl} />
        </Toolbar>
      </AppBar>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {user.uid ? `Welcome Back!!${user.displayName}` : `See You Again!!`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Tabbar;
