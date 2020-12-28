import React from "react";
interface Squareprops {
  value: string;
  onClick: () => void;
}
const Square = (props: Squareprops) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
