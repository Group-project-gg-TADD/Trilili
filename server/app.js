if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Board, User, BoardMember } = require("./models");

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
io.on("connection", async (socket) => {
  // console.log(socket.id, ">>>", socket.handshake.auth, "<<< auth user connect");
  updateOnlineUsers(io);

  let user;
  if (socket.handshake.auth.token) {
    payload = verifyToken(socket.handshake.auth.token);
    user = await User.findByPk(payload.id);
  }

  console.log(user, `USER SOCKET`);

  // Kirim pesan ke orang yg join
  socket.emit("welcome_message", "Hi brader " + socket.id);

  socket.on("board/new_message", ({ boardId, newMessage }) => {
    io.to("board/" + boardId).emit("board/update_message", {
      message: newMessage,
      sender: user?.name,
    });
  });

  //2. teruma event join socket comment
  socket.on("board/join", (arg) => {
    //3. joinkan user sekarang ke room board/1
    socket.join("board/" + arg.boardId);

    //4. kasih info ke smua member room, bahwa ada yg join
    io.to("board/" + arg.boardId).emit(
      "chat/new_message",
      "welcome to room " + "board/" + arg.boardId
    );
  });

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
const listController = require("./controllers/listController");
const { verifyToken } = require("./helpers/jwt");

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
app.get("/board/member", boardController.getBoardMember);
app.get("/boardMembers", async (req, res, next) => {
  try {
    const data = await BoardMember.findAll({
      where: { userId: req.user.id },
      include: {
        model: Board,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.post("/board/member", boardController.addBoardMember);
app.get ("/user", boardController.getUser);

app.get("/users/board", boardController.getBoardByIdMembers);

app.get("/list/:boardId", listController.getList);
app.post("/list/:boardId", listController.addList);
app.delete("/list/delete/:id", listController.deleteList)

app.patch("/card/:id", cardController.updateCard);

app.get("/card/:listId", cardController.getCard);
app.post("/card/:listId", cardController.addCard);

app.use(errorHandler);

// disconnect -> event bawaan socket.io

httpServer.listen(3000, () => {
  console.log(`Server running at: http://localhost:${3000}`);
});
