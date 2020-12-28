import React, {
  useState,
  useReducer,
  FC,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import Element1 from "./Element1";
import Counter from "./Counter";
type Todos = { title: string; body: string }[];

type ContextProps = {
  todos: Todos;
  setTodos: Dispatch<SetStateAction<{ title: string; body: string }[]>>;
};

export const AppContext = createContext<Partial<ContextProps>>({});

type Action = { type: "ADD" } | { type: "REDUCE" } | { type: "RESET" };
type State = {
  count: number;
};

const App: FC = () => {
  const [todos, setTodos] = useState<Todos>([]);

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          count: state.count + 1,
        };
      case "REDUCE":
        return {
          ...state,
          count: state.count - 1,
        };
      case "RESET":
        return {
          ...state,
          count: 0,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { count: 0 });
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
      <Counter state={state} dispatch={dispatch} />
    </AppContext.Provider>
  );
};

export default App;
