import React, { useState } from "react";
import Board from "./Board";
import "./App.css";

function App() {
  const [history, setHistory] = useState([{ squares: new Array(9) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [finished, setFinished] = useState(false);

  const handleClick = (i: number) => {
    if (finished) {
      return;
    }

    if (stepNumber >= 9) {
      setFinished(true);
      return;
    }

    const _history = history.slice(0, stepNumber + 1);
    const squares = [..._history[_history.length - 1].squares];
    console.log("history:", _history.length, stepNumber);
    if (squares[i]) {
      return;
    }
    const winner = calculateWinner(squares);
    if (winner) {
      setFinished(true);
      return;
    }
    // squares[i] = this.state.xIsNext ? 'X' : 'O';
    squares[i] = xIsNext ? "X" : "O";

    setHistory([..._history, { squares }]);
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  };
  // jumpTo(step) {
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setFinished(false);
  };
  // render() {
  // const history = [...this.state.history];
  const _history = [...history];
  // const squares = [...history[this.state.stepNumber].squares];
  const squares = [..._history[stepNumber].squares];
  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : // 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      "Next player: " + (xIsNext ? "X" : "O");
  const moves = _history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        {/* <button onClick={() => this.jumpTo(move)}>{desc}</button> */}
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  type MyButtonProps = {} & JSX.IntrinsicElements["button"];
  const MyButton: React.FC<MyButtonProps> = ({ children, type, style }) => (
    <button type={type} style={style}>
      {children}
    </button>
  );

  return (
    <>
      <div className="game">
        <Board
          squares={squares}
          finished={finished}
          onClick={(i) => handleClick(i)}
        />
        {/* finished={this.state.finished}
					onClick={(i) => this.handleClick(i)} */}
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
      <MyButton
        children="this will be display"
        type="submit"
        style={{ paddingTop: 20 }}
      />
    </>
  );
  // }
}
function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const length = lines.length;
  for (let i = 0; i < length; i++) {
    const [a, b, c] = lines[i];
    const player = squares[a];
    if (player && player === squares[b] && player === squares[c]) {
      return player;
    }
  }
  return null;
}

export default App;
