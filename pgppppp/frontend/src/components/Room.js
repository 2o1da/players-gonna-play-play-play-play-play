import React, { Component, useState } from "react";

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  // this.roomCode = this.props.match.params.roomCode;
  const roomCode = props.match.params.roomcode;

  function getRoomDatail() {
    fetch("/api/get-room?code=" + roomCode)
      .then(res => res.json())
      .then(data => {
        console.log("성공!");
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }

  getRoomDatail();

  return (
    <div>
      <h3>Room Code: {roomCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause.toString()}</p>
      <p>Host: {isHost.toString()}</p>
    </div>
  );
}

export default Room;
