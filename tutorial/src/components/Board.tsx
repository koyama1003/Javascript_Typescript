import { FC } from "react";
import Square from "./Square";

type Props = {
  squares: Array<string>;
  finished: boolean;
  onClick: (i: number) => void;
};

const Board: FC<Props> = (props) => {
  const renderSquare = (i: number) =>
    props.finished ? (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    ) : (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  const renderRow = (start: number, end: number) => {
    const rowSquares = [];
    for (let i = start; i <= end; i++) {
      rowSquares.push(renderSquare(i));
    }
    return rowSquares;
  };
  return (
    <div>
      <div className="board-row">{renderRow(0, 2)}</div>
      <div className="board-row">{renderRow(3, 5)}</div>
      <div className="board-row">{renderRow(6, 8)}</div>
    </div>
  );
};

export default Board;
