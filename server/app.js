if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controllers/controller");
const { authentication } = require("./middlewares/authentication");
const { errorHandler } = require("./middlewares/errorHandler");
const cardController = require("./controllers/cardController");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.post("/register", Controller.register);
app.post("/login", Controller.login);
app.post("/board", Controller.addBoard)
app.get("/board", Controller.getBoard)

app.use(authentication);

<<<<<<< HEAD
app.get("/card/:listId", cardController.getCard);
app.post("/card/:listId", cardController.addCard);

=======
>>>>>>> b80bf7d573a63ba63fbc29a2ca3c74cc00e4e1e8
app.use(errorHandler);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
