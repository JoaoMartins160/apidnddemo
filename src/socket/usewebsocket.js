const WebSocketService = require("../../socket/websocket");
const app = express();
const server = https.createServer(app);
const webSocketService = WebSocketService(server);

const addWebSocketService = (req, res, next) => {
  req.webSocketService = webSocketService;
  next();
};

module.exports = addWebSocketService;
