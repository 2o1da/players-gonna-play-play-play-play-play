import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Container } from "react-bootstrap";
import SearchPage from "./components/SearchPage";
import "./App.css";

function App() {
  return (
    <div>
      <Container className="text-center p-5">
        <h1 style={{ fontWeight: "900", marginBottom: "50px" }}>Players gonna play play play play play</h1>
      </Container>
      <SearchPage />
    </div>
  );
}

export default App;
