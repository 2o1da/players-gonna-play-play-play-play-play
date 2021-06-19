import React, { useState, useEffect } from "react";
import { ButtonGroup, Container, ListGroup, InputGroup, FormControl, Button, CardGroup, Card, Badge, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import Post from "./Post";
import Info from "./Info";
import CreatePost from "./CreatePost";
import { render } from "react-dom";

function SearchPage(props) {
  const [token, setToken] = useState("");
  const [flag, setFlag] = useState(false);

  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState([]);
  const [album, setAlbum] = useState([]);
  const [cover, setCover] = useState([]);
  const [date, setDate] = useState([]);
  const [input, setInput] = useState([]);
  const [lyrics, setLyrics] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postList, setPostList] = useState([]);
  const [activeItem, setActiveItem] = useState({ track_cover: "", track_artist: "", track_title: "", title: "", content: "" });

  function refreshList() {
    axios
      .get("http://127.0.0.1:8000/api/posts/")
      .then(res => {
        setPostList(res.data);
        console.log("잘받아옴");
      })
      .catch(err => console.log(err));
  }

  useState(() => {
    refreshList();
  }, [postList]);

  const [modal, setModal] = useState();

  function toggle() {
    setModal(!modal);
  }

  function handleSubmit(post) {
    toggle();
    if (post.id) {
      axios.put(`http://localhost:8000/api/posts/${post.id}/`, post).then(res => refreshList());
      return;
    }

    axios
      .post("http://localhost:8000/api/posts/", post)
      .then(res => refreshList())
      .catch(err => {
        console.log("에러:", err);
      });
  }

  function handleDelete(post) {
    axios.delete(`http://localhost:8000/api/posts/${post.id}/`).then(res => refreshList());
  }

  function createPost(c, a, t) {
    const post = { track_cover: c, track_artist: a, track_title: t, title: "", content: "" };
    setActiveItem(post);
    setModal(!modal);
  }

  function editPost(post) {
    setActiveItem(post);
    setModal(!modal);
  }

  function renderPostList() {
    return postList.map(post => (
      <Container>
        <CardGroup>
          <Card>
            <Card.Img variant="top" src={post.track_cover} style={{ width: "300px", padding: "10px", margin: "auto" }} />
            <Card.Body className="text-center">
              <Card.Title>{post.track_title}</Card.Title>
              <Card.Text>{post.track_artist}</Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              <div style={{ position: "absolute", right: "10px", bottom: "-3px" }}>
                <Button onClick={() => editPost(post)} variant="success" style={{ margin: "10px" }}>
                  수정
                </Button>
                <Button onClick={() => handleDelete(post)} variant="danger" style={{ margin: "10px" }}>
                  삭제
                </Button>
              </div>
            </Card.Body>
            <Card.Footer style={{ padding: "15px" }}>
              <small className="text-muted">{post.created_at}</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </Container>
    ));
  }

  const spotifyApi = new SpotifyWebApi();

  function getAccessToken() {
    axios.get("http://127.0.0.1:8000/spotify/get-access-token").then(res => setToken(res.data.token));
    // fetch("/spotify/get-access-token")
    //   .then(res => res.json())
    //   .then(data => {
    //     setToken(data["token"]);
    //   });
  }

  getAccessToken();

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    console.log("토큰:", token);
  }, [token]);

  function searchMusic() {
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

  function renderSearch() {
    return (
      <div>
        {renderPostList()}
        {modal ? <CreatePost activeItem={activeItem} toggle={toggle} onSave={handleSubmit} /> : null}

        <Container>
          <InputGroup style={{ width: "70vw", margin: "auto", marginTop: "30px" }}>
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
              <Button onClick={() => searchMusic()} variant="dark" style={{ zIndex: "-1" }}>
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Container>

        <Container style={{ width: "70vw", margin: "auto" }}>
          {title.map((e, i) => {
            {
              return (
                <ListGroup.Item style={{ padding: "5px" }}>
                  <img src={cover[i]} style={{ width: "55px", marginRight: "10px" }}></img>
                  <span>{`${artist[i]} - ${e}`}</span>
                  <Button onClick={() => createPost(cover[i], artist[i], title[i])} variant="dark" style={{ position: "absolute", right: "0", margin: "10px" }}>
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

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return renderSearch();
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default SearchPage;
