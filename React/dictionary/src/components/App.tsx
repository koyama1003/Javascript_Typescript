import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Tabbar from "./Tabbar";
import Title from "./Title";

const App: React.FC = () => {
  return (
    <>
      <Title />
      <Router>
        <Tabbar />
      </Router>
    </>
  );
};

export default App;
