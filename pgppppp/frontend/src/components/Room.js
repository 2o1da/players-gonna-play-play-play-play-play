import React, { Component, useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  // this.roomCode = this.props.match.params.roomCode;
  const roomCode = props.match.params.roomcode;

  const [showSettings, setShowSettings] = useState(false);

  function getRoomDetail() {
    fetch("/api/get-room?code=" + roomCode)
      .then(res => {
        if (!res.ok) {
          props.leaveRoomCallback();
          props.history.push("/");
        }
        res.json();
      })
      .then(data => {
        console.log("성공!");
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }

  getRoomDetail();

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then(response => {
      props.leaveRoomCallback();
      props.history.push("/");
    });
  }

  function updateShowSettings(value) {
    setShowSettings(value);
  }

  function renderSettingButton() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateShowSettings(true);
            }}
          >
            설정
          </Button>
        </Grid>
      </Grid>
    );
  }

  function renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanPause={guestCanPause} roomCode={roomCode} updateCallback={getRoomDetail} />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
            닫기
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (showSettings) return renderSettings();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost.toString()}
        </Typography>
      </Grid>
      {isHost ? renderSettingButton() : null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
