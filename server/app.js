if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const userController = require("./controllers/userController");
const { authentication } = require("./middlewares/authentication");
const { errorHandler } = require("./middlewares/errorHandler");
const boardController = require("./controllers/boardController");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.post("/register", userController.register);
app.post("/login", userController.login);
app.post("/board", boardController.addBoard)
app.get("/board", boardController.getBoard)

app.use(authentication);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
