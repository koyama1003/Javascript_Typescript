import React, { FC, Dispatch } from "react";

type Action = { type: "ADD" } | { type: "REDUCE" } | { type: "RESET" };
interface props {
  state: { count: number };
  dispatch: Dispatch<Action>;
}

const Counter: FC<props> = ({ state, dispatch }) => {
  return (
    <>
      <div style={{ paddingTop: 40, textAlign: "center" }}>{state.count}</div>
      <div style={{ paddingTop: 40, textAlign: "center" }}>
        <button
          onClick={() => {
            dispatch({ type: "ADD" });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch({ type: "REDUCE" });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
          }}
        >
          RESET
        </button>
      </div>
    </>
  );
};

export default Counter;
