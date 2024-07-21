const { Client,MessageAttachment  } = require("discord.js-selfbot-v13");
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



  if (
    message.author.id === "1155782105352114236" &&
    message.content.startsWith("dot_voice")
  ) {
  

    const channel = client.channels.cache.get(message.channel.id);
    const attachment = new MessageAttachment(
      'https://cdn.discordapp.com/attachments/1178332461751619614/1264306868721811507/blizzy-ild-2024-07-20-17-36-17.mp3?ex=669d6507&is=669c1387&hm=1a4f645f06f634df627bfaeca51785ae6e24128116224124000109124ce165ea&', // path file
      'random_file_name.ogg', // must be .ogg
      {
        waveform: 'AAAAAAAAAAAA',
        duration_secs: 1, // any number you want
      },
    );
    channel.send({
      files: [attachment],
      flags: 'IS_VOICE_MESSAGE',
    });





  }





  if (message.author.bot) return;
  if (message.content.startsWith("dotvc")){

    let getchanneldb = (db.get(message.channel.id) || {}).bot ?? false;

    console.log(getchanneldb)
    
    
      if (getchanneldb === true) {
        const kafachannels = "1264361420871569511";
        const kafabotchannel = client.channels.cache.get(kafachannels);
     
    
        if (kafabotchannel) {
          let amessageedit = message.content.replace(
            "dotvc",
            " "
          );
          kafabotchannel.send(amessageedit);
          console.log(message.content);
    
          const filter = (response) => response.author.id === "1214097446263857192";
    
          kafabotchannel
            .awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
            .then((collected) => {
              const reply = collected.first();
              if (reply) {
                let username = message.author.username;
                let displayName = message.member
                  ? message.member.displayName
                  : username;
                console.log(reply.content);
                // message.reply(
                //   `${reply.content.replace("dotingmywholelife", displayName)}`
                // );
    
                const channel = client.channels.cache.get(message.channel.id);
                const attachment = new MessageAttachment(
                  reply.content, // path file
                  'random_file_name.ogg', // must be .ogg
                  {
                    waveform: 'AAAAAAAAAAAA',
                    duration_secs: 1, // any number you want
                  },
                );
                channel.send({
                  files: [attachment],
                  flags: 'IS_VOICE_MESSAGE',
                });
    
    
    
    
    
    
    
              }
            })
            .catch(() => {
              console.log("No reply received within the time limit.");
            });
        } else {
          console.error("Channel not found!");
        }
      }
    

  }







  if (!message.content.includes("<@1155782105352114236>")) return;
  let getchanneldb = (db.get(message.channel.id) || {}).bot ?? false;

  console.log(getchanneldb)
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
