import React, { useState, useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { Zoom, Grid, Typography } from "@material-ui/core";
import TodosTable from "./TodosTable";
import axios from "axios";
import moment from "moment";
const Todos = () => {
  const { classes, todos, indexTodos, today } = useContext(AppContext);

  const [zoom, setZoom] = useState(false);

  const yetTodos = todos.filter(
    (todos) => todos.status === "yet" || todos.status === "expired"
  );

  const rows = yetTodos.map((todo) => ({
    id: todo.id,
    Title: todo.title,
    Body: todo.body,
    Tags: todo.tags.map((tag) => {
      return { id: tag.id, name: tag.name, color: tag.color };
    }),
    Deadline: todo.deadline,
    Comment: todo.comment,
    Updated: todo.updated_at,
  }));
  useEffect(() => {
    const handleChange = () => {
      setZoom((prev) => !prev);
    };
    const todoExpired = async () => {
      const response = await axios.get("http://localhost:3001/todos", {
        withCredentials: true,
      });

      for (let i = 0; i < response.data.length; i++) {
        if (
          moment(response.data[i].deadline).diff(moment(today), true) < 0 &&
          response.data[i].status === "yet"
        ) {
          axios.put(
            `http://localhost:3001/todos/${response.data[i].id}`,
            {
              todo: {
                status: "expired",
              },
            },
            { withCredentials: true }
          );
        }
      }
      indexTodos();
    };
    todoExpired();
    handleChange();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Zoom in={zoom}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={10} style={{ textAlign: "center" }}>
            <Typography variant="h3" className={classes.typography}>
              All ToDos
            </Typography>
          </Grid>
        </Grid>
      </Zoom>

      <Grid
        container
        spacing={2}
        style={{ paddingBottom: 60 }}
        justify="center"
      >
        <Grid item xs={12}>
          <TodosTable rows={rows} />
        </Grid>
      </Grid>
    </>
  );
};
export default Todos;
