const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const db = `mongodb://apidndfullstack:tfNqdeoeN8u.@mongodb:27017`;
const cookieParser = require("cookie-parser");
const https = require("https");
const WebSocket = require("./src/socket/websocket");
const server = https.createServer(app);
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const client = require("./src/cache/redisClient");
const morganSteam = require("./src/log/morganSteam");
const { checkToken } = require("./src/auth/token");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(morganSteam);
WebSocket(server);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  "/api",
  checkToken,
  require("./src/dnd/controllers/dndmonstercontroller")
);
app.use(
  "/api",
  checkToken,
  require("./src/dnd/controllers/dndequipcontroller")
);
app.use(
  "/api",
  checkToken,
  require("./src/dnd/controllers/dndspellscontroller")
);
app.use(
  "/api",
  checkToken,
  require("./src/dnd/controllers/dndracescontroller")
);
app.use("/", require("./src/user/controllers/usercontroller"));

//Data sanitization
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const credentials = {
  key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
};

const httpsServer = https.createServer(credentials, app);

mongoose
  .connect(db)
  .then(() => {
    httpsServer.listen(8080);
    console.log("Conexão com MongoDB estabelecida");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao MongoDB", err);
  });
