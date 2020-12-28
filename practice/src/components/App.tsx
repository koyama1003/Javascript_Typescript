import React, { useState } from "react";
import Board from "./Board";
import "./App.css";

// class App extends React.Component {
function App() {
  /* constructor(props) {
		super(props);
		this.state = {
			history: [
				{squares: new Array(9)}
			],
			stepNumber: 0,
			xIsNext: true,
			finished: false
		};
		this.handleClick = this.handleClick.bind(this);
  } */
  const [history, setHistory] = useState([{ squares: new Array(9) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [finished, setFinished] = useState(false);
  // handleClick(i) {
  const handleClick = (i) => {
    // if (this.state.finished) { return; }
    if (finished) {
      return;
    }
    // if (this.state.stepNumber >= 9) {
    if (stepNumber >= 9) {
      // this.setState({finished: true});
      setFinished(true);
      return;
    }
    // const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const _history = history.slice(0, stepNumber + 1);
    const squares = [..._history[_history.length - 1].squares];
    console.log("history:", _history.length, stepNumber);
    if (squares[i]) {
      return;
    }
    const winner = calculateWinner(squares);
    if (winner) {
      // this.setState({finished: true});
      setFinished(true);
      return;
    }
    // squares[i] = this.state.xIsNext ? 'X' : 'O';
    squares[i] = xIsNext ? "X" : "O";
    /* this.setState({
			history: [...history, {squares}],
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
    }); */
    setHistory([..._history, { squares }]);
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  };
  // jumpTo(step) {
  const jumpTo = (step) => {
    /* this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
			finished: false
		}); */
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
  return (
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
  );
  // }
}
function calculateWinner(squares) {
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
