

module.exports = {
    name: 'join',
    aliases: ['join-voice-channel', 'join-vc', 'join-voice', 'join-channel'],
    category: 'Music',
    description: 'Untuk join di channel suara.',
    permission: ['Embed Links', 'View Channel','Send Messages','Connect', 'Speak', 'Add Reactions'],
    permissionUser: [],
    usage: ['join'],
    example: ['join'],
    run: async (chitanda, message, args) => {

    const voiceChannel = message.member.voice.channel;
      
		if (!voiceChannel) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Kamu harus masuk kedalam saluran suara.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    if (!voiceChannel.permissionsFor(chitanda.user).has(['CONNECT', 'SPEAK', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS'])) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Aku tidak mempunyai akses "Connect", "Speak", "View Channel", "Send Message", or "Add Reactions" di channel ini.`)
			return message.channel.send(embed).then(async message => {
           //message.delete({ timeout: 15000 });
  });
		}
		if (!voiceChannel.joinable) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Mohon masuk channel suara yang bisa di akses.')
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    }
    
		if (chitanda.voice.connections.has(voiceChannel.guild.id)) {
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription('Aku sudah join di channel suara.')
			return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
		}
		await voiceChannel.join().then(message.guild.me.voice.setSelfDeaf(true))
      let embed = chitanda.util.embed()
        .setColor(chitanda.warna.Chitanda)
        .setDescription(`Aku ${chitanda.user} Masuk ke **${voiceChannel.name}** & Ketik: \`${chitanda.prefixDB}play <Judul Lagu> untuk mendengarkan musik\``)
      return message.channel.send(embed).then(async message => {
           message.delete({ timeout: 15000 });
  });
    
  }
}