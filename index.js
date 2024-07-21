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


      const targetGuild = client.guilds.cache.get("1176022257483657317");
      const allowedRoles = ['1264456811889823864']; // Replace with actual role IDs
    

      const newChannel = await targetGuild.channels.create(message.channel.id, {
        type: 'GUILD_TEXT', // You can also use 'GUILD_VOICE' for voice channels
      topic: 'This is a private channel',
      permissionOverwrites: [
        {
          id: targetGuild.id, // The ID of the target guild (everyone)
          deny: ['VIEW_CHANNEL'], // Deny view channel permission for everyone
        },
        ...allowedRoles.map(roleId => ({
          id: roleId,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        })),
      ],
    });
  
   
      let serverchannel = newChannel.id
      db.set(message.channel.id, { bot: true,serverchannel });




    }
    if (
      message.author.id === "1155782105352114236" &&
      message.content.startsWith("remove_channel")
    ) {
     let d =  db.get(message.channel.id);

      const channelToDelete = message.guild.channels.cache.get(d.serverchannel);

      if (!channelToDelete) {
        console.log(`Channel with ID ${channelIdToDelete} not found`);
        return;
      }
  
      // Delete the channel
      await channelToDelete.delete();
      db.set(message.channel.id, { bot: false });

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







    if (!message.mentions.has("1155782105352114236")) return;
    let getchanneldb = (db.get(message.channel.id) || {}).bot ?? false;

    console.log(getchanneldb)
    if (getchanneldb === true) {
      let dd = db.get(message.channel.id)
      const dotbotchannels = dd.serverchannel
      const dotbotchannel = client.channels.cache.get(dotbotchannels);
      if (message.author.id === "1155782105352114236") return;

      if (dotbotchannel) {
        let amessageedit = message.content.replace(
          "<@1155782105352114236>",
          "dotingmywholelife"
        );
        dotbotchannel.send("<@1176020712784396358> "+amessageedit);
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
