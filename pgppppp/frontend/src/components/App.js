import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { Container, ListGroup, InputGroup, FormControl, Button, CardGroup, Card, Badge } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";

import Carousel from "react-multi-carousel";

function App(props) {
  const [token, setToken] = useState("");

  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState([]);
  const [cover, setCover] = useState([]);
  const [date, setDate] = useState([]);
  const [input, setInput] = useState([]);
  const [lyrics, setLyrics] = useState("");

  const spotifyApi = new SpotifyWebApi();

  function getAccessToken() {
    fetch("/spotify/get-access-token")
      .then(res => res.json())
      .then(data => {
        setToken(data["token"]);
      });
  }

  getAccessToken();

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    console.log("토큰:", token);
  }, [token]);

  function searchMusic(e) {
    axios(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=20`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(res => {
      console.log("searchMusic 실행");

      const item = res.data.tracks.items;
      let tempArtist = [...artist];
      let tempTitle = [...title];
      let tempCover = [...cover];

      item.map((e, i) => {
        tempArtist.push(e.album.artists[0].name);
        setArtist(tempArtist);

        tempTitle.push(e.name);
        setTitle(tempTitle);

        setAlbum(e.album.name);

        tempCover.push(e.album.images[1].url);
        setCover(tempCover);

        setDate(e.album.release_date);
      });
    });
  }

  return (
    <div id="bg">
      <Container className="text-center p-5">
        <h1 style={{ fontWeight: "900" }}>Players gonna play play play play play</h1>
      </Container>
      <InputGroup style={{ width: "50vw", margin: "auto", marginTop: "30px" }}>
        <FormControl
          onChange={e => {
            setInput(e.target.value);
          }}
          onKeyDown={() => {
            setArtist([]);
            setTitle([]);
            setAlbum([]);
            setCover([]);
            setDate([]);
          }}
          onKeyUp={() => searchMusic()}
          type="text"
          placeholder="Artist, songs, or albums"
        />
        <InputGroup.Append>
          <Button onClick={() => searchMusic()} variant="dark">
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Container style={{ width: "50vw", margin: "auto" }}>
        {title.map((e, i) => {
          {
            return (
              <ListGroup.Item style={{ padding: "5px" }}>
                <img src={cover[i]} style={{ width: "55px", marginRight: "10px" }}></img>
                <span>{`${artist[i]} - ${e}`}</span>
                <Button to="/create" variant="dark" style={{ position: "absolute", right: "0", margin: "10px" }}>
                  Posting
                </Button>
              </ListGroup.Item>
            );
          }
        })}
      </Container>
    </div>
  );
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);
