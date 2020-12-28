import React, {
  useState,
  FC,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import Element1 from "./Element1";
type Todos = { title: string; body: string }[];

type ContextProps = {
  todos: Todos;
  setTodos: Dispatch<SetStateAction<{ title: string; body: string }[]>>;
};

export const AppContext = createContext<Partial<ContextProps>>({});
const App: FC = () => {
  const [todos, setTodos] = useState<Todos>([]);
  const name: string = "New Todo";
  console.log(todos);
  return (
    <AppContext.Provider value={{ todos, setTodos }}>
      <div className="App">
        <Element1 name={name} />
        {todos.length > 0
          ? todos.map((todo, index) => (
              <div key={index}>
                {todo.title}:{todo.body}
              </div>
            ))
          : null}
      </div>
    </AppContext.Provider>
  );
};

export default App;
