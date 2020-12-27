import React, { useState } from "react";
import TodoList from "./TodoList";
import NewTodo from "./NewTodo";
import { Todo } from "./todo.model";
import { setConstantValue } from "typescript";
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };
  const todoDeletehandler = (todoID: string) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== todoID));
  };
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDelete={todoDeletehandler} />
    </div>
  );
};

export default App;
