module.exports = function (server) {
  const WebSocket = require("ws");

  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      console.log("Recebido: %s", message);
    });

    ws.send("Olá! Você está conectado ao servidor WebSocket!");

    setTimeout(() => {
      ws.close();
      console.log("WebSocket desconectado");
    }, 50000);
  });
};
