import React, { useState, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import { Snackbar, Typography, Button, TextField } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import EmojiPeopleOutlinedIcon from "@material-ui/icons/EmojiPeopleOutlined";
import axios from "axios";

const Login = (props) => {
  const { handleSuccessfulAuthentication, Alert } = useContext(AppContext);
  //Manage login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  //Snackbar when login failed
  const [snackbar, setSnackbar] = useState(false);

  //Close snackbar
  const snackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  //Collate Login information
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      );
      if (response.data.logged_in) {
        handleSuccessfulAuthentication(response.data);
        props.moveTodashboard();
      } else {
        setLogin("Login failed.Please check again");
        setSnackbar(true);
      }
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
  };

  //Guest login func
  const guestLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          user: {
            email: "test@test.test",
            password: "password",
          },
        },
        { withCredentials: true }
      );
      if (response.data.logged_in) {
        handleSuccessfulAuthentication(response.data);
        props.moveTodashboard();
      } else {
        setLogin("Login failed.Please check again");
        setSnackbar(true);
      }
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
  };
  return (
    <Typography
      component={"span"}
      color="textSecondary"
      gutterBottom
      align="center"
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          style={{ width: 300 }}
          size="small"
          required
          variant="outlined"
          type="email"
          label="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <TextField
          size="small"
          required
          variant="outlined"
          type="password"
          label="password"
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          type="submit"
          style={{ margin: 2 }}
        >
          <AddOutlinedIcon />
          Login
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ margin: 2 }}
          onClick={guestLogin}
        >
          <EmojiPeopleOutlinedIcon />
          Try!!
        </Button>
      </form>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={snackBarClose}>
        <Alert onClose={snackBarClose} severity="error">
          {login}
        </Alert>
      </Snackbar>
    </Typography>
  );
};
export default Login;
