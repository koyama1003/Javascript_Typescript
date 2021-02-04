import "../css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./TodoList";
import store from "./TodoStore";

const app = document.getElementById("app");

ReactDOM.render(<TodoList store={store} />, app);
