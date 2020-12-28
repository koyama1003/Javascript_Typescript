import React, { useState, FC } from "react";
import Element1 from "./Element1";
type Todos = { title: string; body: string }[];

const App: FC = () => {
  const [todos, setTodos] = useState<Todos>([]);
  const name: string = "New Todo";
  console.log(todos);
  return (
    <div className="App">
      <Element1 name={name} todos={todos} setTodos={setTodos} />
      {todos.length > 0
        ? todos.map((todo, index) => (
            <div key={index}>
              {todo.title}:{todo.body}
            </div>
          ))
        : null}
    </div>
  );
};

export default App;
