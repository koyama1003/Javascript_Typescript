import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { useHistory } from "react-router-dom";
import axios from "axios";

const TopAppBar = () => {
  const history = useHistory();
  const { loggedInStatus, handleLogout, classes } = useContext(AppContext);
  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        handleLogout();
        history.push("/");
      })
      .catch((error) => console.log("ログアウトエラー", error));
  };

  return (
    <AppBar position="static" color="transparent" style={{ marginBottom: 20 }}>
      <Toolbar>
        <Typography variant="h4" className={classes.topAppBarText}>
          Vremya
        </Typography>
        <Typography variant="subtitle1" className={classes.topAppBarText}>
          {loggedInStatus === "Please Login" ? (
            <LockIcon />
          ) : (
            <LockOpenOutlinedIcon />
          )}
          {loggedInStatus}
        </Typography>
        {loggedInStatus === "Please Login" ? (
          <Button disabled>Please Login</Button>
        ) : (
          <Button
            startIcon={<ExitToAppIcon />}
            onClick={handleLogoutClick}
            className={classes.menuButton}
            variant="outlined"
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default TopAppBar;
