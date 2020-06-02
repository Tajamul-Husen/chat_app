const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const { filterUser, getReceiverInfo, existingUser } = require("./utils");
let usersList = [];

const router = require("./router");

const app = express();
const server = http.createServer(app); // passing the epress server
const io = socketio(server); // passing the server in socket

app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    if (existingUser(name, usersList)) {
      socket.emit("user-exists", name);
    } else {
      const data = {
        id: socket.id,
        userName: name,
        unread: 0,
        lastMessage: "",
        online: true,
      };
      usersList.push(data);
      socket.emit("user-connected", data);
    }
  });

  socket.on("get-users", (id) => {
    const filteredUser = filterUser(usersList, id);
    socket.emit("users-list", filteredUser);
  });

  socket.on("send-message", (message) => {
    const receiverObj = getReceiverInfo(usersList, message.from);
    io.to(message.to).emit("chat-message", { message, receiverObj });
  });

  socket.on("user-typing", (data) => {
    io.to(data.id).emit("user-messaging", data);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-offline", socket.id);
    usersList = filterUser(usersList, socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`ConnectCord server running on ${PORT}`);
});
