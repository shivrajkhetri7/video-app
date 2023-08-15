import React, { useCallback, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
      setEmail("");
      setRoom("");
    },
    [email, room, socket]
  );

  const handleRoomJoin = (data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
  };

  useEffect(() => {
    socket.on("room:join", handleRoomJoin);
    return () => {
      socket.off("room:join", handleRoomJoin);
    };
  }, [socket, handleRoomJoin]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          value={email}
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
        ></TextField>
        <TextField
          value={room}
          label="Room"
          onChange={(event) => setRoom(event.target.value)}
        ></TextField>
        <Button type="submit" variant="contained">
          Join
        </Button>
      </form>
    </div>
  );
}

export default Lobby;
