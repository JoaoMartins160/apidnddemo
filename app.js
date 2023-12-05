const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const db = `mongodb://apidndfullstack:tfNqdeoeN8u.@mongodb:27017`;
const client = require("./src/cache/redisClient");

app.use(express.json());

app.use("/api", checkToken, require("./src/dnd/controllers/dndmonstercontroller"));
app.use("/api", checkToken, require("./src/dnd/controllers/dndequipcontroller"));
app.use("/api", checkToken, require("./src/dnd/controllers/dndspellscontroller"));
app.use("/api", checkToken, require("./src/dnd/controllers/dndracescontroller"));


function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ msg: 'Usuario não Logado!' })
  }

  try {

    const acesssecret = process.env.ACCESS_TOKEN_SECRET
    jwt.verify(token, acesssecret)
    next()

  } catch (error) {
    res.status(400).json({ msg: 'Token inválido!' })
  }
}

mongoose
  .connect(db)
  .then(() => {
    app.listen(8080);
    console.log("Conexão com MongoDB estabelecida");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao MongoDB", err);
  });
