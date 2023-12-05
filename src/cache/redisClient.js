const redis = require("ioredis");

const client = new redis({
  host: "redis",
  port: 6379,
});

client.on("connect", () => {
  console.log("Cliente Redis conectado");
});

client.on("error", (err) => {
  console.log("Erro no cliente Redis", err);
});

module.exports = client;
