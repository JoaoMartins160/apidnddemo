const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const db = `mongodb://apidndfullstack:tfNqdeoeN8u.@mongodb:27017`;
const client = require("./src/cache/redisClient");

app.use(express.json());

app.use("/api", require("./src/dnd/controllers/dndmonstercontroller"));
app.use("/api", require("./src/dnd/controllers/dndequipcontroller"));
app.use("/api", require("./src/dnd/controllers/dndspellscontroller"));
app.use("/api", require("./src/dnd/controllers/dndracescontroller"));

mongoose
  .connect(db)
  .then(() => {
    app.listen(8080);
    console.log("Conexão com MongoDB estabelecida");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao MongoDB", err);
  });
