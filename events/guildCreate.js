const Discord = require('discord.js');

module.exports = async (chitanda, guild) => {
  let embed = chitanda.util.embed()
    .setColor(chitanda.warna.Chitanda)
    .setTitle('New Guild Joined')
    .setDescription(`${chitanda.user} : [💖]\n•》 New guild joined: **${guild.name} (id: ${guild.id})**\n•》 This guild has **${guild.memberCount}** members!\n•》 Owner guild : ${guild.owner} / **${guild.owner.user.tag} (id: ${guild.owner.id})**`) //\n•》 I Invite your server : ${client.inviter.username}
  chitanda.channels.cache.get(chitanda.channelWEL).send(embed);
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
}