const Discord = require('discord.js');
const db = require('quick.db');

module.exports = async (chitanda, guild) => {
  
  db.delete(`prefix.${guild.id}`);
  db.delete(`welchannel_${guild.id}`);
  db.delete(`byechannel_${guild.id}`);
  let embed = chitanda.util.embed()
    .setColor(chitanda.warna.Chitanda)
    .setTitle('I Have been Remove Guild')
    .setDescription(`${chitanda.user} : [💔]\n•》 I have been removed from: **${guild.name} (id: ${guild.id})**\n•》 with **${guild.memberCount}** members!\n•》 Owner guild : ${guild.owner} / **${guild.owner.user.tag}\n(id: ${guild.owner.id})**`);
  chitanda.channels.cache.get(chitanda.channelWEL).send(embed);
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
}