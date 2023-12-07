const amqp = require("amqplib/callback_api");
const Logs = require("../user/models/logsschema"); // Importe o logsSchema

function createConnection() {
  return new Promise((resolve) => {
    amqp.connect("amqp://rabbitmq:5672", (error0, connection) => {
      if (error0) {
        console.error(
          `Falha ao conectar com RabbitMQ: ${error0}, tentando novamente em ${retryInterval / 1000
          } segundos}`
        );
      } else {
        resolve(connection);
      }
    });
  });
}

function saveLog(message) {
  const log = new Logs({ log: message });
  return log.save();
}

module.exports = { createConnection, saveLog };
