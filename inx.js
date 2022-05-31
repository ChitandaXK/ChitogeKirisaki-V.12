const discord = require('discord.js');
const { MessageEmbed, MessageAttachment, Collection } = require("discord.js");
const { Prefix, COLOR } = require("./config.json");
const { formatNumber } = require('./util/Util');
const timezone = require("moment-timezone");
const moment = require('moment');
const db = require('quick.db');

//Rules
const { CHANNELWEL } = (process.env);
const { CHANNELLOG } = (process.env);
const { CHANNELERROR } = (process.env);
const { CHANNELSUGGESTION } = (process.env);
const { OWNERID } = (process.env);
const { GUILDID } = (process.env);

//Uptime
//const { get } = require("snekfetch");
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Ping Received");
  response.sendStatus(200);
})
app.listen(process.env.PORT);
setInterval(() => {
  
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

require("./ExtendedMessage");
discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'

const kirisaki = new discord.Client({
  commandPrefix: Prefix,
  disableEveryone: true,
  disableMentions: 'everyone',
  disableEvents: ["TYPING_START"]
});

kirisaki.commands = new discord.Collection();
kirisaki.aliases = new discord.Collection();
//client.categories = fs.readdirSync("./commands")

const jointocreate = require("./jointocreate");
jointocreate(kirisaki);

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(kirisaki);
});

let waktu
setInterval(async () => {
waktu = timezone().tz('Asia/Jakarta').format('⏰ HH:mm [WIB], DD/MM/YYYY')
  }, 2000)

kirisaki.on("ready", () => {
    console.log(`Hi, ${kirisaki.user.username} is now online!`);
  const guilds = kirisaki.guilds.cache.find(c => c.id === `${GUILDID}`);
  setInterval(async () => {
    let statuses = [`Music | ${Prefix[0]}play`, `Music | @${kirisaki.user.username} play`, `${waktu}`]; // `Help | ${Prefix}help`,  `Found Bug? | ${prefix}report`, ${prefix} | ${formatNumber(client.guilds.cache.size)} Servers
    let status = statuses[Math.floor(Math.random() * statuses.length)]; //`ai. | ${formatNumber(client.users.cache.size)} Users`,
    kirisaki.user.setPresence({
      activity: {
        name: status,
        type: "PLAYING",
        url: "https://www.twitch.tv/chitanda2"
      },
      status: "online"
    });
  }, 10000)
  
});

//DEFINIING
kirisaki.on("warn", info => console.log(info));
kirisaki.on("error", console.error);
kirisaki.queue = new Map();
kirisaki.vote = new Map();
kirisaki.prefix = Prefix;
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

kirisaki.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
  
  //Prefix
  //let matchPREFIX
  //if (message.content == `<@!${kirisaki.user.id}>` || message.content == `<@${kirisaki.user.id}>`) {
    //return
  //} else {
  //const PREFIX = `^(${Prefix}|${PPrefix})\\s*`;
  //const [matchPREFIX] = message.content.match(PREFIX);
    //matchPREFIX
  //}
  //let PREFIX;
   //if (message.content.toLowerCase().startsWith(Prefix[0])) {
    //PREFIX = Prefix[0]; // Cek folder, config.json.
  //} else if (message.content.toLowerCase().startsWith(Prefix[1])) {
    //PREFIX = Prefix[1];
  //}
  
   let pref = db.get(`prefix.${message.guild.id}`);
   let prefix;
  
  if (!pref) {
     prefix = Prefix[0]; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
    
    const prefixRegex = new RegExp(`^(<@!?${kirisaki.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    //Prefix del
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1)); // Message Flags: -default, -ban, -parameter
    }
  
    if (cmd.length === 0) return;
    
    // Get the command
    let command = kirisaki.commands.get(cmd) || kirisaki.commands.get(kirisaki.aliases.get(cmd));
    if (!command) {
      let embed = new MessageEmbed()
        .setColor(COLOR)
        .setDescription(`Command is nothing. Please look command help \`${prefix}help\``)
      return message.channel.send(embed).then(async message => {
             message.delete({ timeout: 15000 });
  });
    }
  
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection())
    }
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 1) * 4000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`⏱ | **${message.author.username}**! Mohon tunggu **${timeLeft.toFixed(1)}s** detik lagi baru bisa pakai!`).then(b =>{b.delete({timeout:5000})})
      //return message.channel.send(`⏱ | **${message.author.username}**! Please wait **${timeLeft.toFixed(1)}s** and try again!`).then(b =>{b.delete({timeout:5000})})
      }
    }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
  try {
    if (command) {
        command.run(kirisaki, message, args); 
    }
  
  } catch (e) {
      console.log(e.stack);
    }
  finally {
      console.log(`${message.guild.name}: ${message.author.tag} Used ${cmd} in #${message.channel.name}`);
    }
  });


/*kirisaki.on('messageDelete', async message => {
  const dataAttachment = new Collection();

    if (message.author.bot) return;
    if (message.attachments.size > 0) {

        const lastMessageID = message.author.lastMessageID;
        const data = dataAttachment.get(lastMessageID);
        if (!data.filename) return;
        const attachment = new MessageAttachment(data.buffer)
            .setName(data.filename)
        console.log(attachment);
        await kirisaki.channels.cache.get('801303967564955658').send(`**======Message Delete | ${message.author.tag}======**\n**User**: ${message.author}\n**Content**:\n${message.content ? message.content : 'Tidak ada Pesan'}\n**Location**: <#${message.channel.id}>\n**Attachment**:`, { files: [attachment] });
        dataAttachment.delete(lastMessageID);

    }
})*/

kirisaki.on("guildCreate", guild => {
  let embed = new MessageEmbed()
    .setColor(COLOR)
    .setTitle('New Guild Joined')
    .setDescription(`${kirisaki.user} : [💖]\n•》 New guild joined: **${guild.name} (id: ${guild.id})**\n•》 This guild has **${guild.memberCount}** members!\n•》 Owner guild : ${guild.owner} / **${guild.owner.user.tag} (id: ${guild.owner.id})**`) //\n•》 I Invite your server : ${client.inviter.username}
  kirisaki.channels.cache.get(CHANNELWEL).send(embed);
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

kirisaki.on("guildDelete", guild => {
  db.delete(`prefix.${guild.id}`);
  db.delete(`welchannel_${guild.id}`);
  db.delete(`byechannel_${guild.id}`);
   let embed = new MessageEmbed()
    .setColor(COLOR)
    .setTitle('I Have been Remove Guild')
    .setDescription(`${kirisaki.user} : [💔]\n•》 I have been removed from: **${guild.name} (id: ${guild.id})**\n•》 with **${guild.memberCount}** members!\n•》 Owner guild : ${guild.owner} / **${guild.owner.user.tag}\n(id: ${guild.owner.id})**`);
  kirisaki.channels.cache.get(CHANNELWEL).send(embed);
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

///////////////////////////////////////////////
//snipe
kirisaki.snipes = new Map()

kirisaki.on('messageDelete', function(message, channel){
 kirisaki.snipes.set(message.channel.id,{
  content: message.content, 
  author: message.author, 
  image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})

////////////////////////////////////////////////


kirisaki.login(process.env.SERIAL);
