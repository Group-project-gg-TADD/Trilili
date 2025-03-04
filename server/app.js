if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

function updateOnlineUsers(io) {
  const onlineUsers = [];
  for (const [socketId, socketObj] of io.of("/").sockets) {
    if (socketObj.handshake.auth?.username) {
      onlineUsers.push({
        socketId: socketId,
        username: socketObj.handshake.auth.username,
      });
    }
  }
  io.emit("users/online", onlineUsers);
}

// connection -> event bawaan socket.io
io.on("connection", (socket) => {
  console.log(socket.id, ">>>", socket.handshake.auth, "<<< auth user connect");
  updateOnlineUsers(io);

  // Kirim pesan ke orang yg join
  socket.emit("welcome_message", "Hi brader " + socket.id);

  socket.on("disconnect", () => {
    console.log(socket.id, "<<< new user disconnect");
    updateOnlineUsers(io);
  });
});

const userController = require("./controllers/userController");
const { authentication } = require("./middlewares/authentication");
const { errorHandler } = require("./middlewares/errorHandler");
const boardController = require("./controllers/boardController");
const cardController = require("./controllers/cardController");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.post("/register", userController.register);
app.post("/login", userController.login);

app.use(authentication);
app.post("/board", boardController.addBoard);
app.get("/board", boardController.getBoards);
app.get("/board/:id", boardController.getBoardById);
app.post("/board/member", boardController.addBoardMember);

app.get("/card/:listId", cardController.getCard);
app.post("/card/:listId", cardController.addCard);

app.use(errorHandler);

// disconnect -> event bawaan socket.io

httpServer.listen(3000, () => {
  console.log(`Server running at: http://localhost:${3000}`);
});
