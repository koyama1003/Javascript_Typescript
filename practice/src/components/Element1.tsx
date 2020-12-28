import React, { useState, FC, useContext } from "react";
import { AppContext } from "./App";
type titleProps = {
  name: string;
};
interface Todo {
  title: string;
  body: string;
}
const Element1: FC<titleProps> = ({ name }) => {
  const { todos, setTodos } = useContext(AppContext);

  const [todo, setTodo] = useState<Todo>({ title: "", body: "" });
  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos!([...todos!, todo]);
    setTodo({ title: "", body: "" });
  };
  return (
    <>
      <div>{name}</div>
      <form onSubmit={addNewTodo}>
        <input
          value={todo.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodo({ ...todo, title: e.target.value });
          }}
        />
        <input
          value={todo.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTodo({ ...todo, body: e.target.value });
          }}
        />
        <button type="submit">送信</button>
      </form>
    </>
  );
};

export default Element1;
