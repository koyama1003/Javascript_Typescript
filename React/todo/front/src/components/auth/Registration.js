import React, { useState, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import {
  Typography,
  Snackbar,
  Button,
  TextField,
  Switch,
  Grow,
  FormControlLabel,
  Box,
} from "@material-ui/core";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import axios from "axios";

const Registration = (props) => {
  const { handleSuccessfulAuthentication, Alert } = useContext(AppContext);
  //Manage registration form
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  //Signup status
  const [signup, setSignup] = useState("");
  //Snackbar when login failed
  const [snackbar, setSnackbar] = useState(false);
  //Grow Animation
  const [grow, setGrow] = useState(false);

  //Close snackbar
  const snackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };
  //Submit information of the registration form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/signup",
        {
          user: {
            email: email,
            name: name,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      );
      if (response.data.status === "created") {
        handleSuccessfulAuthentication(response.data);
        props.moveTodashboard();
      } else {
        setSignup("Signup failed.Please check again");
        setSnackbar(true);
      }
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(`Error! HTTP Status: ${status} ${statusText}`);
    }
  };

  // Change status Grow
  const handleChange = (value) => {
    setGrow((prev) => !prev);
  };
  return (
    <>
      <Box textAlign="center">
        <FormControlLabel
          control={
            <Switch
              style={{ justifyContent: "center" }}
              checked={grow}
              onChange={handleChange}
            />
          }
          label="SignUp/Try"
        />
      </Box>
      <Typography
        component={"span"}
        color="textSecondary"
        gutterBottom
        align="center"
      >
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grow in={grow}>
            <TextField
              style={{ width: 300 }}
              size="small"
              variant="outlined"
              type="email"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grow>
          <br />
          <Grow
            in={grow}
            style={{ transformOrigin: "0 0 0" }}
            {...(grow ? { timeout: 1100 } : {})}
          >
            <TextField
              size="small"
              variant="outlined"
              type="name"
              label="User Name"
              margin="normal"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grow>
          <br />
          <Grow
            in={grow}
            style={{ transformOrigin: "0 0 0" }}
            {...(grow ? { timeout: 1000 } : {})}
          >
            <TextField
              size="small"
              variant="outlined"
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grow>
          <br />

          <Grow
            in={grow}
            style={{ transformOrigin: "90 0 0" }}
            {...(grow ? { timeout: 1600 } : {})}
          >
            <TextField
              size="small"
              variant="outlined"
              type="password"
              label="Password Confirmation"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
          </Grow>
          <br />
          <Grow
            in={grow}
            style={{ transformOrigin: "0 0 90" }}
            {...(grow ? { timeout: 2000 } : {})}
          >
            <Box>
              <Button
                size="small"
                variant="outlined"
                style={{ margin: "5px" }}
                color="secondary"
                type="submit"
              >
                <LockOpenIcon />
                SIGNUP
              </Button>
            </Box>
          </Grow>
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={snackBarClose}
          >
            <Alert onClose={snackBarClose} severity="error">
              {signup}
            </Alert>
          </Snackbar>
        </form>
      </Typography>
    </>
  );
};
export default Registration;
