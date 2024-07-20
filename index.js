const { Client } = require("discord.js-selfbot-v13");
const axios = require("axios");
require("dotenv").config();
const API_TOKEN = process.env.API_TOKEN;
const fs = require("fs");
const client = new Client();

const DataBase = require("quick.db-json");
const db = new DataBase("./db.json", {
  backup: {
    enabled: true,
    folder: "./backups/",
    interval: 1000 * 60 * 60,
  },
  preset: {
    prefix: "+",
  },
});

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
});

client.on("messageCreate", async (message) => {
  if (
    message.author.id === "1155782105352114236" &&
    message.content.startsWith("add_channel")
  ) {
    db.set(message.channel.id, { bot: true });
  }
  if (
    message.author.id === "1155782105352114236" &&
    message.content.startsWith("remove_channel")
  ) {
    db.set(message.channel.id, { bot: false });
  }

  if (message.author.bot) return;
  if (!message.content.includes("<@1155782105352114236>")) return;

  let getchanneldb = (db.get(message.channel.id) || {}).bot ?? false;

  console.log(getchanneldb);

  if (getchanneldb === true) {
    const dotbotchannels = "1264293369010589808";
    const dotbotchannel = client.channels.cache.get(dotbotchannels);
    if (message.author.id === "1155782105352114236") return;

    if (dotbotchannel) {
      let amessageedit = message.content.replace(
        "<@1155782105352114236>",
        "dotingmywholelife"
      );
      dotbotchannel.send(amessageedit);
      console.log(message.content);

      const filter = (response) => response.author.id === "1176020712784396358";

      dotbotchannel
        .awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then((collected) => {
          const reply = collected.first();
          if (reply) {
            let username = message.author.username;
            let displayName = message.member
              ? message.member.displayName
              : username;
            console.log(displayName);
            message.reply(
              `${reply.content.replace("dotingmywholelife", displayName)}`
            );
          }
        })
        .catch(() => {
          console.log("No reply received within the time limit.");
        });
    } else {
      console.error("Channel not found!");
    }
  }

  if (
    message.channel.id === "1264293369010589808" &&
    message.content.startsWith("-")
  ) {
    return;
  }
});

client.login(API_TOKEN);


const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)