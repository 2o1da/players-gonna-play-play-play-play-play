import React, { useState } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { Container, Button } from "react-bootstrap";

function App(props) {
  const [song, setSong] = useState({});

  function getCurrentSong() {
    fetch("/spotify/current-song")
      .then(response => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then(data => {
        setSong(data);
        console.log(data);
      });
  }

  return (
    <div className="center">
      <Container className="text-center">
        <img src={props.image_url} height="100%" width="100%" />
        <h1>HELP!!!</h1>
        <Button className="primary">버튼</Button> <p>props.name : {props.name}</p>
      </Container>
      <HomePage />
    </div>
  );
}

export default App;

const appDiv = document.getElementById("app");
render(<App name="PMJ" />, appDiv);
