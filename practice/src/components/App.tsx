import React, { useState } from "react";
const App: React.FC = () => {
  interface Todo {
    name: string;
    body: string;
  }
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTodos((prevTodos) => [...prevTodos, { name: value, body: "e" }]);
  };
  return (
    <div>
      <input onChange={addTodo} />
      <button type="submit">OK</button>
      {todos[0] ? todos[0].name : null}
    </div>
  );
};

export default App;
