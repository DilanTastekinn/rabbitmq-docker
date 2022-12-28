const amqp = require("amqplib");

const rabbitSettings = {
  protocol: "amqp",
  hostname: "localhost",
  port: 1234,
  username: "user",
  password: "pass",
  vhost: "'vhost'",
  authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
};
connect();
async function connect() {
  const queue = "clients";
  const name = "sinem";
  try {
    const conn = await amqp.connect(rabbitSettings);
    console.log("Connection Created...");
    const channel = await conn.createChannel();
    console.log("Channel Created");
    const res = await channel.assertQueue(queue);
    console.log("Queue Created");
    console.log(`Waiting for messages from ${name}`);
    channel.consume(queue, (message) => {
      let employee = JSON.parse(message.content.toString());
      console.log(`Received employee ${employee.name}`);
      console.log(employee);

      if (employee.name == name) {
        channel.ack(message);
        console.log("Deleted message from queue... \n");
      } else {
        console.log("Not deleted");
      }
    });
  } catch (err) {
    console.error(`Error -> ${err}`);
  }
}
