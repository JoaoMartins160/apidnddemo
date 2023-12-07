const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const db = `mongodb://apidndfullstack:tfNqdeoeN8u.@mongodb:27017`;
const cookieParser = require("cookie-parser");
const http = require('http');
const WebSocket = require('./src/socket/websocket');
const server = http.createServer(app);
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const client = require("./src/cache/redisClient");
const morganSteam = require("./src/log/morganSteam");
const { checkToken} = require("./src/auth/token");

app.use(morganSteam);
WebSocket(server);


app.use(express.json());
app.use(cookieParser());

app.use("/api", checkToken, require("./src/dnd/controllers/dndmonstercontroller"));
app.use("/api", checkToken, require("./src/dnd/controllers/dndequipcontroller"));
app.use("/api", checkToken, require("./src/dnd/controllers/dndspellscontroller"));
app.use("/api", checkToken, require("./src/dnd/controllers/dndracescontroller"));
app.use("/", require("./src/user/controllers/usercontroller"));

//Data sanitization
app.use(mongoSanitize());
app.use(xss())


mongoose
  .connect(db)
  .then(() => {
    server.listen(8080);
    console.log("Conexão com MongoDB estabelecida");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao MongoDB", err);
  });

