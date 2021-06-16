import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function RoomJoinPage(props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  function handleTextFieldChange(e) {
    setRoomCode(e.target.value);
  }

  function roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then(response => {
        if (response.ok) {
          props.history.push(`/room/${roomCode}`);
        } else {
          setError("ROOM NOT FOUND :(");
        }
      })
      .catch(error => {
        console.log("에러:", error);
      });
  }

  return (
    <div>
      <h1>Room Join Page</h1>
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField error={error} label="CODE" placeholder="Enter a Room Code" value={roomCode} helperText={error} variant="outlined" onChange={handleTextFieldChange} />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={roomButtonPressed}>
            Enter Room
          </Button>
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}