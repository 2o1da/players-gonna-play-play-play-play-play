import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Container } from "react-bootstrap";

import SearchPage from "./SearchPage";

function App(props) {
  return (
    <div id="bg">
      <Container className="text-center p-5">
        <h1 style={{ fontWeight: "900" }}>Players gonna play play play play play</h1>
      </Container>
      <SearchPage />
    </div>
  );
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);
