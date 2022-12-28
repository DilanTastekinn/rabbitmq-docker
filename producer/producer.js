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
  const queue = "employess";
  const newQueue = "clients";
  const deneme = [
    {
      name: "dilan",
      location: "workplace",
    },
    { name: "sinem", location: "workplace" },
    { name: "ahmet", location: "workplace" },
  ];
  try {
    const conn = await amqp.connect(rabbitSettings);
    console.log("Connection Created...");

    const channel = await conn.createChannel();
    console.log("Channel Created");

    let res = await channel.assertQueue(newQueue);
    console.log("Queue Created");

    for (let msq in deneme) {
      await channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(deneme[msq]))
      );
      console.log(`Message sent to queue ${queue}`);
    }

    res = await channel.assertQueue(newQueue);
    console.log("NewQueue Created");

    for (let msq in deneme) {
      await channel.sendToQueue(
        newQueue,
        Buffer.from(JSON.stringify(deneme[msq]))
      );
      console.log(`Message sent to newqueue ${newQueue}`);
    }
  } catch (err) {
    console.error(`Error -> ${err}`);
  }
}
