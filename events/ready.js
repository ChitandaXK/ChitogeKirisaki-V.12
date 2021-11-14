const Discord = require('discord.js');
const timezone = require("moment-timezone");

let waktu
setInterval(async () => {
waktu = timezone().tz('Asia/Jakarta').format('⏰ HH:mm [WIB], DD/MM/YYYY')
  }, 2000)

module.exports = chitanda => {
  
  console.log(`Hi Master, ${chitanda.user.username} is now online!`);
  //chitanda.user.setStatus('online');

  /* Status */
  //function randomStatus() {
  setInterval(async () => {
    let rebahan = chitanda.guilds.cache.get("577498206250729472");
    let statuses = [
      `Help | ${chitanda.config.discord.prefix[0]}help`,
      `Music | ${chitanda.config.discord.prefix[0]}play`,
      `Music | @${chitanda.user.username} play`,
      `${chitanda.user.username} | Hi Friends!!`,
      `${chitanda.user.username} | (o゜▽゜)o☆`,
      `${chitanda.user.username} | YABE!!`,
      `Members di ${rebahan.name}: ${rebahan.memberCount}`
    ];
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    chitanda.user.setPresence({
      activity: {
        name: status,
        type: "PLAYING",
        url: "https://www.twitch.tv/chitanda2"
      },
      status: "online"
    });

  }, 10000);
  //}; setInterval(randomStatus, 10000);
  

  /** Mute Duration */
  //const muteDuration = () => require('../plugin/durationMute.js')(client);
  //setInterval(muteDuration, 30000);

  /* Music Events */
  //require('../plugin/PlayerEvent.js')(client);
  //setInterval(() => require('../system/alone')(kirisaki), 1000);

  /* Reset Collection Attachment */
  setInterval(() => chitanda.dataAttachment = new Discord.Collection(), 300000);


}