import React, { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../contexts/AppContext";
import clsx from "clsx";
import moment from "moment";
import axios from "axios";
import {
  Grow,
  Typography,
  TextField,
  Grid,
  Fab,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import AddIcon from "@material-ui/icons/Add";

import TagList from "./TagList";

const EditTodo = (props) => {
  const { classes, Alert, DateToIso, today, indexTodos } = useContext(
    AppContext
  );
  //Declare initial todo data
  const initialTodo = {
    title: "",
    body: "",
    startdate: DateToIso(today),
    deadline: DateToIso(today),
    tag_id: props.tagId,
  };
  //Todo data
  const [todo, setTodo] = useState(initialTodo);
  //Tag data
  const [tags, setTags] = useState([]);
  //Grow animation
  const [grow, setGrow] = useState(false);
  //loading status when used submit
  const [loading, setLoading] = useState(false);
  //Success status when submit complete
  const [success, setSuccess] = useState(false);
  //Error when title is empty
  const [errortitle, setErrortitle] = useState(false);
  //Error when body is empty
  const [errorbody, setErrorbody] = useState(false);
  //Snackbar when submitted
  const [snackbar, setSnackbar] = useState(false);

  //Click submit button
  const submitButtonClick = (event) => {
    if (todo.title && todo.body) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          setTodo(initialTodo);
        }, 1000);
        timer.current = window.setTimeout(() => {
          setSuccess(false);
          props.modalCLose();
        }, 2000);

        axios
          .put(
            `http://localhost:3001/todos/${props.id}`,
            {
              todo: {
                title: todo.title,
                body: todo.body,
                startdate: todo.startdate + "+09:00",
                deadline: todo.deadline + "+09:00",
                tag_ids: todo.tag_id,
              },
            },
            { withCredentials: true }
          )

          .catch((error) => {
            console.log("registration error", error);
          });
        event.preventDefault();
        //Reload todo data
        indexTodos();
      }
    } else {
      //When title or body is empty
      setLoading(true);
      setSnackbar(true);
      todo.title === "" ? setErrortitle(true) : setErrorbody(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };
  //Change grow status
  const growChange = () => {
    setGrow((prev) => !prev);
  };
  //Close snack bar
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };
  //Fab button class name
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  //Timer which changes success and loading status
  const timer = useRef();
  useEffect(growChange, []);
  //Initialize timer
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  //Call Edit aciton When this componet is displayed
  useEffect(() => {
    axios
      .get(`http://localhost:3001/todos/${props.id}/edit`, {
        withCredentials: true,
      })
      .then((response) => {
        setTodo({
          title: response.data.title,
          body: response.data.body,
          startdate: moment(response.data.startdate).format("YYYY-MM-DDTkk:mm"),
          deadline: moment(response.data.deadline).format("YYYY-MM-DDTkk:mm"),
        });
      })
      .catch((error) => {
        console.log("エラー", error);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <Grid container justify="center" style={{ marginBottom: 100 }}>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={snackbarClose}>
        <Alert onClose={snackbarClose} severity="warning">
          Failed.Title and Body are required.
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={snackbarClose}>
        <Alert onClose={snackbarClose} severity="success">
          Editted!!
        </Alert>
      </Snackbar>
      <Grid item xs={10} style={{ textAlign: "center" }}>
        <Grow
          in={grow}
          style={{ transformOrigin: "100 100 100" }}
          {...(grow ? { timeout: 800 } : {})}
        >
          <Typography
            className={classes.typography}
            style={{ marginBottom: "10px" }}
            align="center"
            variant="h3"
          >
            <div>Edit your plan</div>
          </Typography>
        </Grow>

        <form>
          <Grow in={grow}>
            <TextField
              required
              error={errortitle}
              value={todo.title}
              id="title"
              variant="outlined"
              label="Title"
              type="text"
              placeholder="Title"
              className={classes.textField}
              multiline
              onChange={(event) =>
                setTodo({ ...todo, title: event.target.value })
              }
            />
          </Grow>
          <Grow
            in={grow}
            style={{ transformOrigin: "210 20 30" }}
            {...(grow ? { timeout: 1100 } : {})}
          >
            <TextField
              required
              error={errorbody}
              value={todo.body}
              id="body"
              label="Body"
              variant="outlined"
              type="text"
              placeholder="Write description"
              className={classes.textField}
              multiline
              onChange={(event) =>
                setTodo({ ...todo, body: event.target.value })
              }
            />
          </Grow>
          <br />
          <br />
          <Grow
            in={grow}
            style={{ transformOrigin: "0 0 100" }}
            {...(grow ? { timeout: 1100 } : {})}
          >
            <TextField
              value={todo.startdate}
              id="startdate"
              size="small"
              label="Starting Date"
              type="datetime-local"
              className={classes.datepicker}
              onChange={(event) =>
                setTodo({ ...todo, startdate: event.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grow>
          <Grow in={grow}>
            <TextField
              value={todo.deadline}
              id="deadline"
              size="small"
              label="Deadline"
              type="datetime-local"
              className={classes.datepicker}
              onChange={(event) =>
                setTodo({ ...todo, deadline: event.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grow>
        </form>
        <TagList
          todo={todo}
          setTodo={setTodo}
          initialTodo={initialTodo}
          success={success}
          tags={tags}
          setTags={setTags}
        />
      </Grid>
      <Grid item xs={10} style={{ textAlign: "center" }}>
        <Grow
          in={grow}
          style={{ transformOrigin: "70 0 20" }}
          {...(grow ? { timeout: 800 } : {})}
        >
          <div className={classes.todoCreate}>
            <div className={classes.wrapper}>
              <Fab
                color="secondary"
                className={buttonClassname}
                disabled={loading}
                onClick={submitButtonClick}
              >
                {success ? <CheckIcon /> : <AddIcon />}
              </Fab>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>
        </Grow>
      </Grid>
    </Grid>
  );
};
export default EditTodo;
