let clients = [];

module.exports = function (server) {
  const WebSocket = require("ws");
  const jwt = require("jsonwebtoken");
  require("dotenv").config();
  const secret = process.env.ACCESS_TOKEN_SECRET;

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, secret);
      ws.userId = decoded.id;
      clients.push(ws);
    } catch {
      ws.close();
    }
    ws.on("message", (message) => {
      console.log("Recebido: %s", message);
    });

    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
    });
  });

  const notifyClients = (message, userId) => {
    clients.forEach((client) => {
      if (client.userId !== userId) {
        client.send(message);
      }
    });
  };

  return { notifyClients };
};
