const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controllers/controller");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
