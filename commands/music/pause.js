const { stripIndents } = require("common-tags")

module.exports = {
    name: 'pause',
    aliases: ['pause-song'],
    category: 'Music',
    description: 'Menjeda Musik.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['pause'],
    example: ['pause'],
    run: async (chitanda, message, args) => {

  const { channel } = message.member.voice;
    
    if (!channel) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk kedalam saluran suara.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Tidak ada lagu yg di jeda.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
    //const serverQueue = message.client.queue.get(message.guild.id);
  let clientVoiceConnection = message.guild.voice.connection;
  const { title, author, duration, url, thumbnail } = serverQueue.songs[0];
  if (channel === clientVoiceConnection.channel) {
    serverQueue.connection.dispatcher.pause();
    const embed = chitanda.util.embed()
    .setColor(chitanda.warna.Chitanda)
    .setTitle('⏸ Song Paussed')
    .setDescription(`✔ | Successfully Pause.\n${stripIndents`
     :pause_button: **[${title}](${url})**`}`)
    message.channel.send(embed);
  } else {
    message.channel.send('You can only execute this command if you share the same voice Channel!');
  }
  }
}