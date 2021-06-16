import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

function App(props) {
  return (
    <div className="center">
      <h1>HELP!</h1>
      <p>props.name : {props.name}</p>
      <HomePage />
    </div>
  );
}

export default App;

const appDiv = document.getElementById("app");
render(<App name="PMJ" />, appDiv);
