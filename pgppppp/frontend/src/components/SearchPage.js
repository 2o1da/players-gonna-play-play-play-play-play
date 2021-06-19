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
  const [activeItem, setActiveItem] = useState({ postTitle: "", postContent: "" });
  const [viewCompleted, setViewCompleted] = useState(false);

  function refreshList() {
    axios
      .get("http://127.0.0.1:8000/api/posts/")
      .then(res => setPostList(res.data))
      .catch(err => console.log(err));
  }

  useState(() => {
    refreshList();
  }, [postList]);

  function displayCompleted(status) {
    if (status) {
      return setViewCompleted(true);
    }
    return setViewCompleted(false);
  }

  function renderPostList() {
    return postList.map(post => (
      <CardGroup>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{post.postTitle}</Card.Title>
            <Card.Text>{post.postContent}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    ));
  }

  const [modal, setModal] = useState();
  function toggle() {
    setModal(!modal);
  }

  function handleSubmit(post) {
    toggle();
    if (post.id) {
      axios.put(`http://127.0.0.1:8000/api/posts/${post.id}`, post).then(res => refreshList());
      return;
    }

    axios.post("http://127.0.0.1:8000/api/posts/", post).then(res => refreshList());
  }

  function handleDelete(post) {
    axios.delete(`http://127.0.0.1:8000/api/posts/${post.id}/`).then(res => refreshList());
  }

  function createPost() {
    const post = { postTitle: "", postContent: "" };
    setActiveItem(post);
    setModal(!modal);
  }

  function editPost() {
    setActiveItem(post);
    setModal(!modal);
  }

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
        <Button onClick={createPost} className="btn btn-primary">
          Add task
        </Button>
        {renderPostList()}
        {modal ? <CreatePost activeItem={activeItem} toggle={toggle} onSave={handleSubmit} /> : null}
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
            <Button onClick={() => searchMusic()} variant="dark" style={{ zIndex: "-1" }}>
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
                  <Button onClick={() => setFlag(true)} variant="dark" style={{ position: "absolute", right: "0", margin: "10px" }}>
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
      {/* <Container>{CreatePost()}</Container> */}
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return renderSearch();
            }}
          />

          <Route path="/create" component={CreatePost} />
          <Route path="/info" component={Info} />
          <Route
            path="/post/:postCode"
            render={props => {
              return <Post {...props} />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default SearchPage;
