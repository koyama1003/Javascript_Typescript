import React, { useState, FC, Dispatch, SetStateAction } from "react";
type titleProps = {
  name: string;
  setTodos: Dispatch<SetStateAction<{ title: string; body: string }[]>>;
  todos: Todo[];
};
interface Todo {
  title: string;
  body: string;
}
const Element1: FC<titleProps> = ({ name, todos, setTodos }) => {
  const [todo, setTodo] = useState<Todo>({ title: "", body: "" });
  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos([...todos, todo]);
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
