const { createConnection } = require("./rabbitmq");

createConnection()
  .then((connection) => {
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = "logs";

      channel.assertQueue(queue, {
        durable: false,
      });

      const message = "Olá, RabbitMQ!";
      channel.sendToQueue(queue, Buffer.from(message));

      console.log(" [x] Sent %s", message);

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      channel.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          noAck: true,
        }
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to RabbitMQ:", error);
  });
