import { FC } from "react";
interface Squareprops {
  key: number;
  value: string;

  onClick: () => void;
}
const Square: FC<Squareprops> = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
