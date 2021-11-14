const discord = require("discord.js");

module.exports = {
    name: 'stop',
    aliases: ['sp'],
    category: 'Music',
    description: 'Menghentikan lagu yang di putar.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['stop'],
    example: ['stop'],
    run: async (chitanda, message, args) => {
    
const serverQueue = chitanda.queue.get(message.guild.id);

    if (!message.member.voice.channel)
      return message.reply('Kamu harus masuk kedalam saluran suara.').catch(console.error);
      //return message.reply("You need to join a voice channel first!").catch(console.error);
    if (!serverQueue) return message.reply("Tidak ada antrian.").catch(console.error);
    //if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    serverQueue.textChannel.send(`${message.author} ⏹ memberhentikan musik!`).catch(console.error);
    //serverQueue.textChannel.send(`${message.author} ⏹ stopped the music!`).catch(console.error);
  }
};
