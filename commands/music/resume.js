const { stripIndents } = require("common-tags");

module.exports = {
    name: 'resume',
    aliases: ['resume-song', 'continue'],
    category: 'Music',
    description: 'Melanjutkan musik yang di jeda.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['resume'],
    example: ['resume'],
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

    const serverQueue = chitanda.queue.get(message.guild.id);
      
    if (!serverQueue) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Tidak ada antrian.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
 let clientVoiceConnection = message.guild.voice.connection;
  const { title, author, duration, url, thumbnail } = serverQueue.songs[0];
      
  if (channel === clientVoiceConnection.channel) {
    let embed = chitanda.util.embed()
    .setColor(chitanda.warna.Chitanda)
    .setTitle(':play_pause: Song Resumed')
    .setDescription(`✔ | Succsessfully resumed song\n${stripIndents`
     :play_pause: **[${title}](${url})**`}`)
    message.channel.send(embed);
    serverQueue.connection.dispatcher.resume();
  } else {
    message.channel.send('You can only execute this command if you share the same voiceChannel!');
  }
    
  }
}