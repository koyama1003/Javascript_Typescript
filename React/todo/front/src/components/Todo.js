import React, { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../contexts/AppContext";
import clsx from "clsx";
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

const Todo = () => {
  const { Alert, classes, DateToIso, indexTodos, today } = useContext(
    AppContext
  );

  const initialTodo = {
    title: "",
    body: "",
    startdate: DateToIso(today),
    deadline: DateToIso(today),
    tag_id: "",
  };

  const [todo, setTodo] = useState(initialTodo);
  const [tags, setTags] = useState([]);
  const [grow, setGrow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errortitle, setErrortitle] = useState(false);
  const [errorbody, setErrorbody] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
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
        }, 2000);
        let i = 0;
        while (todo.tag_id[i]) {
          axios.put(`http://localhost:3001/tags/${todo.tag_id[i]}`, {
            tag: {
              count: tags[todo.tag_id[i] - 1].count + 1,
            },
          });

          i++;
        }

        axios
          .post(
            "http://localhost:3001/todos",
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
        indexTodos();
      }
    } else {
      setLoading(true);
      setSnackbar(true);
      todo.title === "" ? setErrortitle(true) : setErrorbody(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };
  const growChange = () => {
    setGrow((prev) => !prev);
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const timer = useRef();
  useEffect(growChange, []);
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
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
          Submitted!!
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
            <div>Let's start a new plan</div>
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
      </Grid>
      <Grid item xs={10}>
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
export default Todo;
