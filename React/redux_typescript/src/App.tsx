import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import useSWR, { mutate } from "swr";
import axios from "axios";

function App() {
  const fetcher = async (url: string) => {
    const res = await axios.get(url);
    return res;
  };
  const { data, error } = useSWR(
    "https://api.github.com/users/koyama1003",
    fetcher,
    { dedupingInterval: 5000 }
  );
  console.log(data);
  console.log(error);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          onClick={async () => {
            mutate("https://api.github.com/users/koyama1003", data, false);
            await fetcher("https://api.github.com/users/koyama1003");
          }}
        >
          focus
        </button>
      </header>
    </div>
  );
}

export default App;
