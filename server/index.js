const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const io = new Server(server, { cors: true });

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", (socket) => {
  /**
   *  Events
   */
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketId.set(email, socket.id);
    socketIdToEmail.set(socket.id, email);
    io.to(socket.id).emit("room:join", data);
  });
});

server.listen(PORT, () => {
  console.log(`server running on http://localhost:8000`);
});
